const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const catRoutes = require('./catRoutes')

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/cats', catRoutes);

module.exports = router;
