Sub Main()
    ' HTML widget with LANDSCAPE coordinates
    ' This is what ChatGPT said we need - landscape rect, then rotate at output
    
    ' Create HTML widget with landscape dimensions (1920x1080, NOT 1080x1920)
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
