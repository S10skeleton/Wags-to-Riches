const breedsData = require('./breeds.json');
const usersData = require('./users.json');
const userPreferencesData = require('./user-prefrences.json');
const currentPetsData = require('./current-pets.json');

const sequelize = require('../config/connection');
const { User, Pets } = require('../models');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Seed data for Model1
  const users = await User.bulkCreate(usersData, {
    individualHooks: true,
    returning: true,
  });

  await breeds.bulkCreate(breedsData, {
    individualHooks: true,
    returning: true,
  });
//   await Users.bulkCreate(usersData, {
//     individualHooks: true,
//     returning: true,
//   });

  await userPreferences.bulkCreate(userPreferencesData, {
    individualHooks: true,
    returning: true,
  });

  await currentPets.bulkCreate(currentPetsData, {
    individualHooks: true,
    returning: true,
  });

  // Seed data for Model2 (if it depends on Model1, use model1Entries)
  // Add any specific logic needed

  process.exit(0);
};

seedDatabase();
