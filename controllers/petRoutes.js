const router = require('express').Router();
const axios = require('axios');
const { Pets, User } = require('../models');
const withAuth = require('../utils/auth');
const token = process.env.PETFINDER_TOKEN;

router.get('/:id', async (req, res) => {
  const petId = req.params.id;
  try {
    const petDetail = await axios.get(`https://api.petfinder.com/v2/animals/${petId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    const pet = {
      id: petDetail.data.animal.id,
      name: petDetail.data.animal.name,
      gender: petDetail.data.animal.gender,
      description: petDetail.data.animal.description,
      breed: petDetail.data.animal.breeds.primary,
      species: petDetail.data.animal.species,
      state: petDetail.data.animal.contact.address.state,
      email: petDetail.data.animal.contact.email,
      phone: petDetail.data.animal.contact.phone,
      city: petDetail.data.animal.contact.address.city,
      image: petDetail.data.animal.photos.length > 0 ? petDetail.data.animal.photos[0].large : null,
      logged_in: req.session.logged_in,
    };

    res.render('pet', pet)
  } catch (err) {
    res.status(500).json(err);
  }
});




router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Pets }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});


module.exports = router;
