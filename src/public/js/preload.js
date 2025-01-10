const { contextBridge, ipcRenderer } = require('electron');

// Expondo funções para o renderer process
contextBridge.exposeInMainWorld('electron', {
  checkAccount: (username) => ipcRenderer.invoke('check-account', username),
  createAccount: (username) => ipcRenderer.invoke('create-account', username)
});
