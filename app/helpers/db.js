const Mysql = require('./dbadapters/mysql')

class db {
    getEnvironment() {
        return process.env.NODE_ENV;
    }
    
    getDBConfiguration(){
        const dbConfig = require('../config/db-config');
        return dbConfig;
    }

    async execute(sql, options, datasource = '') {
        const config = this.getDBConfiguration()[this.getEnvironment()][datasource];
        if(!config) throw(`Datasource '${datasource}' was not found on ${this.getEnvironment()} environment.`);
        switch(config.engine){
            case "mysql":
                // Return a new Promise to 
                const adapter = new Mysql(config);
                return new Promise((resolve,reject) => {
                    adapter.execute(sql, options)
                    .then( response => {
                        resolve(response)
                    })
                    .catch(error => {
                        console.log(error)
                        reject(error)
                    });
                })
            break;
            case 'oracle':
            break;
            default:
                throw('Unhandled database type: ' + dbconfig.engine);
        }
    }
}

module.exports = new db();