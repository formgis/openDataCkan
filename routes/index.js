const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

// WELCOME PAGE
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// DASHBOARD
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user,
  })
);

module.exports = router;
