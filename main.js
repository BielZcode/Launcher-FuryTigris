const { app, BrowserWindow, ipcMain } = require('electron');
const fs = require('fs');
const path = require('path');
const os = require('os');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1100,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    menu: null,
    resizable: false,
    maximizable: false,
  });

  win.loadFile('./src/views/index.html');
};

ipcMain.handle('get-account', (event, username) => {
  const filePath = path.join(os.homedir(), 'AppData', 'Roaming', 'FuryTigris Client', 'accounts.dat');

  if (fs.existsSync(filePath)) {
    const accounts = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const account = accounts.find(account => account.username === username);

    if (account) {
      return { success: true, username: account.username };
    }
  }

  return { success: false };
});

// Função para criar a conta
ipcMain.handle('create-account', (event, username) => {
  const filePath = path.join(os.homedir(), 'AppData', 'Roaming', 'FuryTigris Client', 'accounts.dat');

  // Carrega os dados existentes
  let accounts = [];
  if (fs.existsSync(filePath)) {
    accounts = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  }

  // Verifica se a conta já existe
  if (accounts.some(account => account.username === username)) {
    return { success: false, message: 'Conta já existe!' };
  }

  // Dados da conta
  const accountData = {
    username: username,
    createdDate: new Date().toISOString(),
  };

  // Adiciona a nova conta
  accounts.push(accountData);

  // Cria o diretório, se necessário
  const dirPath = path.dirname(filePath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  // Grava as contas no arquivo
  try {
    fs.writeFileSync(filePath, JSON.stringify(accounts, null, 4));
    return { success: true, message: 'Conta criada com sucesso!' };
  } catch (err) {
    console.error('Erro ao criar a conta:', err);
    return { success: false, message: 'Erro ao criar a conta.' };
  }
});

app.whenReady().then(() => {
  createWindow();
});