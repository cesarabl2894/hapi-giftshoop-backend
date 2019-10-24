const usersService = require('../models/services/users');
const { hashPassword } = require('../models/services/encrypt');

class loginCtrl {

    async validateLogin(request) {
        const { email , password } = request.payload;
        const jsonResponse = {responseCode: 200, responseMessage: ''};
        console.log(email);
        const user = await usersService.getUserbyEmail(email);

        
        if(user.length > 0 ) {
            jsonResponse.responseCode = 400;
            jsonResponse.responseMessage = 'Not User Found with Email';
            return jsonResponse;
        }

        return jsonResponse;

    }
}

module.exports = new loginCtrl();