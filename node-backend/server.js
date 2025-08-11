const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'usuarios.json');

function lerUsuarios() {
  if (!fs.existsSync(DATA_FILE)) return [];
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
}

function salvarUsuarios(usuarios) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(usuarios, null, 2));
}

app.post('/usuarios', (req, res) => {
  const { nome, email, cargo } = req.body;
  if (!nome || !email || !cargo) {
    return res.status(400).json({ erro: 'Preencha todos os campos.' });
  }
  const usuarios = lerUsuarios();
  if (usuarios.find(u => u.email === email)) {
    return res.status(409).json({ erro: 'Email já cadastrado.' });
  }
  usuarios.push({ nome, email, cargo });
  salvarUsuarios(usuarios);
  res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});