const express = require('express');
const path = require('path');
const { Sequelize } = require('sequelize');
const db = require('./config/Database');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();

// PASSPORT CONFIG
require('./config/passport')(passport);

// CAMINHO PARA OS ARQUIVOS ESTÁTICOS
app.use(express.static(path.join(__dirname, 'public')));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// EXPRESS BODY PARSER
app.use(express.urlencoded({ extended: true }));

// EXPRESS SESSION
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);

// PASSPORT MIDDLEWARE
app.use(express.json()); // Para interpretar JSON
app.use(express.urlencoded({ extended: true })); // Para interpretar dados de formulários
app.use(passport.initialize());
app.use(passport.session());

// CONNECT FLASH
app.use(flash());

// VARTIÁVEIS GLOBAIS
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// SINCRONIZAR OS MODELOS
const Group = require('./models/Group');
const History = require('./models/History');
const Organization = require('./models/Organization');
const Package = require('./models/Package');
const Resource = require('./models/Resource');
const Tag = require('./models/Tag');
const User = require('./models/User');
const PackageGroup = require('./models/PackageGroup');
const PackageTag = require('./models/PackageTag');

// ############################################################################
// ############################################################################
Organization.hasMany(Package, { foreignKey: 'organization_id' });
Package.belongsTo(Organization, { foreignKey: 'organization_id' });

Group.belongsToMany(Package, { through: PackageGroup, foreignKey: 'group_id' });
Package.belongsToMany(Group, {
  through: PackageGroup,
  foreignKey: 'package_id',
});

Package.belongsToMany(Tag, { through: PackageTag, foreignKey: 'package_id' });
Tag.belongsToMany(Package, { through: PackageTag, foreignKey: 'tag_id' });

Package.hasMany(Resource, { foreignKey: 'package_id' });
Resource.belongsTo(Package, { foreignKey: 'package_id' });

User.hasMany(History, { foreignKey: 'user_id' });
History.belongsTo(User, { foreignKey: 'user_id' });

// ############################################################################
// ############################################################################
const startServer = async () => {
  try {
    await db.sync({ force: false }); // Sincroniza com o banco
    console.log('Todos os modelos forma sicronizados com sucesso.');

    app.listen(process.env.APP_PORT, () => {
      console.log(`O Servidor está a rodar na porta ${port}...`);
    });
  } catch (error) {
    console.error('Erro na sincronização dos modelos:', error);
  }
};
// SINCRONIZAR OS MODELOS -->FIM

// ROTAS
app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));
app.use('/groups', require('./routes/groups.js'));

// PORTA
const PORT = process.env.PORT || 5000;

// const port = 5000;
app.listen(PORT, console.log(`Server running on  ${PORT}`));
// startServer();
