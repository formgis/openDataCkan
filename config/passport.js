const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

// Importa o modelo Sequelize
const User = require('../models/User');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
      try {
        // Buscar usuário pelo e-mail
        const user = await User.findOne({ where: { email } });

        if (!user) {
          return done(null, false, { message: 'Esse e-mail não está registado' });
        }

        // Comparar senha
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Password incorreta' });
        }
      } catch (err) {
        return done(err);
      }
    })
  );

  // Serializa usuário para a sessão
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Deserializa usuário
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findByPk(id); // Correção aqui
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};