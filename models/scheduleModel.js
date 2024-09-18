const schedules = [];

// Função para salvar o agendamento
export const saveSchedule = (scheduleData) => {
  const newSchedule = {
    id: schedules.length + 1,
    ...scheduleData
  };

  // Adiciona o novo agendamento ao array
  schedules.push(newSchedule);

  return newSchedule;
};

// Função para obter todos os agendamentos (caso seja necessário no futuro)
export const getSchedules = () => {
  return schedules;
};
