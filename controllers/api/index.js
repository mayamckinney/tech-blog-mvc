const router = require('express').Router();

const commentRoutes = require('./comment-routes');
const postRoutes = require('./post-routes');
const userRoutes = require('./post-routes');

router.use('/comments', commentRoutes);
router.use('/posts', postRoutes);
router.use('/comments', commentRoutes);

module.exports = router;