const UsersDAO = require('../data/users');

class UsersService {
    async addUser(data){
        const user = await UsersDAO.addUser(data);
        return user;
    }
    getUserbyEmail(email) {
        try {
            const user = UsersDAO.getUserbyEmail(email);
            return user;
        }catch(error){
            throw(`Something went Wrong with the request ${error}`);
        }
    }
    deleteUser(email) {
        try{
            const response = UsersDAO.deleteUser(email);
            return response;
        }catch(error){
            console(error);
        }
    }
}

module.exports = new UsersService();