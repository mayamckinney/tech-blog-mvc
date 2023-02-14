const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryps')

class User extends Model {
    // will need to add method to confirm login here
};

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            // pw only requires 8 chars
            len: [8]
        }
    },
},
{
    hooks: {
        // setup a beforeCreate & beforeUpdate w/ bcrypt
    },
    sequelize,
    // do not make table plural
    freeseTableName: true,
    // underscores instead of camel case
    underscored: true,
    // no created at & updated at timestamp
    timestamps: false,
    modelName: 'user'
}
);

module.expors = User;