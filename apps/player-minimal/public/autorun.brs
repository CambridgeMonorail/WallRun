' BrightSign OS 9.x Bootstrap Script for The Sign Age
' This script launches the React application in a Chromium widget

Sub Main()
    ' Create message port for events
    msgPort = CreateObject("roMessagePort")
    
    ' Log file for debugging
    logPath = "SD:/autorun-react-log.txt"
    
    ' Get display dimensions (using correct BrightSign OS 9.x API)
    deviceInfo = CreateObject("roDeviceInfo")
    displaySize = deviceInfo.GetDisplaySize()
    displayWidth = displaySize.w
    displayHeight = displaySize.h
    
    ' Create HTML widget for the React app
    config = {
        port: msgPort
        url: "file:/SD:/index.html"
        inspector_server: {
            port: 2999
            enabled: true
        }
        ' Enable JavaScript and local storage
        javascript_enabled: true
        local_storage_enabled: true
        storage_path: "SD:"
        storage_quota: 52428800  ' 50MB quota
    }
    
    htmlWidget = CreateObject("roHtmlWidget", config)
    htmlWidget.Show()
    
    ' Log startup
    AppendLine(logPath, "The Sign Age player started successfully")
    AppendLine(logPath, "URL: " + htmlWidget.GetUrl())
    AppendLine(logPath, "Display resolution: " + displayWidth.ToStr() + "x" + displayHeight.ToStr())
    
    diagnostics = CreateObject("roSystemLog")
    diagnostics.SendLine("The Sign Age player started successfully")
    diagnostics.SendLine("Display resolution: " + displayWidth.ToStr() + "x" + displayHeight.ToStr())
    
    ' Main event loop
    while true
        msg = wait(0, msgPort)
        if type(msg) = "roHtmlWidgetEvent" then
            eventData = msg.GetData()
            if eventData.reason = "load-error" or eventData.reason = "load-aborted" then
                errMsg = "ERROR: Failed to load application - " + eventData.message
                diagnostics.SendLine(errMsg)
                AppendLine(logPath, errMsg)
            else if eventData.reason = "load-finished" then
                successMsg = "Application loaded successfully"
                diagnostics.SendLine(successMsg)
                AppendLine(logPath, successMsg)
            end if
            AppendLine(logPath, "HtmlWidgetEvent: " + eventData.reason)
        end if
    end while
End Sub

Sub AppendLine(path As String, line As String)
    f = CreateObject("roAppendFile", path)
    if f <> invalid then
        f.SendLine(line)
        f.Close()
    end if
End Sub
