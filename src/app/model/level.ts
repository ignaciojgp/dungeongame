import { Room } from './room';

export class Level {
    public grid: Array<Room>;

    constructor(){
        this.grid = new Array<Room>();
    }
}
