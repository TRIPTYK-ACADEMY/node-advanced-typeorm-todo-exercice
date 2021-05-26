import { plugin, prop, Ref } from '@typegoose/typegoose';
import passportLocal from 'passport-local-mongoose';
import { Todo } from './Todo';
@plugin(passportLocal, {
    usernameField:'email'
})
class User{
    @prop({required:true, unique:true})
    public email?:string;
    @prop({ref: ()=>Todo})
    public todos?: Ref<Todo>[];
}

export{User};