' BrightSign OS 9.x HTML Widget Bootstrap
' Launches React app in fullscreen Chromium
' 
' This template is suitable for digital signage applications
' running on BrightSign players with OS 9.x

Sub Main()
    ' Create message port before widget construction
    msgPort = CreateObject("roMessagePort")

    ' Get dynamic device information for sizing and diagnostics
    deviceInfo = CreateObject("roDeviceInfo")
    modelName = deviceInfo.GetModel()
    videoMode = CreateObject("roVideoMode")
    rect = CreateObject("roRectangle", 0, 0, videoMode.GetResX(), videoMode.GetResY())

    print "BrightSign Model: "; modelName
    print "Video Mode: "; deviceInfo.GetVideoMode()

    ' Configure the HTML widget using the OS 9.x constructor pattern
    config = {
        port: msgPort
        url: "file:///sd:/index.html"
        javascript_enabled: true
    }

    htmlWidget = CreateObject("roHtmlWidget", rect, config)

    ' Show the widget (makes it visible on screen)
    htmlWidget.Show()
    
    ' Event loop - keeps the app running
    print "HTML Widget started, entering event loop..."
    
    while true
        msg = wait(0, msgPort)
        
        if type(msg) = "roHtmlWidgetEvent" then
            eventData = msg.GetData()
            print "HTML Widget Event: "; eventData
            
            ' Handle widget events (optional)
            ' Common events: load, error, console messages
            
        else if msg = invalid then
            ' Timeout or no message
            
        end if
    end while
End Sub
