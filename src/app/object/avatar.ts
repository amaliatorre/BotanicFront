export class Avatar {
    name: string;
    location: string;
    description: string;

    constructor(avatar_name:string, avatar_location:string, avatar_description:string) {
        this.name = avatar_name;
        this.location = avatar_location;
        this.description = avatar_description;
    }
}