Sub Main()
    ' Simplest possible test - draw red rectangle on graphics plane
    ' This bypasses HTML entirely to test if ANY video output works
    
    ' Set video mode
    videoMode = CreateObject("roVideoMode")
    videoMode.SetMode("1920x1080x60p")
    
    ' Create graphics plane
    screen = CreateObject("roScreen", true, 1920, 1080)
    screen.SetAlphaEnable(true)
    
    ' Draw a bright red rectangle that fills entire screen
    red = &hFF0000FF  ' Red in RGBA format
    screen.Clear(red)
    screen.SwapBuffers()
    
    ' Write success marker
    CreateObject("roAppendFile", "/SD:/graphics-test.txt").SendLine("Graphics plane test executed")
    
    ' Keep running
    while true
        sleep(30000)
    end while
End Sub
