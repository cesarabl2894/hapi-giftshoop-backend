const authService = require("../models/services/auth");
const Boom = require("@hapi/boom");

class loginCtrl {
  async login(request) {
    const jsonResponse = { responseCode: 200, responseMessage: "" };

    jsonResponse.data = await authService.validateLogin(request.payload);

    if (Boom.isBoom(jsonResponse.data)) {
      return jsonResponse.data;
    }
    return jsonResponse;
  }
}

module.exports = new loginCtrl();
