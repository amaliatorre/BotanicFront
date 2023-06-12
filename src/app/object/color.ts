export class Color {
    name: string;
    code: string;
    description: string;

    constructor(border_color_name: string, border_color_code: string, border_color_description:string) {
        this.name = border_color_name;
        this.code = border_color_code;
        this.description = border_color_description;
    }
}