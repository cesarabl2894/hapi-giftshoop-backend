const db = require('../../helpers/db');
class GamesDAO {
    async getGames() {
        const games = await db.execute('SELECT * FROM Game',[],'games');
        return games;
    }
    async getGameById(id) {
        const game = await db.execute('SELECT * FROM Game WHERE id = ?', [id] , 'games')
        return game;
    }
    async addGame(data) {
        console.log(data);
        const response = await db.execute(`
            INSERT INTO Game (name, developer, publisher, price, description, image) 
            VALUES (?,?,?,?,?,?)`
        , 
        [
            data.name,
            data.developer,
            data.publisher,
            data.price,
            data.description,
            data.image,
        ],
         'games');
        return response;
    }
    async deleteGame(id) {
        const response = await db.execute('DELETE FROM Game WHERE id = ?', [id] , 'games');
        return response;
    }
    async updateGame(data) {
        const sql = `
            UPDATE Game SET
            name = ?,
            developer = ?,
            publisher = ?,
            price = ?,
            description = ?,
            image = ?
            WHERE id = ?;
        `;
        const response = await db.execute(sql, [
            data.name,
            data.developer,
            data.publisher,
            data.price,
            data.description,
            data.image,
            data.id
        ], 'games');
        return response;
    }
    
}


module.exports = new GamesDAO();

