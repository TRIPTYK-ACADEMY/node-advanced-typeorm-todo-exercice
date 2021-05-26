import { prop } from '@typegoose/typegoose';
class Category{
    @prop({required:true, unique:true})
    public title?:string;
}

export{Category};