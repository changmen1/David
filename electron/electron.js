const path = require("path");
const {
  app,
  BrowserWindow,
  nativeImage,
  ipcMain,
  Tray,
  Menu,
} = require("electron");

const isDev = process.env.IS_DEV === true ? true : false;
let mainWindow2;
function createWindow() {
  const mainWindow = new BrowserWindow({
    minWidth: 750,
    minHeight: 550,
    //窗口默认隐藏
    // show: false,
    // 无边框设置 隐藏原始窗口边框
    frame: false,
    // 设置透明
    transparent: true,
    icon: path.join(__dirname, "/src/assets/David.png"), // 设置应用程序的图标路径
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      overlayScrollbars: false, // 隐藏滚动条
    },
  });
  // 忽略鼠标点击事件
  // mainWindow.setIgnoreMouseEvents(true);
  mainWindow2 = mainWindow;
  mainWindow.setIcon(path.join(__dirname, "../src/assets/David.png")); // 设置窗口图标
  mainWindow.loadURL(
    isDev
      ? `file://${path.join(__dirname, "../dist/index.html")}`
      : "http://localhost:3000"
  );
  // 隐藏系统菜单
  // mainWindow.setMenu(null);
  // 程序最小宽高
  mainWindow.setMinimumSize(1000, 700);
  // 监听窗口创建完成事件
  mainWindow.webContents.on("did-finish-load", () => {
    // 注入 CSS 样式 为了隐藏右边的滚动条
    mainWindow.webContents.executeJavaScript(`
        const css = document.createElement('style');
        css.innerHTML = '::-webkit-scrollbar { display: none; }';
        document.head.appendChild(css);
      `);
  });
  if (isDev) {
    // 自动打开调式工具
    // mainWindow.webContents.openDevTools();
  }
  // 自动打开调试工具
  // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  ipcMain.handle("dialog:zoomOut", handleZoomOut);
  ipcMain.handle("dialog:maximize", handleMaximize);
  ipcMain.handle("dialog:closeWindow", handlecloseWindow);
  ipcMain.handle("dialog:createTray", handleCreateTray);
  ipcMain.handle("dialog:PinToTop", handlePinToTop);
  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
  // 隐藏菜单栏
  app.on("browser-window-created", (e, mainWindow2) => {
    mainWindow2.removeMenu();
  });
});

/**窗口最小化 */
function handleZoomOut() {
  mainWindow2.minimize();
}
/**窗口最大化 */
function handleMaximize() {
  if (mainWindow2.isMaximized()) {
    mainWindow2.unmaximize();
  } else {
    mainWindow2.maximize();
  }
}
/**关闭窗口 */
function handlecloseWindow() {
  mainWindow2.close();
}
let tray;
/**最小化系统托盘 */
function handleCreateTray() {
  const icon = nativeImage.createFromPath(
    path.join(__dirname, "../src/assets/David.png")
  );
  if (tray) {
    tray.destroy(); // 销毁之前的托盘图标
  }
  console.log("系统托盘", icon);
  tray = new Tray(icon);
  tray.setToolTip("戴维医疗");
  tray.setTitle("This is my title");
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "退出程序",
      type: "normal", //('normal' | 'separator' | 'submenu' | 'checkbox' | 'radio')
      checked: false,
      click: () => {
        app.exit();
      },
    },
    {
      label: "打开戴维医疗",
      type: "normal",
      checked: false,
      click: () => {
        mainWindow2.show();
      },
    },
  ]);
  mainWindow2.hide();
  tray.setContextMenu(contextMenu);
  // 单击触发事件
  tray.on("click", () => {
    // 双击通知区图标实现应用的显示或隐藏
    mainWindow2.isVisible() ? mainWindow2.hide() : mainWindow2.show();
    mainWindow2.isVisible()
      ? mainWindow2.setSkipTaskbar(false)
      : mainWindow2.setSkipTaskbar(true);
  });
}

/**设置窗口初始为非置顶*/
function handlePinToTop(events, ups) {
  mainWindow2.setAlwaysOnTop(ups);
}
