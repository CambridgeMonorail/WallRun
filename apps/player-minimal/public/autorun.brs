' BrightSign OS 9.1.92 - React App Bootstrap
' Enables Chromium 120 runtime for modern CSS support (Tailwind v4)

sub Main()
    ' Disable Web Inspector by default and set Chromium runtime
    reg = CreateObject("roRegistrySection", "html")
    reg.Write("enable_web_inspector", "0")
    
    ' Read current widget type to check if we need to reboot
    currentWidgetType = reg.Read("widget type")
    ? "Current widget type: "; currentWidgetType
    
    ' Set to Chromium 120 (default for Series 5 on 9.1.92)
    ' Use "chromium110" if you need to pin to 110 instead
    if currentWidgetType <> "chromium120" then
        ? "Setting widget type to chromium120..."
        reg.Write("widget type", "chromium120")
        reg.Flush()
        ? "Widget type set. Player will use Chromium 120 after reboot."
    else
        ? "Already using chromium120"
    end if
    
    reg.Flush()
    
    msgPort = CreateObject("roMessagePort")
    vm = CreateObject("roVideoMode")
    rect = CreateObject("roRectangle", 0, 0, vm.GetResX(), vm.GetResY())

    config = {
        port: msgPort
        url: "file:///sd:/index.html"
        javascript_enabled: true
    }

    html = CreateObject("roHtmlWidget", rect, config)
    html.Show()

    while true
        msg = wait(0, msgPort)
        if type(msg) = "roHtmlWidgetEvent" then
            ? msg.GetData()
        end if
    end while
end sub
