const usersCtrl = require('../controllers/users');
const Joi = require('joi');

module.exports = [
    {
        method: 'POST',
        path: '/signin/',
        handler: usersCtrl.addUser,
        options: {
            tags: ['api'],
            validate: {         
                payload : {
                    first_name: Joi.string().required().min(2).max(20),
                    last_name:Joi.string().required().min(2).max(20),
                    email: Joi.string().required().min(2).max(30),
                    address: Joi.string().required().min(5),
                    gamertag: Joi.string().required().min(2).max(30),
                    profile_picture: Joi.string().required().min(2).max(100),
                    password: Joi.string().required().min(7).max(50),
                    role: Joi.string().required().min(2).max(30)
                }       
            }
        }
    }
];