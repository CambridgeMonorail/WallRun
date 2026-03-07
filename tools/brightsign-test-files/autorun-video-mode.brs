Sub Main()
    ' Set up video mode explicitly
    videoMode = CreateObject("roVideoMode")
    videoMode.SetMode("1920x1080x60p")
    
    ' Create HTML widget
    rect = CreateObject("roRectangle", 0, 0, 1920, 1080)
    config = {
        port: 3000,
        inspector_server: {port: 2999}
    }
    htmlWidget = CreateObject("roHtmlWidget", rect, config)
    htmlWidget.SetUrl("file:/SD:/index.html")
    htmlWidget.Show()
    
    ' Keep running
    while true
        sleep(30000)
    end while
End Sub
