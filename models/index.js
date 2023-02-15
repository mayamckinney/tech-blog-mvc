const Comment = require('./comment');
const Post = require('./post');
const User = require('./user');

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id',
    onDelete: 'cascade'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
});

User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'cascade'
});

Post.hasMany(User, {
    foreignKey: 'post_id',
    onDelete: 'cascade'
});

module.exports = { Comment, User, Post };