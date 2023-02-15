const { Comment } = require('../models');

const commentData = [
    {
        comment_content: "How cool is that?",
        user_id: 1,
        post_id: 1
    },
    {
        comment_content: "Amazing!",
        user_id: 2,
        post_id: 2
    },
    {
        comment_content: "Great information!",
        user_id: 3,
        post_id: 3
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;