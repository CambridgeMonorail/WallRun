Sub Main()
  ' BrightSign Development Mode Bootstrap
  ' Loads React app from local dev server on your network
  ' 
  ' Setup:
  ' 1. Change DEV_SERVER_IP to your machine's LAN IP (e.g., "192.168.0.100")
  ' 2. Upload this autorun.brs to SD card once
  ' 3. Run: pnpm dev -- --host 0.0.0.0 on your dev machine
  ' 4. Player will load from http://YOUR_IP:5173
  ' 5. Debug at chrome://inspect/devices (player IP:2999)
  
  ' CONFIGURATION - CHANGE THIS TO YOUR DEV MACHINE IP
  DEV_SERVER_IP = "192.168.0.100"  ' <<< CHANGE ME
  DEV_SERVER_PORT = "5173"
  
  ' Full screen rectangle for 1920x1080
  rect = CreateObject("roRectangle", 0, 0, 1920, 1080)
  
  ' HTML widget configuration
  cfg = {
    url: "http://" + DEV_SERVER_IP + ":" + DEV_SERVER_PORT + "/index.html"
    nodejs_enabled: true
    inspector_server: { port: 2999 }
    storage_path: "SD:"
    security_params: {
      websecurity: false  ' Allow loading from network
    }
  }
  
  ' Create HTML widget and show it
  html = CreateObject("roHtmlWidget", rect, cfg)
  html.Show()
  html.SetURL(cfg.url)
  
  ' Message port for events
  mp = CreateObject("roMessagePort")
  html.SetPort(mp)
  
  ' Event loop
  while true
    msg = wait(0, mp)
    if type(msg) = "roHtmlWidgetEvent" then
      eventData = msg.GetData()
      ' Log events for debugging (view in LDWS logs)
      print "HTML Event: "; eventData
    end if
  end while
End Sub
