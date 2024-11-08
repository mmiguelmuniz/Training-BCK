import db from '../config/firebaseConfig.js';
import { existsSync } from 'fs';


// criar um novo agendamento
export const saveSchedule = async (schedule) => {
    const scheduleRef = db.collection('schedules');
    const newScheduleRef = await scheduleRef.add(schedule);
    return { id: newScheduleRef.id, ...schedule };
};

export const getAllSchedules = async () => {
    const scheduleRef = db.collection('schedules');
    const snapshot = await scheduleRef.get();
    const schedules = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return schedules;
};

export const getScheduleById = async (id) => {
    const scheduleRef = db.collection('schedules').doc(id);
    const doc = await scheduleRef.get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
};

export const updateSchedule = async (id, updatedSchedule) => {
    const scheduleRef = db.collection('schedules').doc(id);
    await scheduleRef.update(updatedSchedule);
    return { id, ...updatedSchedule };
};

export const deleteSchedule = async (id) => {
    const scheduleRef = db.collection('schedules').doc(id);
    await scheduleRef.delete();
    return { id };
};




