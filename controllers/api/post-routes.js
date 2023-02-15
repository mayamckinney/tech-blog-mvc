const sequelize = require('../../config/connection');
const { Post, User, Comment } = require('../../models');
const router = require('express').Router();
const withAuth = require('../../util/auth');

// get all the posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'title',
            'content',
            'created_at'
        ],
        order: [['created_at', 'DESC']],
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
    }) .then(postDataDb => res.json(postDataDb.reverse()))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
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
    }) .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.put('/:id', withAuth, (req, res) => {
    Post.update({
        title: req.body.title,
        content: req.body.content
    },
    {
        where: {
            id: req.params.id
        }
    }).then(postDataDb => {
        if (!postDataDb) {
            res.status(404).json({ message: 'There was no post found with this id.' });
            return;
        }
    }) .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//delete a post
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    }) .then(postDataDb => {
        if (!postDataDb) {
            res.status(404).json({ message: 'There was no post found with this id.' });
            return;
        }
    }) .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;
