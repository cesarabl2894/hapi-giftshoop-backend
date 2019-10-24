const loginCtrl = require('../controllers/login');
const Joi = require('joi');

module.exports = [
    {
        method: 'POST',
        path: '/login/',
        handler: loginCtrl.validateLogin,
        options: {
            tags: ['api'],
            validate: {
                payload: {
                    email: Joi.string().required().email().min(2).max(30),
                    password: Joi.string().required()
                }
            }
        }
    }
]