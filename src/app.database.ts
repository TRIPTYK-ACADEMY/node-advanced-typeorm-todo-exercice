import { connect } from 'mongoose';

class DatabasConnector{
    static async initDatabase(){
        try{
            return await connect(process.env.DB_URI ||'', {
                useCreateIndex:true,
                useFindAndModify:true,
                useNewUrlParser:true,
                useUnifiedTopology:true
            });
        } catch(error){
            return false;
        }
    }
}

export {DatabasConnector};