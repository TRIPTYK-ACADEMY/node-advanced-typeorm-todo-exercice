import { APIRest } from '../services/apiRest';
import { Views } from '../services/Views';

class CategoriesController{
    categoryForm : HTMLFormElement;
    execute(){
        return ()=>{
            this.renderView();
        };
    }
    async renderView(){
        // eslint-disable-next-line no-console
        console.log('render');
        const categories = (await APIRest.findAllCategories()).categories;
        const categories_list: HTMLUListElement = document.getElementById('categories_list') as HTMLUListElement;
        const html = categories.reduce((prev, next)=>{
            return `${prev}\n<li class="p-4 hover:bg-gray-50 cursor-pointer flex items-center justify-between">
            <div class="flex items-center">
                <button class="deleteBtn" data-tpk-id=${next._id}>
                    <svg xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 mr-4 duration-200 text-red-500 hover:text-red-700" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
                ${next.title}
                <span class="text-xs rounded-lg bg-yellow-300 text-yellow-800 ml-4 px-3 py-1">Home</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 fill-current text-gray-300 ml-8"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
        </li>`;
        }, '');
        categories_list.innerHTML=html;
        this.initializeView();
        Views.showView('categories');

    }
    async initializeView(){
        this.categoryForm = document.getElementById('category-form');
       this.categoryForm.addEventListener('submit', this.addCategory.bind(this));
        const deleteBtns = [...document.querySelectorAll('.deleteBtn')];
        deleteBtns.forEach(btn => {
            btn.addEventListener('click', this.deleteCategory.bind(this));
        });
    }
    


    async addCategory(e){
        e.preventDefault();
        const title =this.categoryForm.elements.category_title.value;
      
        if(title !== ''){
            const result = await APIRest.createCategory({title});
           
            if(result.error){
                console.log(result.error.message);
            } else {
                this.renderView();
            }
        }
        
    }
    async deleteCategory(e){
        e.preventDefault();
       const id=e.currentTarget.dataset.tpkId;
        const result = await APIRest.deleteCategory(id);
        if(result){
            this.renderView();
        }
    }
}
export {CategoriesController};