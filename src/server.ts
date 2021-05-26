import { config } from 'dotenv';
import { app } from './app.bootstrap';
import { DatabasConnector } from './app.database';

config({path:'variables.env'});

const init = async () =>{

    const db = await DatabasConnector.initDatabase();
    if(db){
        app.listen(process.env.PORT, ()=>{
            // eslint-disable-next-line no-console
            console.log(`app listening on port ${process.env.PORT}`);
        });
    } else {
        // eslint-disable-next-line no-console
        console.log('There was an error in the database connection');
    }
    
};

init();