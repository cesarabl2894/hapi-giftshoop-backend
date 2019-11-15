'use strict';
// Environment Variables retrieve
const dotenv = require('dotenv');
dotenv.config();

// Dependencies for Server inilization 
const { getRoutes, validateToken } = require('./helpers/utils');
const Glue = require('@hapi/glue');
const Manifest = require('./config/manifest');

const options = {
    relativeTo: __dirname
};

const start = async () => {

	process.on('unhandledRejection', error => {
		console.log('unhandledRejection', error);
	});
	// Routes imports
	const routes = getRoutes();
	// Server inilization with Glue
	const server = await Glue.compose(Manifest.get('/'), options);

	server.auth.strategy('jwt', 'jwt',
	{ key: process.env.SECRET_TOKEN_KEY,
		validate: validateToken
	});

	try {
		for(let route of routes) {
			server.route(route);
		}
		await server.start();
		console.log(`Server is running on ${server.info.uri}`);
	}catch(error){
		console.log(error);
	}
};

start();