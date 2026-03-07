Sub Main()
    ' Create log file immediately to prove we're running
    logPath = "SD:/boot-debug.txt"
    AppendLine(logPath, "=== BOOT START ===")
    AppendLine(logPath, "Time: " + CreateObject("roDateTime").ToIsoString())
    
    port = CreateObject("roMessagePort")
    AppendLine(logPath, "Created message port")

    ' Test HTML widget creation
    cfg = {
        port: port
        url: "file:/SD:/index.html"
        javascript_enabled: true
    }
    
    AppendLine(logPath, "Creating HTML widget with URL: " + cfg.url)
    w = CreateObject("roHtmlWidget", cfg)
    
    if w = invalid then
        AppendLine(logPath, "ERROR: roHtmlWidget creation FAILED")
    else
        AppendLine(logPath, "HTML widget created successfully")
        AppendLine(logPath, "Showing widget...")
        w.Show()
        AppendLine(logPath, "Widget shown, URL: " + w.GetUrl())
    end if

    AppendLine(logPath, "Entering event loop")
    
    while true
        msg = wait(0, port)
        if msg <> invalid then
            msgType = type(msg)
            AppendLine(logPath, "Event: " + msgType)
            
            if msgType = "roHtmlWidgetEvent" then
                if msg.IsStatusMessage() then
                    AppendLine(logPath, "Status: " + msg.GetStatusMessage())
                else if msg.IsErrorMessage() then
                    AppendLine(logPath, "ERROR: " + msg.GetErrorMessage())
                end if
            end if
        end if
    end while
End Sub

Sub AppendLine(path As String, line As String)
    f = CreateObject("roAppendFile", path)
    if f <> invalid then
        f.SendLine(line)
        f.Close()
    end if
End Sub
