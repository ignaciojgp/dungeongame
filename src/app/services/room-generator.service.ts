import { Injectable } from '@angular/core';
import { Room } from '../model/room';

@Injectable({
  providedIn: 'root'
})
export class RoomGeneratorService {

  constructor() { }


  public initMapWithSize(width: number , height: number): Array<Array<Room>> {

    let rows = Array<Array<Room>>(height);
     
    for ( let i = 0 ; i  < height; i++ ){
      rows[i] = new Array<Room>(width);

    }


    return null;
  }

  public generateRandomRoom(): Room{
    return new Room();
  }

}
