const express = require('express');
const db = require('../config/Database');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Users = require('../models/User');
const passport = require('passport');

// LOAD USER MODEL
const User = require('../models/User');
const { forwardAuthenticated } = require('../config/auth');

// LOGIN PAGE
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// REGISTER PAGE
router.get('/register', forwardAuthenticated, (req, res) =>
  res.render('register')
);

// REGISTER
router.post('/register', async (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  // Validações básicas
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Por favor insira todos os campos' });
  }

  if (password !== password2) {
    errors.push({ msg: 'As passwords não coincidem' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'A password deve ter pelo menos 6 caracteres' });
  }

  if (errors.length > 0) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      password2,
    });
  }

  try {
    // Verifica se o e-mail já está registrado
    const user = await Users.findOne({ where: { email } });

    if (user) {
      errors.push({ msg: 'Email já existe' });
      return res.render('register', {
        errors,
        name,
        email,
        password,
        password2,
      });
    }

    // Hash da password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Criar novo usuário
    await Users.create({
      name,
      email,
      password: hashedPassword,
      created: new Date(),
      last_login: new Date(),
    });

    req.flash('success_msg', 'Agora você está registrado e pode fazer login');
    res.redirect('/users/login');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro no servidor');
  }
});

// LOGIN
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true,
  })(req, res, next);
});

// LOGOUT
router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash('success_msg', 'Você está desconectado');
    res.redirect('/users/login');
  });
});

module.exports = router;
