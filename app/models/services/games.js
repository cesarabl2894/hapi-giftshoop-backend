const gamesDAO = require('../data/games');

class GamesService {

    async getGames () {
        try{
            const games  = await gamesDAO.getGames();
            return games;
        }catch(error){
            throw('Something went wrong with the request');
        }
    }
    getGameById(id){
        try{
            const game  =  gamesDAO.getGameById(id);
            return game;
        }catch(error){
            throw('Something went wrong with the request');
        }
    }
    addGame(data) {
        try{
            const response  = gamesDAO.addGame(data);
            return response;
        }catch(error){
            throw('Something went wrong with the request');
        }
    }
    updateGame(data) {
        try{
            const response  = gamesDAO.updateGame(data);
            return response;
        }catch(error){
            throw('Something went wrong with the request');
        }
    }
    deleteGame(data) {
        try{
            const response  = gamesDAO.deleteGame(data);
            return response;
        }catch(error){
            throw('Something went wrong with the request');
        }
    }
}
    
module.exports = new GamesService();