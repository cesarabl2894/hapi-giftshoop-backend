'use strict';
const utils = require('./utils');

require('dotenv').config();

console.log(process.env.PORT);

const Hapi = require('@hapi/hapi');

const server = Hapi.Server({
	port: process.env.PORT,
	host: process.env.HOST

});


const games = [
    {
        name: 'The Legend of Zelda',
        releaseYear: 1995,
        developer: 'Gamefreak',
        price: 50,
        decription: 'LoremIpsum'
    }
];

// const getGames = (request ,h) => {
// 	console.log(games);
//     return new Promise(games;
// }

const init = async () => {

	process.on('unhandledRejection', error => {
		console.log('unhandledRejection', error);
	});

	const routes = utils.getRoutes();

	
	server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {

            return 'Hello World!';
        }
	});
	
	// server.route(
	// 	{
	// 		method: 'GET',
	// 		path: '/games',
	// 		handler: (request, h) => {
	// 			return games
	// 		},
	// 		options: {
				
	// 			tags: ['api']
	// 		},
	// 	}
	// );

	try{
		for(let route of routes) {
			server.route(route);
		}
		await server.start();
		console.log(`Server is running on ${server.info.uri}`);
	}catch(error){
		console.log(error);
	}
};

init();