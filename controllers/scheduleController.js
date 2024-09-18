import { saveSchedule } from '../models/scheduleModel.js';

export const createSchedule = (req, res) => {
  const { name, email, department, course, suggestedDateTime, describe } = req.body;

  // Validar se os dados foram preenchidos
  if (!name || !email || !course || !suggestedDateTime) {
    return res.status(400).json({ message: 'Preencha todos os campos obrigatórios!' });
  }

  // Chama o modelo para salvar os dados
  const newSchedule = saveSchedule({ name, email, department, course, suggestedDateTime, describe });

  // Retorna uma resposta ao usuário
  res.status(201).json({
    message: 'Agendamento criado com sucesso!',
    data: newSchedule
  });


// Adefinimos uma estrutura básica de agendamento.
// será uma lista em memória.

let schedules = [];

// Função para criar um novo agendamento

const createSchedule = (schedule) => {
    const newSchedule = {
        id: schedules.length + 1,
        name: schedule.name,
        email: schedule.email,
        department: schedule.department,
        course: schedule.course,
        suggestedDateTime: schedule.suggestedDateTime,
        description: schedule.description,
    };
    schedules.push(newSchedule);
    return newSchedule;
};

// Função para listar todos os agendamentos
const getAllSchedules = () => {
    return schedules;
};


// parseInt = converte string em um numero inteiro. 
// Função para encontrar um agendamento pelo ID.

const getScheduleById = (id) => {
    return schedules.find((schedule) => schedule.id === parseInt(id));
};

// Função para atualizar um agendamento existente
const updateSchedule = (id, updatedSchedule) => {
    const index = schedules.findIndex((schedule) => schedule.id === parseInt(id));
    if (index !== -1) {
        schedules[index] = { ...schedules[index], ...updatedSchedule };
        return schedules[index];
    }
    return null;
};

// Função para deletar 
const deleteSchedule = (id) => {
    const index = schedules.findIndex((schedule) => schedule.id === parseInt(id));
    if (index !== -1) {
        const deletedSchedule = schedules.splice(index, 1);
        return deletedSchedule[0];
    }
    return null;
};

module.exports = {
    createSchedule,
    getAllSchedules,
    getScheduleById,
    updateSchedule,
    deleteSchedule,
};

};
