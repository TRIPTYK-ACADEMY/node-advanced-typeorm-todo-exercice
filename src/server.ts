import { config } from 'dotenv';
import { getRepository } from 'typeorm';
import { app } from './app.bootstrap';
import { DatabaseConnector } from './app.database';
import { AuthController } from './controllers/api/v1/AuthController';
import { TodoController } from './controllers/api/v1/TodoController';
import { UserController } from './controllers/api/v1/UserController';
import { User } from './models/User';

config({ path: 'variables.env' });

export const initApp = async () =>{

    const db = await DatabaseConnector.initDatabase();

    // dès que la connection est initialisée, on attribue le repository au controller, si on avait fait ça avant ça aurait crash car la connection n'a pas encores été initialisée
    UserController.repository = getRepository(User);
    TodoController.init();
    AuthController.init();

    if(db){
        app.listen(process.env.PORT, ()=>{
            // eslint-disable-next-line no-console
            console.log(`app listening on port ${process.env.PORT}`);
        });
    } else {
        // eslint-disable-next-line no-console
        console.log('There was an error in the database connection');
    }
    
    return app;
};