const { app, BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1100,
    height: 700
  })

  win.loadFile('./src/views/index.html')
}

app.whenReady().then(() => {
  createWindow()
})