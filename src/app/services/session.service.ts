import { Injectable } from '@angular/core';
import { Level } from '../model/level';
import { RoomGeneratorService } from './room-generator.service';
import { Room } from '../model/room';

@Injectable({
  	providedIn: 'root'
})
export class SessionService {

	public levels:Array<Level>;
	public currentLevel:number;
	public currentRoom:number;
	private levelSize = 10;

	constructor(private generator: RoomGeneratorService) {
		this.currentLevel = 0;
		this.currentRoom = 0;
	}

	public startNewGame(){
		this.levels = new Array<Level>();
		this.addLevel();
	}

	private addLevel():Level{
		let level = this.generator.initMapWithSize(this.levelSize);
		this.levels.push(level);
		return level;
	}

	public getCurrentLevel():Level{
		if(this.levels == null) return null;
		return this.levels[this.currentLevel];
	}

	public getCurrentRoom():Room{
		if(this.levels == null) return null;

		return this.getCurrentLevel().grid[this.currentRoom];
	}

}
