import firebaseConfig from './firebaseConfig.js';
import express from 'express';
import bodyParser from 'body-parser';
import db from './firebaseConfig.js'; 
import nodemailer from 'nodemailer';
import cors from 'cors';


const app = express();
const PORT = process.env.PORT || 3000;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${day}-${month}-${year} T ${hours}:${minutes}`;
};



const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', 
  port: 587,  
  secure: false, 
  auth: {
      },
  logger: true, 
  debug: true, 
});


transporter.verify((error, success) => {
  if (error) {
    console.error('Erro ao conectar com o servidor SMTP:', error);
  } else {
    console.log('Servidor SMTP conectado com sucesso!');
  }
});

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/schedules', async (req, res) => {
  const { name, email, department, course, suggestedDateTime, description } = req.body;

  try {
    await db.collection('schedules').add({
      name,
      email,
      department,
      course,
      suggestedDateTime,
      description,
    });

    const formattedDateTime = formatDate(suggestedDateTime);

    try {
      await transporter.sendMail({
        from: '"IT Training" <miguel.muniz@ear.com.br>',
        to: email,
        subject: `${name} - Appointment Confirmation - IT TRAINING`,
        html: `<p>Hello ${name},</p>
               <p>Your appointment for ${course} has been requested from the IT team. With the following information:</p>
               <p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Department:</strong> ${department}</p>
               <p><strong>Course:</strong> ${course}</p>
               <p><strong>Suggested Date/Time:</strong> ${formattedDateTime}</p>
               <p><strong>Description:</strong> ${description}</p>
               <p>If everything is correct, please wait for us to get back to you as soon as possible. If any information is incorrect or this email is a mistake, please contact us.</p>
               <p>Sincerely, IT Team.</p>
               <p>Thank you!!</p>
               <hr>
               <p>Olá ${name},</p>
               <p>Seu agendamento para o curso ${course} foi solicitado para a equipe de TI. Com os seguintes dados:</p>
               <p><strong>Nome:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Departamento:</strong> ${department}</p>
               <p><strong>Curso:</strong> ${course}</p>
               <p><strong>Data/Hora sugerida:</strong> ${formattedDateTime}</p>
               <p><strong>Descrição:</strong> ${description}</p>
               <p>Se tudo estiver correto, aguarde que retornaremos o mais breve possível. Se houver algum dado incorreto ou este e-mail for um engano, nos contate.</p>
               <button style="background-color: #2C7B95; color: white; padding: 5px 10px; border: none; border-radius: 3px; cursor: pointer;">Button</button>
               <p>Atenciosamente, IT Team.</p>
               <p>Obrigado!!</p>`
      });
      
      console.log('E-mail enviado para o usuário com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar e-mail para o usuário:', error);
      return res.status(500).json({ message: 'Erro ao enviar e-mail para o usuário', error: error.message });
    }

    try {
      await transporter.sendMail({
        from: '"IT Training" <miguel.muniz@ear.com.br>',
        to: 'it@ear.com.br',
        subject: `${name} - New Appointment - IT TRAINING`,
        html: `<p>A new appointment has been requested, we will continue with the data below,</p>
               <p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Department:</strong> ${department}</p>
               <p><strong>Course:</strong> ${course}</p>
               <p><strong>Suggested Date/Time:</strong> ${formattedDateTime}</p>
               <p><strong>Description:</strong> ${description}</p>
               <p>Sincerely, IT TEAM</p>
               <p>Thank You!!</p>
               <hr>
               <p>Um novo agendamento foi solicitado, seguimos com os dados abaixo,</p>
               <p><strong>Nome:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Departamento:</strong> ${department}</p>
               <p><strong>Curso:</strong> ${course}</p>
               <p><strong>Data/Hora sugerida:</strong> ${formattedDateTime}</p>
               <p><strong>Descrição:</strong> ${description}</p>
               <button style="background-color: #2C7B95; color: white; padding: 5px 10px; border: none; border-radius: 3px; cursor: pointer;">Button</button>
               <p>Atenciosamente, IT TEAM</p>
               <p>Obrigado!!</p>`
      });
      
      console.log('E-mail enviado para a TI com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar e-mail para a TI:', error);
      return res.status(500).json({ message: 'Erro ao enviar e-mail para a TI', error: error.message });
    }

    res.status(201).json({ message: 'Agendamento criado e e-mails enviados!' });
  } catch (error) {
    console.error('Erro ao criar agendamento:', error);
    res.status(500).json({ message: 'Erro ao criar agendamento', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
