const express = require('express');
const path = require('path');
const { exec } = require('child_process');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.get('/run-launcher', (req, res) => {
    const batFilePath = path.join(__dirname, 'launcher.bat');
    
    exec(batFilePath, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            res.status(500).send('Erro ao executar o arquivo .bat');
            return;
        }
        res.send('Arquivo .bat executado com sucesso');
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
