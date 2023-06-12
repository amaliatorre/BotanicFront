import { Profile } from "./profile";

export class UsuInfo {
    email: string;
    perfiles: Profile[];

    constructor( email: string, perfiles: Profile[]) {
      this.email = email;
      this.perfiles = perfiles;
    }
  }