const UsersService = require('../models/services/users');
const encryptService = require('../models/services/encrypt');
const { _ , promise } = require('../helpers/utils');
const { promisify } = require('util');
const { randomBytes } = require('crypto');
const Boom = require('@hapi/boom');

class UsersCtrl {
    /**
     * 
     * @typedef {Object} request
     * @property {string} first_name
     */
    /**
     * Returns the add User Response
     * @param {object} request 
     * @returns {Promise<jsonResponse>}
     */
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

    async deleteUser(request) {
        const { email } = request.payload;
        const jsonResponse = {responseCode: 200, responseMessage: ''};
        const user =await UsersService.getUserbyEmail(email);

        if(user.length < 1 ) {
            return Boom.badRequest('Not User Found');
        }
        
        await UsersService.deleteUser(email);
        jsonResponse.responseMessage = 'User Deleted Correctly';
        return jsonResponse;
    }

    // Update User Function
    async updateUser(request) {
        const jsonResponse = {responseCode: 200, responseMessage: ''};
        const { payload } = request;
        const user = await UsersService.getUserById(payload.id);

        // Validate that there is an existing ID
        if(user.length < 1 ) {
            return Boom.badRequest(' User Not Found with Id');
        }

        // Validate that is not overwritting an existing Email
        if(user[0].email !== payload.email) {
            const existingEmail = await UsersService.getUserbyEmail(payload.email);

            if(existingEmail.length > 0 ){
                return Boom.badRequest('User already linked with existing Email');
            }

        }

        await UsersService.updateUser(payload);
        jsonResponse.responseMessage = `User with id: ${payload.id} has been updated`;

        return jsonResponse;

    }

    async resetRequest(data) {
        const randomBytesPromiseified = promisify(randomBytes);
        const resetToken = (await randomBytesPromiseified(250)).toString('hex');
        console.log(randomBytesPromiseified);

        return resetToken;
    }

    // Get Array of Users
    async getUsers() {
        const jsonResponse = {responseCode: 200 };
        jsonResponse.data = await UsersService.getAllUsers();

        return jsonResponse;
    }

    async getUserInfo(request) {
        const jsonResponse = {responseCode: 200 };
        const params = request.params;
        const user =await UsersService.getUserById(params.id);

        if(user.length > 0) {
            jsonResponse.data = _.omit(user[0],['password']);
            return jsonResponse;
        }

        return Boom.badRequest('User Not Found with Id');

    }
}

module.exports = new UsersCtrl();