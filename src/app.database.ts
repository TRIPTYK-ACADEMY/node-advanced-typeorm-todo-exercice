import { createConnection } from 'typeorm';

class DatabasConnector{
    static async initDatabase(){
        try{
            const connection = await createConnection({
                type: 'mysql',
                username: 'root',
                password: 'test',
                host: 'localhost',
                port: 3306,
                database: 'todo_typeorm',
                synchronize: true,
                entities: []
            });
            return connection;
        } catch(error){
            return false;
        }
    }
}

export { DatabasConnector };
