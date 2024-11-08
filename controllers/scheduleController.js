import {
  saveSchedule as modelSaveSchedule,
  getAllSchedules as modelGetAllSchedules,
  getScheduleById as modelGetScheduleById,
  updateSchedule as modelUpdateSchedule,
  deleteSchedule as modelDeleteSchedule
} from '../models/scheduleModel.js';

// ajeitando a hora
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}-${month}-${year} T ${hours}:${minutes}`;
};


export const createSchedule = async (req, res) => {
  const { name, email, department, course, suggestedDateTime, describe } = req.body;

  if (!name || !email || !course || !suggestedDateTime) {
    return res.status(400).json({ message: 'Fill in all mandatory fields!' });
  }

  try {
    const newSchedule = await modelSaveSchedule({name, email, department, course, suggestedDateTime, describe});
    
    const formattedDateTime  = formatDate(suggestedDateTime);

    const mailOptions = {
      from: 'miguel.muniz@ear.com.br',
      to: email,
      subject: 'Agendamento Confirmado',
      text: `Olá ${name},\n\nSeu agendamento para o curso "${course}" foi confirmado para ${formattedDateTime}.\n\nDescrição: ${describe}\n\nAtenciosamente,\n\nIT Team.`
    };

    await sendEmail(mailOptions)
    
    res.status(201).json({
      message: 'Schedule created successfully!',
      data: newSchedule
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating schedule', error });
  }
};

export const getAllSchedules = async (req, res) => {
  try {
    const schedules = await modelGetAllSchedules();
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving schedules', error });
  }
};

export const getScheduleById = async (req, res) => {
  const { id } = req.params;

  try {
    const schedule = await modelGetScheduleById(id);
    if (schedule) {
      res.status(200).json(schedule);
    } else {
      res.status(404).json({ message: 'Schedule not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving schedule', error });
  }
};

export const updateSchedule = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedSchedule = await modelUpdateSchedule(id, updatedData);
    if (updatedSchedule) {
      res.status(200).json({
        message: 'Schedule updated successfully!',
        data: updatedSchedule
      });
    } else {
      res.status(404).json({ message: 'Schedule not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating schedule', error });
  }
};


export const deleteSchedule = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSchedule = await modelDeleteSchedule(id);
    if (deletedSchedule) {
      res.status(200).json({
        message: 'Schedule deleted successfully!',
        data: deletedSchedule
      });
    } else {
      res.status(404).json({ message: 'Schedule not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting schedule', error });
  }
};
