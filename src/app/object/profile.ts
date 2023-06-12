import { Avatar } from "./avatar";
import { Color } from "./color";

export class Profile {
    public id:number;
    public userId:number;
    public name: string;
    public birthday: Date;
    public gender: string;
    public active: boolean;
    public rol: string;
    public color:Color = new Color('', '', '');
    public avatar:Avatar = new Avatar('', '', '');

    constructor(id:number, userId:number, name:string, birthday:Date, gender:string,active: boolean, rol:string, color: Color, avatar:Avatar  ) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.birthday = birthday;
        this.gender = gender;
        this.active = active;
        this.rol = rol;
        this.color = color;
        this.avatar = avatar;
    }
}

