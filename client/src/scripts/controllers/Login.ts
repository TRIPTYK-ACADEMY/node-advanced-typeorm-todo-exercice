import { appRouter } from '../Router';
import { APIRest } from '../services/apiRest';
import { AppStorage } from '../services/localStorage';
import { Views } from '../services/Views';

class LoginController{
    loginForm : HTMLFormElement;
    execute(){
        return ()=>{
            this.renderView();
            this.initializeView();
        };
    }
    renderView(){
        // eslint-disable-next-line no-console
        console.log('render');
        Views.showView('login');
    }
    initializeView(){
        // eslint-disable-next-line no-console
        this.loginForm = document.getElementById('loginForm') as HTMLFormElement;
        this.loginForm.addEventListener('submit',this.login.bind(this));
        // eslint-disable-next-line no-console
        console.log('initialize view');
    }
    async login(e){
        e.preventDefault();
        const {email,password} = this.loginForm.elements;
      const token = (await APIRest.login({email: email.value,password: password.value}));
      if(typeof token === 'string'){
        AppStorage.getInstance('tpk_app').setValue('token',token);
          appRouter.navigate('/todos');
      } else{
          console.log('out you go');
      }
    
    }
}
export {LoginController};