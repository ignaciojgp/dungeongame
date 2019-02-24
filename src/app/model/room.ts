export class Room {
    public name: string;
    public locx: number;
    public locy: number;

    public topWall:boolean;
    public bottomWall:boolean;
    public leftWall:boolean;
    public rightWall:boolean;

    public topRoom:Room;
    public bottomRoom:Room;
    public leftRoom:Room;
    public rightRoom:Room;

    constructor (){

        this.name = "prueba";


    }
}
