import { Profile } from "./profile";

export class User {
    Surname: string;
    Email: string;
    Password: string;
    Dni: string;
    RegisterProfile: Profile[];

    constructor(surname: string, email: string, password: string, dni: string, perfiles: Profile[]) {
      this.Surname = surname;
      this.Email = email;
      this.Password = password;
      this.Dni = dni;
      this.RegisterProfile = perfiles;
    }
  }
