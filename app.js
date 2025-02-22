const express = require('express');
const db = require('./config/Database');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

// PASSPORT CONFIG
require('./config/passport')(passport);

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// EXPRESS BODY PARSER
app.use(express.urlencoded({ extended: true }));

// EXPRESS SESSION
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());

// CONNECT FLASH
app.use(flash());

// VARTIÁVEIS GLOBAIS
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// SINCRONIZAR OS MODELOS
// const Group = require('./models/Group');
// const History = require('./models/History');
// const Organization = require('./models/Organization');
// const Package = require('./models/Package');
// const Resource = require('./models/Resource');
// const Tag = require('./models/Tag');
// const User = require('./models/User');

// ROTAS
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));

// SINCRONIZAR OS MODELOS
// Sincronizar a base de dados e criar as tabelas a partir do model respetivo
// const startServer = async () => {
//   try {
//     await db.sync({ force: false }); // Sincroniza com o banco
//     console.log('Todos os modelos forma sicronizados com sucesso.');

//     app.listen(process.env.APP_PORT, () => {
//       console.log(`O Servidor está a rodar na porta ${port}...`);
//     });
//   } catch (error) {
//     console.error('Erro na sincronização dos modelos:', error);
//   }
// };
// SINCRONIZAR OS MODELOS -->FIM

// PORTA
const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on  ${PORT}`));