' BrightSign OS 9.x Bootstrap Script for The Sign Age
' This script launches the React application in a Chromium widget

Sub Main()
    ' Create message port for events
    msgPort = CreateObject("roMessagePort")
    
    ' Get display dimensions
    videoMode = CreateObject("roVideoMode")
    displayInfo = videoMode.GetResolution()
    
    ' Create HTML widget for the React app
    config = {
        port: msgPort
        url: "file:///sd:/index.html"
        inspector_server: {
            port: 2999
            enabled: true
        }
        ' Enable JavaScript and local storage
        javascript_enabled: true
        local_storage_enabled: true
        storage_path: "SD:"
        storage_quota: 52428800  ' 50MB quota
        ' Enable debugging
        nodejs_enabled: true
        brightsign_js_objects_enabled: true
        ' Security settings
        security_params: {
            websecurity: false  ' Allow loading local resources
        }
    }
    
    htmlWidget = CreateObject("roHtmlWidget", config)
    htmlWidget.Show()
    
    ' Log startup
    diagnostics = CreateObject("roSystemLog")
    diagnostics.SendLine("The Sign Age player started successfully")
    diagnostics.SendLine("Display resolution: " + displayInfo.width.ToStr() + "x" + displayInfo.height.ToStr())
    
    ' Main event loop
    while true
        msg = wait(0, msgPort)
        if type(msg) = "roHtmlWidgetEvent" then
            eventData = msg.GetData()
            if eventData.reason = "load-error" or eventData.reason = "load-aborted" then
                diagnostics.SendLine("ERROR: Failed to load application - " + eventData.message)
            else if eventData.reason = "load-finished" then
                diagnostics.SendLine("Application loaded successfully")
            end if
        end if
    end while
End Sub
