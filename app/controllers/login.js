const usersService = require('../models/services/users');
const encryptService = require('../models/services/encrypt');
const { _ } = require('../helpers/utils');
const jwt = require('jsonwebtoken');
const Boom = require('@hapi/boom');

class loginCtrl {

    async validateLogin(request) {
        const { email , password } = request.payload;
        const jsonResponse = {responseCode: 200, responseMessage: ''};
        const users = await usersService.getUserbyEmail(email);
        const user = _.find(users, {email: email});

        
        if(user) {
            const match = await encryptService.compare(password, user.password);
            if(match){
                jsonResponse.data = {
                    token: jwt.sign(_.omit(users,['password','address','profile_picture']), process.env.SECRET_TOKEN_KEY, { algorithm: 'HS256', expiresIn: "2h" })
                };
                return jsonResponse;
            }
        }
        return Boom.unauthorized('Invalid Credentials');

    }
}

module.exports = new loginCtrl();