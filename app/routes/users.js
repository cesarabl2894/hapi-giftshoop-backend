const usersCtrl = require("../controllers/users");
const Joi = require("joi");

module.exports = [
  {
    method: "POST",
    path: "/signin/",
    handler: usersCtrl.addUser,
    options: {
      tags: ["api"],
      validate: {
        payload: {
          first_name: Joi.string()
            .required()
            .min(2)
            .max(20),
          last_name: Joi.string()
            .required()
            .min(2)
            .max(20),
          email: Joi.string()
            .required()
            .min(2)
            .max(30),
          address: Joi.string()
            .required()
            .min(5),
          gamertag: Joi.string()
            .required()
            .min(2)
            .max(30),
          profile_picture: Joi.string()
            .required()
            .min(2)
            .max(100),
          password: Joi.string()
            .required()
            .min(7)
            .max(50),
          role: Joi.string()
            .required()
            .min(2)
            .max(30)
        }
      }
    }
  },
  {
    method: "DELETE",
    path: "/users/",
    handler: usersCtrl.deleteUser,
    options: {
      auth: "jwt",
      tags: ["api", "admin"],
      validate: {
        payload: {
          email: Joi.string()
            .required()
            .min(2)
            .max(30)
        }
      }
    }
  },
  {
    method: "PUT",
    path: "/users/",
    handler: usersCtrl.updateUser,
    options: {
      tags: ["api"],
      auth: "jwt",
      validate: {
        payload: {
          id: Joi.number()
            .required()
            .min(1),
          first_name: Joi.string()
            .required()
            .min(2)
            .max(20),
          last_name: Joi.string()
            .required()
            .min(2)
            .max(20),
          email: Joi.string()
            .required()
            .min(2)
            .max(30),
          address: Joi.string()
            .required()
            .min(5),
          gamertag: Joi.string()
            .required()
            .min(2)
            .max(30),
          profile_picture: Joi.string()
            .required()
            .min(2)
            .max(100),
          role: Joi.string()
            .required()
            .min(2)
            .max(30)
        }
      }
    }
  },
  {
    method: "GET",
    path: "/users/",
    handler: usersCtrl.getUsers,
    options: {
      auth: "jwt",
      tags: ["api", "admin"]
    }
  },
  {
    method: "GET",
    path: "/user/{id}",
    handler: usersCtrl.getUserInfo,
    options: {
      tags: ["api"],
      validate: {
        params: {
          id: Joi.number().required()
        }
      }
    }
  },
  {
    method: "POST",
    path: "/password/reset/",
    handler: usersCtrl.resetRequest,
    options: {
      tags: ["api"],
      validate: {
        payload: {
          email: Joi.string()
            .required()
            .email()
        }
      }
    }
  },
  {
    method: "POST",
    path: "/password/update/",
    handler: usersCtrl.updatePassword,
    options: {
      tags: ["api"],
      validate: {
        payload: {
          email: Joi.string()
            .required()
            .email(),
          password: Joi.string()
            .required()
            .min(7)
            .max(50),
          confirm_password: Joi.string()
            .required()
            .min(7)
            .max(50),
          reset_token: Joi.string().required()
        }
      }
    }
  }
];
