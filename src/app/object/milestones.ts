export class Milestone {
    id: number;
    routeId: number;
    name: string;
    description: string;
    info: string;
    completed?: boolean;

    constructor(id?: number, routeId?: number, name?: string, description?: string, info?: string) {
        this.id = 0;
        this.routeId = 0;
        this.name = "";
        this.description ="";
        this.info =  "";
        this.completed;
    }
}


