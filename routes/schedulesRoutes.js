import express from 'express';
import {
  createSchedule,
  getAllSchedules,
  getScheduleById,
  updateSchedule,
  deleteSchedule
} from '../controllers/scheduleController.js';

const router = express.Router();

// busca agenda
router.get('/unavailable', async (req, res) => {
  try {
    const schedules = await getAllSchedulesFromFirebase(); 
    const unavailableDates = schedules.map(schedule => ({
      date: schedule.suggestedDateTime, 
    }));
    res.json(unavailableDates);
  } catch (error) {
    console.error('Erro ao buscar horários indisponíveis:', error);
    res.status(500).json({ message: 'Erro ao buscar horários indisponíveis' });
  }
});

router.post('/schedules', createSchedule);
router.get('/schedules', getAllSchedules);
router.get('/schedules/:id', getScheduleById);
router.put('/schedules/:id', updateSchedule);
router.delete('/schedules/:id', deleteSchedule);

export default router;
