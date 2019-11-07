const GamesService = require('../models/services/games');
const Boom = require('@hapi/boom');

class GamesCtrl {
    async getGames() {
        const games = await GamesService.getGames();
        return games;
    }
    async getGameById(request) {
        const game = await GamesService.getGameById(request.params.id);
        return game;
    }
    async addGame(request) {
        const jsonResponse = {statusCode: 200, responseMessage: ''};
        const params = request.payload;
        
        const response = await GamesService.addGame(params);
        jsonResponse.data = await GamesService.getGameById(response.insertId);
        jsonResponse.responseMessage = 'Game Added';

        return jsonResponse;
    }
    async updateGame(request) {
        const jsonResponse = {statusCode: 200, responseMessage: ''};
        const response = await GamesService.updateGame(request.payload);

        jsonResponse.data = await GamesService.getGameById(response.insertId);
        jsonResponse.responseMessage = 'Game Updated';

        return jsonResponse;
    }
    async deleteGame(request) {
        const jsonResponse = { statusCode: 200, responseMessage: '' };
        const { id } = request.params;

        const game = await GamesService.getGameById(id);
        if(game.length > 0) {
            await GamesService.deleteGame(id);
            jsonResponse.responseMessage = 'Game deleted';
            return jsonResponse;
        }
        return Boom.badRequest('Game Not Found');

    }
}

module.exports = new GamesCtrl();