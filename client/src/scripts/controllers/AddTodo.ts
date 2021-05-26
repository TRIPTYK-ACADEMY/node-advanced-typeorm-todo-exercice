import { appRouter } from '../Router';
import { APIRest } from '../services/apiRest';
import { Views } from '../services/Views';

class AddTodoController{
    addTodoForm : HTMLFormElement;
    execute(){
        return ()=>{
            this.renderView();
            
        };
    }
    async renderView(){
        // eslint-disable-next-line no-console
        console.log('render');
        const cat_select = document.getElementById('category');
        cat_select.innerHTML= '';
        const categories = (await APIRest.findAllCategories()).categories;
        categories.forEach(category => {
            const option = document.createElement('option');
            option.text=category.title;
            option.value=category._id;
            cat_select.add(option);
        });
        Views.showView('add_todos'); 
        this.initializeView();
    }
    async initializeView(){
     // eslint-disable-next-line no-console
     this.addTodoForm = document.getElementById('addTodoForm') as HTMLFormElement;
     this.addTodoForm.addEventListener('submit', this.addTodo.bind(this));
     // eslint-disable-next-line no-console
     console.log('initialize view');
 }
 async addTodo(e){
     e.preventDefault();
     const {description, title, category} = this.addTodoForm.elements;
     const apiCall = (await APIRest.createTodo({description: description.value, title: title.value, category: category.value}));
     if(apiCall){
        appRouter.navigate('/todos');
     };
 }
    
}
export {AddTodoController};