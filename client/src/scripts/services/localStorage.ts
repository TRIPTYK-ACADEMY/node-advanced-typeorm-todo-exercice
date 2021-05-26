
class AppStorage{
    static instance : AppStorage;
    name='tpk-app';
    constructor(){}
    static getInstance():AppStorage{
        if (!AppStorage.instance){
            AppStorage.instance = new AppStorage();
        }
            return AppStorage.instance;
    }
    getValue(id){
        const storage = JSON.parse(localStorage.getItem(this.name));
        return storage[id];
       
    }
    setValue(id, value){
        if(!localStorage.getItem(this.name)){
            localStorage.setItem(this.name, JSON.stringify({}));
        }
        const storage = JSON.parse(localStorage.getItem(this.name));
        storage[id] = value;
        localStorage.setItem(this.name, JSON.stringify(storage));
    }
}

export {AppStorage};