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
    async updateToken(data) {
        try{
            const response = UsersDAO.deleteUser(data);
            return response;
        }catch(error){
            console(error);
        }
    }
    async getAllUsers(){
        try {
            const users = UsersDAO.getAllUsers();
            return users;
        }catch(error){
            console.log(error);
        }
    }
    getUserById(id) {
        try {
            const user = UsersDAO.getUserbyId(id);
            return user;
        }catch(error){
            throw(`Something went Wrong with the request ${error}`);
        }
    }
    async updateUser(data){
        try {

            const user = await UsersDAO.updateUser(data);
            return user;
        }catch(error) {
            console.log(error);
        }
    }
}

module.exports = new UsersService();