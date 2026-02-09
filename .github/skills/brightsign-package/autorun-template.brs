' BrightSign OS 9.x HTML Widget Bootstrap
' Launches React app in fullscreen Chromium
' 
' This template is suitable for digital signage applications
' running on BrightSign players with OS 9.x

Sub Main()
    ' Get device info for dynamic configuration
    deviceInfo = CreateObject("roDeviceInfo")
    videoMode = deviceInfo.GetVideoMode()
    modelName = deviceInfo.GetModel()
    
    print "BrightSign Model: "; modelName
    print "Video Mode: "; videoMode
    
    ' Create HTML widget for displaying web content
    htmlWidget = CreateObject("roHtmlWidget")
    
    ' Set widget rectangle based on video mode
    ' Common resolutions: 1920x1080 (1080p), 3840x2160 (4K)
    rect = CreateObject("roRectangle", 0, 0, 1920, 1080)
    
    ' Adjust for 4K if needed
    if videoMode = "3840x2160x60p" or videoMode = "3840x2160x30p" then
        rect = CreateObject("roRectangle", 0, 0, 3840, 2160)
    end if
    
    htmlWidget.SetRectangle(rect)
    
    ' Enable JavaScript (required for React apps)
    htmlWidget.EnableJavaScript(true)
    
    ' Enable local storage for persistent data
    htmlWidget.SetLocalStorageEnabled(true)
    
    ' Set large storage quota (100MB)
    htmlWidget.SetLocalStorageQuota(100 * 1024 * 1024)
    
    ' Enable IndexedDB for offline capabilities
    htmlWidget.SetIndexedDBEnabled(true)
    
    ' Disable scrollbars (fullscreen signage)
    htmlWidget.SetScrollbarsEnabled(false)
    
    ' Enable remote debugging (port 8008)
    ' This allows Chrome DevTools connection for development
    htmlWidget.EnableRemoteDebugger(true)
    
    ' Set user agent (optional, for analytics)
    userAgent = "BrightSign/" + modelName + " Chrome/98"
    htmlWidget.SetUserAgent(userAgent)
    
    ' Set URL to local index.html on SD card
    ' The /sd: prefix is the mounted SD card root
    htmlWidget.SetUrl("file:///sd:/index.html")
    
    ' Show the widget (makes it visible on screen)
    htmlWidget.Show()
    
    ' Create message port for event handling
    msgPort = CreateObject("roMessagePort")
    htmlWidget.SetPort(msgPort)
    
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
