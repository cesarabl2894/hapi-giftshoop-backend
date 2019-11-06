const usersService = require('./users');
const { _ } = require('../../helpers/utils');
const jwt = require('jsonwebtoken');
const encryptService = require('./encrypt');
const Boom = require('@hapi/boom');

class authService {
    async validateLogin(data){
        const { email , password } = data;
        const users = await usersService.getUserbyEmail(email);
        const user = _.find(users, {email: email});
        let token = {};

        if(user) {
            const match = await encryptService.compare(password, user.password);
            if(match){
                token = jwt.sign(_.omit(user,['password','address','profile_picture']), process.env.SECRET_TOKEN_KEY, { algorithm: 'HS256', expiresIn: "2h" });
                return token;
            }
        }
        return Boom.unauthorized('Invalid Credentials');
    }
}

module.exports = new authService();