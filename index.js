import express from 'express';

// import db from './config/Database.js'; // Importa a instância do banco
// import groupModel from './models/groupModel.js';
// import historyModel from './models/historyModel.js';
// import organizationModel from './models/organizationModel.js';
// import packageModel from './models/packageModel.js';
// import resourceModel from './models/resourceModel.js';
// import tagModel from './models/tagModel.js';
// import userModel from './models/userModel.js';



const port = 5000;

const app = express();


app.get('/', (req, res) => {
  res.send('Home Page');
});

// Sincronizar a base de dados e criar as tabelas a partir do model respetivo
// const startServer = async () => {
//   try {
//     await db.sync({ force: true }); // Sincroniza com o banco
//     console.log('All models were synchronized successfully.');

//     app.listen(process.env.APP_PORT, () => {
//       console.log(`Server running on port ${process.env.APP_PORT}...`);
//     });
//   } catch (error) {
//     console.error('Error syncing models:', error);
//   }
// };

app.listen(port, () => {
  console.log(`Listen on port ${port}`)
});

