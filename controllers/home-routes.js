const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const router = require('express').Router();

// homepage
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'content',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    }) .then(postDataDb => {
        const posts = postDataDb.map(post => post.get({ plain: true }));
        res.render('homepage', { posts, loggedIn: req.session.loggedIn });
    }) .catch (err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//get post id
router.get('/post/:id', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'content',
            'title',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_content', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    }) .then(postDataDb => {
        if (!postDataDb) {
            res.status(404).json({ message: 'There was no post found with this id.' });
            return;
        }

        const post = postDataDb.get({ plain: true });       

        res.render('single-post', { post, loggedIn: req.session.loggedIn });

    }) .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// allow users to see their own posts & comments
router.get('/posts-comments', (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'content',
            'title',
            'created_at'
        ],
        include: [
            {
                model: Comment,
                model: Comment,
                attributes: ['id', 'comment_content', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    }) .then (postDataDb => {
        if (!postDataDb) {
            res.status(404).json({ message: 'There was no post found with this id' });
            return;
        }

        const post = postDataDb.get({ plain: true });

        render('posts-comments', { post, loggedIn: req.session.loggedIn });

    }) .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
})

module.exports = router;