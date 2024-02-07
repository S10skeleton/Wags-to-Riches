const router = require('express').Router();
const axios = require('axios');
const { Pet, User } = require('../models');
const withAuth = require('../utils/auth');
const token = process.env.PETFINDER_TOKEN;


router.get('/', async (req, res) => {
  try {
    console.log(`hello`)
    res.render('homepage');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
