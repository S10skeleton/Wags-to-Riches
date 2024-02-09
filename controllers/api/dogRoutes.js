const router = require('express').Router();
const axios = require('axios');
const { Pet, User } = require('../../models');
const withAuth = require('../../utils/auth');
const token = process.env.PETFINDER_TOKEN;


router.get('/', async (req, res) => {
  try {
    // Fetch dogs
    const dogData = await axios.get('https://api.petfinder.com/v2/animals?type=dog', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    // Function to filter animals with pictures and map properties
    const sortPets = (pets) => pets.filter(pet => pet.photos.length > 0).map(pet => ({
      id: pet.id,
      name: pet.name,
      description: pet.description,
      breed: pet.breeds.primary,
      species: pet.species,
      age: pet.age,
      size: pet.size,
      coat: pet.coat,
      email: pet.email,
      phone: pet.phone,
      city: pet.city,
      state: pet.state,
      attributes: pet.attributes,
      image: pet.photos[0].large
    }));

    // Filter and map dogs
    const dogsWithPictures = sortPets(dogData.data.animals);

    // Combine dogs into one array
    const petsArray = [...dogsWithPictures];

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      petsArray, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/pet/:id', async (req, res) => {
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
    };

    res.render('pet', pet);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.get('/profile', withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
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

