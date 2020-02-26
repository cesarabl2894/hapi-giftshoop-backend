const pckg = require("../../package");
const confidence = require("confidence");

const internals = {
  criteria: {
    env: process.env.NODE_ENV
  }
};

internals.manifest = {
  server: {
    cache: false,
    port: process.env.PORT || 3030,
    host: process.env.HOST || "localhost",
    routes: {
      cors: true
    }
  },
  register: {
    plugins: [
      {
        plugin: "vision"
      },
      {
        plugin: "inert"
      },
      {
        plugin: "hapi-auth-jwt2"
      },
      {
        plugin: "hapi-swagger",
        options: {
          info: {
            title: "API Documentation",
            version: pckg.version
          },
          documentationPath: "/",
          securityDefinitions: {
            jwt: {
              type: "apiKey",
              name: "Authorization",
              in: "header"
            }
          },
          security: [{ jwt: [] }]
        }
      }
    ]
  }
};

internals.store = new confidence.Store(internals.manifest);

exports.get = (key, opts = {}) => {
  const criteria = { ...internals.manifest, ...opts };

  return internals.store.get(key, internals.criteria);
};
