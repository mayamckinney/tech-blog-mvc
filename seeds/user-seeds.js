const { User } = require('../models');

const userData = [
    {
        username: 'mayamckinney',
        password: 'password'
    },
    {
        username: 'admin',
        password: 'password1'
    },
    {
        username: 'johndoe',
        password: 'password3'
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;