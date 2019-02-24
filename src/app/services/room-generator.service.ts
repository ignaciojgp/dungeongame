import { Injectable } from '@angular/core';
import { Room } from '../model/room';
import { Level } from '../model/level';

enum direction{
    TOP,
    BOTTOM,
    LEFT,
    RIGHT,
    NONE
}

@Injectable({
    providedIn: 'root'
})
export class RoomGeneratorService {

    constructor() { }


    public initMapWithSize(distance: number): Level {

        let level: Level = new Level();

        this.generateRoom(distance, 0, 0, level, -1);


        return level;

    }

    private generateRoom(iteration:number, locx:number, locy:number, level:Level, becomeFromDirection:direction):Room{


        if(iteration == 0){
            return null;
        }else{
            iteration --;
        }

        //revisamos si ya hay un cuarto en dicha localizacion
        var alreadyExists = false;

        for(let room of level.grid ){
            if(room.locx == locx && room.locy == locy){
                alreadyExists = true;
                return null;
            }
        }

        //si no está, lo creamos
        if(!alreadyExists){

            if(Math.random()*100 < 40 && !(locx == 0 && locy == 0)){
                return null;
            }else{

                let room = new Room();
                room.name = Math.random()+"";
                room.locx = locx;
                room.locy = locy;

                level.grid.push(room);

                //generamos cuartos para cada pared del cuarto


                if(direction != direction.LEFT) room.leftWall = this.generateRoom(iteration, locx -1, locy, level, direction.RIGHT) == null; //a la izquierda
                else room.leftWall = false;
                if(direction != direction.RIGHT) room.rightWall= this.generateRoom(iteration, locx +1, locy, level, direction.LEFT) == null; //a la derecha
                else room.rightWall = false;
                if(direction != direction.BOTTOM) room.bottomWall = this.generateRoom(iteration, locx , locy -1, level, direction.TOP) == null; //a la abajo
                else room.bottomWall = false;
                if(direction != direction.TOP) room.topWall = this.generateRoom(iteration, locx , locy +1, level, direction.BOTTOM) == null; //a la arriba
                else room.topWall = false;


                return room;
            }

        }else{
            return null;
        }

    }

    public generateRandomRoom(): Room{
        return new Room();
    }

}
