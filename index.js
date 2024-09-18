import express from 'express';
import bodyParser from 'body-parser';
import scheduleRoutes from './routes/schedulesRoutes.js';

const app = express();
const port = 3000;

// Middleware para processar o body das requisições
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Usar as rotas de agendamento
app.use(scheduleRoutes);

// Rota de teste para verificar se o servidor está rodando
app.get('/', (req, res) => {
  res.send('A aplicação está funcionando! Esta é apenas uma versão para testes.');
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
