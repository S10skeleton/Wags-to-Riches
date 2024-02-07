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
    // const catPhotos = catsWithPictures.map(cat => cat.photos.length > 0 ? cat.photos[0].full : null);

    console.log('Cats:', catNames, catDescription, catBreed, catAge, catGender, catSize, catCity, catState, catEmail, catPhone);

    // Pass serialized data and session flag into template
    res.render('homepage', { 
    catNames, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
    const petData = await axios.get('https://api.petfinder.com/v2/animals?type=dog', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    // Filter dogs with pictures
    const dogsWithPictures = petData.data.animals.filter(dog => dog.photos.length > 0);

    // Extract details from response
    const dogNames = dogsWithPictures.map(dog => dog.name);
    const dogDescription = dogsWithPictures.map(dog => dog.description);
    const dogBreed = dogsWithPictures.map(dog => dog.breeds.primary);
    const dogAge = dogsWithPictures.map(dog => dog.age);
    const dogGender = dogsWithPictures.map(dog => dog.gender);
    const dogSize = dogsWithPictures.map(dog => dog.size);
    const dogCity = dogsWithPictures.map(dog => dog.contact.address.city);
    const dogState = dogsWithPictures.map(dog => dog.contact.address.state);
    const dogEmail = dogsWithPictures.map(dog => dog.contact.email);
    const dogPhone = dogsWithPictures.map(dog => dog.contact.phone);
    // const dogPhotos = dogsWithPictures.map(dog => dog.photos.length > 0 ? dog.photos[0].full : null);

    console.log('dogs:', dogNames, dogDescription, dogBreed, dogAge, dogGender, dogSize, dogCity, dogState, dogEmail, dogPhone);

    // Pass serialized data and session flag into template
    res.render('homepage', { 
    dogNames, 
      logged_in: req.session.logged_in 
    });
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


// const router = require('express').Router();
// const axios = require('axios');
// const { Project, User } = require('../models');
// const withAuth = require('../utils/auth');
// const token = process.env.PETFINDER_TOKEN;


// router.get('/', async (req, res) => {
//   try {
//     // Get all projects and JOIN with user data
//     const projectData = await Project.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });
//     const petData = await axios.get('https://api.petfinder.com/v2/animals?type=cat&age=young', {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }})

//     // Serialize data so the template can read it
//     const projects = projectData.map((project) => project.get({ plain: true }))
//     const catNames = petData.data.animals.map(cat => cat.name);
//     console.log('Cats:', catNames)

//     // Pass serialized data and session flag into template
//     res.render('homepage', { 
//       projects, 
//       logged_in: req.session.logged_in 
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get('/project/:id', async (req, res) => {
//   try {
//     const projectData = await Project.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     const project = projectData.get({ plain: true });

//     res.render('project', {
//       ...project,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Use withAuth middleware to prevent access to route
// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Project }],
//     });

//     const user = userData.get({ plain: true });

//     res.render('profile', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get('/login', (req, res) => {
//   // If the user is already logged in, redirect the request to another route
//   if (req.session.logged_in) {
//     res.redirect('/profile');
//     return;
//   }

//   res.render('login');
// });

// module.exports = router;
