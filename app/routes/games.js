const gamesCtrl = require('../controllers/games');
const Joi = require('joi');

module.exports = [
    {
        method: 'GET',
        path: '/games/',
        handler: gamesCtrl.getGames,
        options: {            
            tags: ['api'],
            auth: 'jwt'
        },
    },
    {
        method: 'GET',
        path: '/games/{id}/',
        handler: gamesCtrl.getGameById,
        options: {            
            tags: ['api'],
            validate: {
                params: {
                    id: Joi.number().required()
                }
            }
        },
    },
    {
        method: 'POST',
        path: '/games/',
        handler: gamesCtrl.addGame,
        options: {            
            tags: ['api','admin'],
            auth: 'jwt',
            validate: {
                payload: {
                    name: Joi.string().required().max(200),
                    developer:Joi.string().required(),
                    publisher: Joi.string().required(),
                    price: Joi.number().required(),
                    description: Joi.string().required(),
                    image:Joi.string()
                }
            }
        },
    },
    {
        method: 'PUT',
        path: '/games/',
        handler: gamesCtrl.updateGame,
        options: {            
            tags: ['api','admin'],
            auth: 'jwt',
            validate: {
                payload: {
                    name: Joi.string().required().max(200),
                    developer:Joi.string().required(),
                    publisher: Joi.string().required(),
                    price: Joi.number().required(),
                    description: Joi.string().required(),
                    image:Joi.string(),
                    id: Joi.number().required()
                }
            }
        },
    },
    {
        method: 'DELETE',
        path: '/games/',
        handler: gamesCtrl.deleteGame,
        options: {            
            tags: ['api','admin'],
            auth: 'jwt',
            validate: {
                payload: {
                    id: Joi.number().required()
                }
            }
        },
    }
];