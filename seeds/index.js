const seedComments = require('./comment.seeds');
const seedPosts = require('./post-seeds');
const seedUsers = require('./user-seeds');
const sequelize= require('../config/connection');

const seedDb = async () => {
    await sequelize.sync({ force: true });
    console.log('DATABASE SYNCED');
    await seedUsers();
    await seedPosts();
    await seedComments();
    console.log('ALL DATA HAS BEEN SEEDED SUCCESSFULLY');
    process.exit(0);
};

seedDb();