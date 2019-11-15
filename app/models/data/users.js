const db = require('../../helpers/db');

class UsersDAO {
    async addUser(data){
        const user =  await db.execute(`INSERT INTO User (first_name, last_name, email, address, gamertag, profile_picture,
            password, role)
            VALUES (?,?,?,?,?,?,?,?);`,
            [
                data.first_name,
                data.last_name,
                data.email,
                data.address,
                data.gamertag,
                data.profile_picture,
                data.password,
                data.role
            ],
            'games');
        return user;
    }
    async getUserbyEmail(email) {
        const user = await db.execute(`SELECT * FROM User WHERE email = ?`, [email], 'games');
        return user;
    }
    async getUserbyId(id) {
        const user = await db.execute(`SELECT * FROM User WHERE id = ?`, [id], 'games');
        return user;
    }

    async deleteUser(email) {
        const response = await db.execute('DELETE FROM User WHERE email = ?' , [email], 'games');
        return response;
    }
    async updateToken(data) {
        const update = await db.execute('UPDATE User SET reset_token = ? , reset_token_expiry WHERE id = ?', [
            data.reset_token,
            data.reset_toke_expiry,
            data.id
        ], 'games');
        return update;
    }
    
}

module.exports = new UsersDAO();