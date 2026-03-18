Sub Main()
  ' BrightSign Development Mode Bootstrap
  ' Loads React app from local dev server on your network
  ' 
  ' Setup:
  ' 1. Inject DEV_SERVER_IP with your machine's LAN IP before upload
  ' 2. Upload this autorun.brs to SD card once
  ' 3. Run: pnpm dev:brightsign on your dev machine
  ' 4. Player will load from http://YOUR_IP:5173
  ' 5. Debug at chrome://inspect/devices (player IP:2999)
  
  ' CONFIGURATION - injected by scripts/deploy-dev-mode.sh
  DEV_SERVER_IP = "__DEV_SERVER_IP__"
  DEV_SERVER_PORT = "5173"

  reg = CreateObject("roRegistrySection", "html")
  reg.Write("enable_web_inspector", "1")
  reg.Flush()

  ' Optional SSH access for local debugging only:
  ' netReg = CreateObject("roRegistrySection", "networking")
  ' netReg.Write("ssh", "22")
  ' networkConfig = CreateObject("roNetworkConfiguration", 0)
  ' networkConfig.SetLoginPassword("CHANGE_ME")
  ' networkConfig.Apply()
  ' netReg.Flush()
  
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
