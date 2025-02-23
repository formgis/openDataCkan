const express = require('express');
const router = express.Router();
const Group = require('../models/Group');
const Package = require('../models/Package');

router.get('/', async (req, res) => {
  try {
    const groups = await Group.findAll({ include: Package });
    console.log('Grupos:', groups); // Verifica se os dados estão corretos
    res.render('groups', { groups }); // Envia os grupos para o EJS
  } catch (error) {
    console.error('Erro ao carregar grupos:', error);
    res.status(500).send('Erro ao carregar grupos');
  }
});

router.get('/:id', async (req, res) => {
  const group = await Group.findByPk(req.params.id, { include: Package });
  if (group) res.json(group);
  else res.status(404).send('Grupo não encontrado');
});

router.post('/', async (req, res) => {
  try {
    const group = await Group.create(req.body);
    res.status(201).json(group);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Group.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedGroup = await Group.findByPk(req.params.id);
      res.json(updatedGroup);
    } else res.status(404).send('Grupo não encontrado');
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Group.destroy({ where: { id: req.params.id } });
    if (deleted) res.status(204).send();
    else res.status(404).send('Grupo não encontrado');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
