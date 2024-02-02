const router = require('express').Router();
const axios = require('axios');
const { Project, User } = require('../../models');
const withAuth = require('../../utils/auth');
const token = process.env.PETFINDER_TOKEN;


router.get('/', async (req, res) => {
  try {
    const petData = await axios.get('https://api.petfinder.com/v2/animals?type=cat', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    // Filter cats with pictures
    const catsWithPictures = petData.data.animals.filter(cat => cat.photos.length > 0);

    // Extract details from response
    const catNames = catsWithPictures.map(cat => cat.name);
    const catDescription = catsWithPictures.map(cat => cat.description);
    const catBreed = catsWithPictures.map(cat => cat.breeds.primary);
    const catAge = catsWithPictures.map(cat => cat.age);
    const catGender = catsWithPictures.map(cat => cat.gender);
    const catSize = catsWithPictures.map(cat => cat.size);
    const catCity = catsWithPictures.map(cat => cat.contact.address.city);
    const catState = catsWithPictures.map(cat => cat.contact.address.state);
    const catEmail = catsWithPictures.map(cat => cat.contact.email);
    const catPhone = catsWithPictures.map(cat => cat.contact.phone);
    const catPhotos = catsWithPictures.map(cat => cat.photos.length > 0 ? cat.photos[0].full : null);


    console.log('Cats:', catNames, catDescription, catBreed, catAge, catGender, catSize, catCity, catState, catEmail, catPhone, catPhotos);

    // Pass serialized data and session flag into template
    res.render('homepage', { 
     catNames, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


router.post('/', async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
