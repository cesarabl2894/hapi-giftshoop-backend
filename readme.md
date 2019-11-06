# Hapi Boilerplate 

This is a project that use Hapi 18.4.0 to run a backend server, that supports mutiple connections to DB and different engines as MySQL, Oracle.

Server configuration and Plugin registration is under `/app/config/manifest.js`.

Use JWT for authentication and the session on the server.

To start the configuration of your project
1. Set up the env variables to use on the project, create a `.env` file on the root of the folder.
2. Inside the `.env` file create a variable for `NODE_ENV`, setup as local or production, depending on the server that you will use.
3. Use a secret to use for encrypt and store it as secret_key on the `.env` file.
4. Create a db-config.json file and store it on the app/config folder. the structure of the JSON is below, that will contain multiple objects with the database that you will use for the project (As first key of the json will be the environment of the DB collection of datasources).
5. Create the routes, the `/app/routes` folder, and name the js file according to the section or the category will use it. (*Example: products.js*)
6. Create a controller file to manage the logic of the data on the `/app/controllers` that will have the name of the section as the route 
**Note: Please dont't call the DB direct from the controller**;
7. Create a file to use it on different part of the projects `/app/model/sevices`, this can contain calls to DB, API, or another service that can be used in the project.
8. Finally Create the data call file on `/app/model/data` this are the models and data queries that are going to be used.


```env
    NODE_ENV=local
```

## Confifuration of the db-config.json
``` json
    {
        "local" : {
            "datasourcename": {
                "host": "localhost",
                "user": "user",
                "password": "password",
                "database": "mysqldatabasename",
                "engine": "mysql"
            }
        }
    }
```

## Call to the DB
``` javascript
    // import db wrapper
    const db = new require('../helpers/db');
    // Execution of the query and assigning to a variable
    const query = async db.execute('SELECT * FROM table WHERE name = ?' , ['test'], 'datasourcename');
```