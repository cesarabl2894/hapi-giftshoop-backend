const UsersService = require('../models/services/users');
const encryptService = require('../models/services/encrypt');


class UsersCtrl {
    async addUser(request){
        const params = request.payload;
        const jsonResponse = { responseCode: 200 , responseMessage: '' };
        const user =await UsersService.getUserbyEmail(params.email);
        
        // Validation to check if there is an user with the email Address
        if(user.length > 0 ){
            jsonResponse.responseMessage = 'User already exists with email adddress.';
            jsonResponse.responseCode = 400;
            return jsonResponse;
        }
        // Generate Salt And Hashed Password.
        const salt = await encryptService.generateSalt();
        const hashedPassword = await encryptService.hashPassword(params.password, salt);

        // // Reassigning params.password to new hashed password
        params.password = hashedPassword;
        
        await UsersService.addUser(params);
        jsonResponse.responseMessage = 'User Added Correctly';
        return jsonResponse;

    }
}

module.exports = new UsersCtrl();