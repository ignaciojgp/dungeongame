export class Room {
    public name: string;
    public description: string;
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
        this.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id pulvinar nulla. Phasellus efficitur lorem quis sollicitudin vulputate. Mauris ultricies porta urna, eget finibus arcu ultrices a. Nam eget velit justo. Ut ut diam et nunc maximus aliquet eget a lacus.";

    }
}
