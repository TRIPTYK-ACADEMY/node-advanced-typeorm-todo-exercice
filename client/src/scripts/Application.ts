import Navigo from 'navigo';
import { AppStorage } from './services/localStorage';

class Application {
    storage:AppStorage;
    router:Navigo;
    constructor(router:Navigo, storage:AppStorage){
        this.storage = storage;
        this.router= router;
    }
   
}
export {Application};