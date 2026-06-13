const express = require('express');
const cors = require('cors');
const atendimentosRoutes = require('./routes/atendimentos');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use('/api/atendimentos', atendimentosRoutes);

app.use((req, res) => {
  res.status(404).json({ erro: 'Rota não encontrada' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ erro: 'Erro interno do servidor' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});