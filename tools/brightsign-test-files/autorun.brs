Sub Main()
    port = CreateObject("roMessagePort")

    cfg = {
        port: port
        url: "file:/SD:/index.html"
        javascript_enabled: true
    }

    w = CreateObject("roHtmlWidget", cfg)
    w.Show()

    while true
        wait(0, port)
    end while
End Sub
