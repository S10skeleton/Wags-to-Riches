const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const petRoutes = require('./petRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/pet', petRoutes);

module.exports = router;
