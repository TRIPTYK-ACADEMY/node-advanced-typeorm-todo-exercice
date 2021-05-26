import { appRouter } from '../Router';
import { APIRest } from '../services/apiRest';
import { Views } from '../services/Views';

class RegisterController{
    registerForm : HTMLFormElement;
    execute(){
        return ()=>{
            this.renderView();
            this.initializeView();
        };
    }
    renderView(){
        // eslint-disable-next-line no-console
        console.log('render');
        Views.showView('register');
    }
    initializeView(){
        // eslint-disable-next-line no-console
        this.registerForm = document.getElementById('registerForm') as HTMLFormElement;
        this.registerForm.addEventListener('submit', this.register.bind(this));
        // eslint-disable-next-line no-console
        console.log('initialize view');
    }
    async register(e){
        e.preventDefault();
        const {email, password, repassword} = this.registerForm.elements;
        if(password.value === repassword.value){
            const user = (await APIRest.register({email: email.value, password: password.value}));
            if(user){
                appRouter.navigate('/');
            } else{
                console.log('out you go');
            }
        } else {
            console.log('error');
        }
    }
}
export {RegisterController};