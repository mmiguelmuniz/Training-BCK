import express from 'express';
import scheduleRoutes from './routes/schedulesRoutes.js';
import db from './config/firebaseConfig.js';
import cors from 'cors'; // Importando corretamente o cors

const app = express();
const PORT = process.env.PORT || 3000;

// Configurações do middleware
app.use(cors()); // Permite CORS
app.use(express.json()); // Para processar JSON no body das requisições
app.use(express.urlencoded({ extended: true })); // Para processar dados URL-encoded

app.use('/api', scheduleRoutes);

app.get('/', (req, res) => {
  res.send('Appointments are ongoing!');
});

app.get('/schedules', async (req, res) => {
  try {
    const schedulesSnapshot = await db.collection('schedules').get();
    const schedules = schedulesSnapshot.docs.map(doc => doc.data());
    res.json(schedules);
  } catch (error) {
    res.status(500).send('Error when searching for appointments.');
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`); 
});
