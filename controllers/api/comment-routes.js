const router = require('express').Router();
const withAuth = require('../../util/auth');
const { Comment } = require('../../models');

router.get('/', (req, res) => {
    Comment.findAll({})
    .then(commentDataDb => res.json(commentDataDb))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//get just one comment
router.get('/:id', (req, res) => {
    Comment.findAll({
        where: {
            id: req.params.id
        }
    }) .then (commentDataDb => res.json(commentDataDb))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//post a comment
router.post('/', withAuth, (req, res) => {
    if (req.session) {
        Comment.create({
            comment_content: req.body.comment_content,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        }) .then(commentDataDb => res.json(commentDataDb))
        .catch (err => {
            console.log(err);
            res.status(400).json(err);
        })
    };
});

//edit comment
router.put('/:id', withAuth, (req, res) => {
    Comment.update({
        comment_content: req.body.comment_content
    },
    {
        where: {
            id: req.params.id
        }
    }) .then(commentDataDb => {
        if (!commentDataDb) {
            res.status(404).json({ message: 'There was no comment found with this id.' });
            return;
        }
    }) .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//delete a comment
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
            id: req.params.id
        }
    }) .then(commentDataDb => {
        if (!commentDataDb) {
            res.status(404).json({ message: 'There was no comment found with this id' });
            return;
        }
    }) .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;