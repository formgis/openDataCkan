const express = require('express');

const db = require('./config/Database'); // Importa a instância do banco
const Group = require('./models/Group');
const History = require('./models/History');
const Organization = require('./models/Organization');
const Package = require('./models/Package');
const Resource = require('./models/Resource');
const Tag = require('./models/Tag');
const User = require('./models/User');



const port = process.env.APP_PORT || 5000;

const app = express();


app.get('/', (req, res) => {
  res.send('Home Page');
});

// Sincronizar a base de dados e criar as tabelas a partir do model respetivo
const startServer = async () => {
  try {
    await db.sync({ force: false }); // Sincroniza com o banco
    console.log('Todos os modelos forma sicronizados com sucesso.');

    app.listen(process.env.APP_PORT, () => {
      console.log(`O Servidopr está a rodar na porta ${port}...`);
    });
  } catch (error) {
    console.error('Erro na sincronização dos modelos:', error);
  }
};


startServer();