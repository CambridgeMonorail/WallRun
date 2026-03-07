Sub Main()
    ' Create message port
    port = CreateObject("roMessagePort")
    
    ' Create widget with message port
    rect = CreateObject("roRectangle", 0, 0, 1920, 1080)
    config = {port: port}
    widget = CreateObject("roHtmlWidget", rect, config)
    widget.SetUrl("file:/SD:/index.html")
    widget.Show()
    
    ' Event loop - may be required for rendering
    while true
        msg = wait(0, port)
        ' Just consume events, don't need to process them
    end while
End Sub
