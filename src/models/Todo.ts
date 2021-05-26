import { prop, Ref } from '@typegoose/typegoose';
import { Category } from './Category';
import { User } from './User';
class Todo{
    @prop({required:true, unique:true})
    public title?:string;
    @prop()
    public description?:string;
    @prop({ref:()=>Category})
    public category?:Ref<Category>
    @prop({ref:()=>User})
    public user?:Ref<User>;
}

export{Todo};