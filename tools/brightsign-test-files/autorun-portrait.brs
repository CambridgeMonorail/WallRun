Sub Main()
    ' Set up video mode for portrait orientation
    videoMode = CreateObject("roVideoMode")
    videoMode.SetMode("1080x1920x60p")  ' Portrait: width=1080, height=1920
    
    ' Create HTML widget with portrait dimensions
    rect = CreateObject("roRectangle", 0, 0, 1080, 1920)
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
