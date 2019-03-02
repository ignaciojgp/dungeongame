import { Treasure } from './treasure';
import { Monster } from './monster';

export class Room {
    public id:number;
    public name: string;
    public description: string;
    public image: string;
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

    public treasure:Treasure;
    public monster:Monster;

    constructor (){

        this.name = "prueba";
        this.description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum id pulvinar nulla. Phasellus efficitur lorem quis sollicitudin vulputate. Mauris ultricies porta urna, eget finibus arcu ultrices a. Nam eget velit justo. Ut ut diam et nunc maximus aliquet eget a lacus.";

    }
}
