Sub Main()
    ' Breadcrumb logging
    LogMsg("=== SCRIPT STARTED ===")
    
    ' Set up video mode - LANDSCAPE first to prove pipeline
    videoMode = CreateObject("roVideoMode")
    LogMsg("Video mode object created")
    
    ' Use standard landscape mode (not portrait dimensions)
    videoMode.SetMode("1920x1080x60p")
    LogMsg("Video mode set to 1920x1080x60p")
    
    ' Create HTML widget with LANDSCAPE dimensions
    ' (BrightSign applies rotation at output, not in widget coordinates)
    rect = CreateObject("roRectangle", 0, 0, 1920, 1080)
    LogMsg("Rectangle created: 1920x1080")
    
    config = {
        port: 3000,
        inspector_server: {port: 2999}
    }
    htmlWidget = CreateObject("roHtmlWidget", rect, config)
    if htmlWidget <> invalid then
        LogMsg("HTML widget created successfully")
    else
        LogMsg("ERROR: HTML widget creation failed")
        stop
    end if
    
    htmlWidget.SetUrl("file:/SD:/index.html")
    LogMsg("URL set to file:/SD:/index.html")
    
    htmlWidget.Show()
    LogMsg("Widget.Show() called")
    
    ' Keep running
    while true
        sleep(30000)
    end while
End Sub

Sub LogMsg(msg as String)
    ' Write breadcrumb to SD card for debugging
    CreateObject("roAppendFile", "/SD:/boot-log.txt").SendLine(msg)
End Sub
