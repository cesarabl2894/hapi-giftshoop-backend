const gamesCtrl = require('../controllers/games');

module.exports = [
    {
        method: 'GET',
        path: '/games',
        handler: gamesCtrl.getGames,
        options: {            
            tags: ['api','admin'],
            auth: 'jwt'
        },
    }
];