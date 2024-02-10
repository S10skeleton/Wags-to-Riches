const router = require('express').Router();
const userRoutes = require('././api/userRoutes')
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const petRoutes = require('./petRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/login', userRoutes);
router.use('/pet', petRoutes);

module.exports = router;
