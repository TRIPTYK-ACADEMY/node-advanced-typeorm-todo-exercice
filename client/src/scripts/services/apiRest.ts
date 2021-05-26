import { appRouter } from '../Router';
import { AppStorage } from './localStorage';

class APIRest {
    static baseURL = 'http://localhost:3000'
    static checkToken = async(token)=>{
        try{
          
            const options = {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'authorization':`Bearer ${token}`
                }
            };
            return APIRest.execute('api/v1/check-token', options);
        }catch(e){console.log(e);}
    }
    static login = async (values)=>{
        const options = {
            method: 'POST',
            body:JSON.stringify(values),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        };
        return APIRest.execute('api/v1/login', options);
    }   
    static register = async (values)=>{
        const options = {
            method: 'POST',
            body:JSON.stringify(values),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        };
        return APIRest.execute('api/v1/users', options);
    }   
    static findAllTodos= async (category?:string)=>{
        try{
        const token = AppStorage.getInstance('tpk-app').getValue('token');
        const isValidToken = await APIRest.checkToken(token);
         if(!isValidToken.token.isValid){
            appRouter.navigate('/');
         }
        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'authorization':`Bearer ${token}`
            }
        };
        if(category){
            return APIRest.execute(`api/v1/todos?filterByCategory=${category}`, options);
        }
        return APIRest.execute('api/v1/todos', options);
    }catch(e){console.log(e);}
    }
    static findAllCategories= async ()=>{
        try{
        const token = AppStorage.getInstance('tpk-app').getValue('token');
        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'authorization':`Bearer ${token}`
            }
        };
        return APIRest.execute('api/v1/categories', options);
    }catch(e){console.log(e);}
    }
    
    static createCategory = async (values)=>{
        const token = AppStorage.getInstance('tpk-app').getValue('token');
        const options = {
            method: 'POST',
            body:JSON.stringify(values),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'authorization':`Bearer ${token}`
            }
        };
        return APIRest.execute('api/v1/categories', options);
    } 
    
    static createTodo = async (values)=>{
        const token = AppStorage.getInstance('tpk-app').getValue('token');
        const options = {
            method: 'POST',
            body:JSON.stringify(values),
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'authorization':`Bearer ${token}`
            }
        };
        return APIRest.execute('api/v1/todos', options);
    } 


    static deleteTodo = async (values)=>{
        const token = AppStorage.getInstance('tpk-app').getValue('token');
        const options = {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'authorization':`Bearer ${token}`
            }
        };
        return APIRest.execute(`api/v1/todos/${values}`, options);
    }
    static deleteCategory = async (values)=>{
        const token = AppStorage.getInstance('tpk-app').getValue('token');
        const options = {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'authorization':`Bearer ${token}`
            }
        };
        return APIRest.execute(`api/v1/categories/${values}`, options);
    }
    
    static async execute(action, options={}){
        try{
            const rawResponse = await fetch(`${this.baseURL}/${action}`, options);
            const response = await rawResponse.json();
            return response;
        }catch(e){
            // eslint-disable-next-line no-console
            return e;
        }
   
    }
}

export{APIRest};