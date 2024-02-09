const router = require('express').Router();
const axios = require('axios');
const { Pet, User } = require('../models');
const withAuth = require('../utils/auth');
const token = process.env.PETFINDER_TOKEN;


router.get('/', async (req, res) => {
  try {
    // Fetch dogs
    const dogData = await axios.get('https://api.petfinder.com/v2/animals?type=dog', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    // Fetch cats
    const catData = await axios.get('https://api.petfinder.com/v2/animals?type=cat', {
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

    // Filter and map dogs and cats
    const dogsWithPictures = sortPets(dogData.data.animals);
    const catsWithPictures = sortPets(catData.data.animals);

    // Combine dogs and cats into one array
    const petsArray = [...dogsWithPictures, ...catsWithPictures];

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


    // Route for only dogs, can be swapped to cats by replacing dog 
    // router.get('/', async (req, res) => {
    //   try {
    //     const petData = await axios.get('https://api.petfinder.com/v2/animals?type=dog', {
    //       headers: {
    //         'Authorization': `Bearer ${token}`
    //       }
    //     });
    
    //     // Filter dogs with pictures
    //     const dogsWithPictures = petData.data.animals.filter(dog => dog.photos.length > 0);
    
    //     console.log(dogsWithPictures[0])
    
    //     const petsArray = dogsWithPictures.map(dog => {
    //       return {
    //         name: dog.name,
    //         description: dog.description,
    //         breed: dog.breeds.primary,
    //         species: dog.species,
    //         age: dog.age,
    //         size: dog.size,
    //         coat: dog.coat,
    //         attributes: dog.attributes,
    //         image: dog.photos[0].large
    //       }
    //     })
    
    //     // Pass serialized data and session flag into template
    //     res.render('homepage', { 
    //       petsArray, 
    //       logged_in: req.session.logged_in 
    //     });
    //   } catch (err) {
    //     res.status(500).json(err);
    //   }
    // });
    



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
