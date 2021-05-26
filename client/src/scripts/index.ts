import { Application } from "./Application";
import { appRouter } from "./Router";
import { AppStorage } from "./services/localStorage";

const init = ()=>{
    const appStorage = AppStorage.getInstance();
    const app = new Application(appRouter,appStorage);
    console.log('app initialized');
};

window.addEventListener('load',init)