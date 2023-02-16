const { Comment, Post, User } = require('../../models');
const router = require('express').Router();

// get all users
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ['password'] }
    }) .then(userDataDb => res.json(userDataDb))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get user by id
router.get('/:id', (req, res)=> {
    User.findOne({
        attributes: { excludes: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Post,
                attributes: [ 'id', 'title', 'content', 'created_at']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_content', 'created_at'],
                include: {
                    model: Post,
                    attributes: ['title']
                }
            }
        ]
    }) .then(userDataDb => {
        if (!userDataDb) {
            res.status(404).json({ message: 'There was no user found with this id.' });
            return;
        }
    }) .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// create a new user on sign up
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    }) .then(userDataDb => {
        req.session.save(() => {
            req.session.user_id = userDataDb.id;
            req.session.username = userDataDb.username;
            req.session.loggedIn = true;
        });
    }) .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// post req to verify users
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }) .then(userDataDb => {
        if (!userDataDb) {
            res.status(400).json({ message: 'There was no user found with that username.' });
            return;
        };

        const validatePassword = userDataDb.checkPassword(req.body.password);

        if (!validatePassword) {
            res.status(400).json({ message: 'Incorrect password.' });
            return;
        };

        req.session.save(() => {
            req.session.user_id = userDataDb.id;
            req.session.username = userDataDb.username;
            req.session.loggedIn = true;
        });
    }) .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// logout route
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(200).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router;