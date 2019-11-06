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

    async deleteUser(email) {
        const response = await db.execute('DELETE FROM User WHERE email = ?' , [email], 'games');
        return response;
    }
    
}

module.exports = new UsersDAO();