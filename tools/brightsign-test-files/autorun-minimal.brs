Sub Main()
    ' Create widget with minimal config
    port = CreateObject("roMessagePort")
    
    cfg = {
        port: port
        url: "file:/SD:/index.html"
        javascript_enabled: true
    }
    
    w = CreateObject("roHtmlWidget", cfg)
    if w <> invalid then
        w.Show()
    end if
    
    ' Just sleep forever, don't process events
    while true
        sleep(30000)  ' Sleep 30 seconds at a time
    end while
End Sub
