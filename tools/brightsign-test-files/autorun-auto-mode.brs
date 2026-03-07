Sub Main()
    ' Absolute simplest test - no manual video mode setting
    ' Let BrightSign auto-detect HDMI mode
    
    ' Create bitmap graphics screen (will auto-detect mode)
    screen = CreateObject("roScreen", true)
    screen.SetAlphaEnable(true)
    
    ' Fill entire screen with bright red
    red = &hFF0000FF
    screen.Clear(red)
    screen.SwapBuffers()
    
    ' Keep running
    while true
        sleep(30000)
    end while
End Sub
