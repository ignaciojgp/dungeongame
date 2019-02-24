import { Injectable } from '@angular/core';
import { Room } from '../model/room';
import { Level } from '../model/level';

enum direction{
  	NONE,  
  	TOP,
	BOTTOM,
	LEFT,
	RIGHT,
    
}

@Injectable({
    providedIn: 'root'
})
export class RoomGeneratorService {

    constructor() { }


    public initMapWithSize(distance: number): Level {

        let level: Level = new Level();

        this.generateRoom(distance, 0, 0, level, direction.NONE, null);


        return level;

    }

    private generateRoom(iteration:number, locx:number, locy:number, level:Level, becomeFromDirection:direction, previousRoom:Room):Room{


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
                room.name = "" + (level.grid.length -1);
                

				//generamos cuartos para cada pared del cuarto

                if(becomeFromDirection == direction.LEFT) {
                  room.leftRoom = previousRoom;
                }else{
                  room.leftRoom = this.generateRoom(iteration, locx -1, locy, level, direction.RIGHT,room); //a la izquierda
                }
                
                if(becomeFromDirection == direction.RIGHT){
                   room.rightRoom = previousRoom;
                }else{
                  room.rightRoom= this.generateRoom(iteration, locx +1, locy, level, direction.LEFT,room); //a la derecha
                }
                
                if(becomeFromDirection == direction.BOTTOM) {
                  room.bottomRoom = previousRoom;
                }else{
                  room.bottomRoom = this.generateRoom(iteration, locx , locy +1, level, direction.TOP,room); //a la abajo
                }

                if(becomeFromDirection == direction.TOP){
                  room.topRoom = previousRoom;
                }else{ 
                  room.topRoom = this.generateRoom(iteration, locx , locy -1, level, direction.BOTTOM,room); //a la arriba
                } 
                


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
