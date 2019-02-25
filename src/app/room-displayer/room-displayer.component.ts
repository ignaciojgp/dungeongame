import { Component, OnInit } from '@angular/core';
import { RoomGeneratorService } from '../services/room-generator.service';
import { Level } from '../model/level';
import { Room } from '../model/room';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-room-displayer',
  templateUrl: './room-displayer.component.html',
  styleUrls: ['./room-displayer.component.less']
})
export class RoomDisplayerComponent implements OnInit {

    public level:Level;
    private  size = 30;
    private  wallSize = 3;

    public mapVisibility = false;
    public showingRoom:Room;

    private minx:number;
    private miny:number;

    private maxx:number;
    private maxy:number;

    constructor(private sessionService: SessionService){
      this.level = sessionService.getCurrentLevel();

      if(this.level == null){
          sessionService.startNewGame();
           this.level = sessionService.getCurrentLevel();
      }


      this.showingRoom = sessionService.getCurrentRoom();


      console.log(this.level);
      console.log(this.showingRoom);
    }

    ngOnInit() {
        this.drawMap();
    }

    drawMap(){

        if(this.level == null){
            console.log("no hay nivel a pintar");
            return;
        }

        this.minx = Math.min.apply(Math, this.level.grid.map(function(o) { return o.locx; }));
        this.miny = Math.min.apply(Math, this.level.grid.map(function(o) { return o.locy; }));

        this.maxx = Math.max.apply(Math, this.level.grid.map(function(o) { return o.locx; }));
        this.maxy = Math.max.apply(Math, this.level.grid.map(function(o) { return o.locy; }));


        console.log("minx: "+this.minx + " miny: "+this.miny +" maxx: "+this.maxx+" maxy: "+this.maxy );


        let canvas:any = document.getElementById('canvas');
        
        canvas.width = (Math.abs(this.minx) + Math.abs(this.maxx) +1 ) * this.size;
        canvas.height = (Math.abs(this.miny) + Math.abs(this.maxy) +1 ) * this.size;

        if(canvas.getContext('2d')){
            var ctx = canvas.getContext('2d');
            ctx.font = "10px Arial";

            var count = 1;
            for(let room of this.level.grid){
                count++;

                setTimeout(() => {
                    this.drawRoom(room,ctx,this.minx, this.miny);
     
                }, 10*count);
               
            }
        }


        this.updateMapScroll();


    }

    drawRoom(room:Room, ctx:any, minx:number, miny:number){
        ctx.fillStyle = '#ededed';//+Math.floor(Math.random()*16777215).toString(16);

        let posx = (room.locx - minx)*this.size;
        let posy = (room.locy - miny)*this.size;

        ctx.fillRect(posx+this.wallSize, posy+this.wallSize, this.size-this.wallSize*2, this.size-this.wallSize*2);

        
        
        if(room.topRoom){
            ctx.fillRect(
                posx+this.wallSize*2,
                posy,
                this.size-this.wallSize*4,
                this.wallSize);
        }
        if(room.bottomRoom){
            ctx.fillRect(
                posx+this.wallSize*2,
                posy+this.size-this.wallSize,
                this.size-this.wallSize*4,
                this.wallSize
                );
        }
        if(room.leftRoom){
            ctx.fillRect(
                posx,
                posy+this.wallSize*2,
                this.wallSize,
                this.size-this.wallSize*4
                );
        }
        if(room.rightRoom){
            ctx.fillRect(
                posx+this.size-this.wallSize,
                posy+this.wallSize*2,
                this.wallSize,
                this.size-this.wallSize*4
                );
        }

        ctx.fillStyle = '#FF0000';//+Math.floor(Math.random()*16777215).toString(16);

        // ctx.fillText(""+room.id, posx+this.wallSize*2, posy+this.wallSize*5);

    }


    public updateMapScroll(){
        let mapPanel:any = document.getElementById('mapPanel');

        let room = this.sessionService.getCurrentRoom();

        let posx = (room.locx - this.minx)*this.size;
        let posy = (room.locy - this.miny)*this.size;

        mapPanel.scrollTop=posy+15;
        mapPanel.scrollLeft=posx+15;
    }

    public toggleMap(){
        this.mapVisibility = !this.mapVisibility;
    }


    public move(direction:string){
        var nextRoom:Room = null;

        switch (direction) {
            case "left":
                nextRoom = this.showingRoom.leftRoom;
                break;
            case "right":
                nextRoom = this.showingRoom.rightRoom;
                break;
            case "up":
                nextRoom = this.showingRoom.topRoom;
                break;
            case "down":
                nextRoom = this.showingRoom.bottomRoom;
                break;

            default:
                break;
        }

        if(nextRoom != null){
            this.showingRoom = nextRoom;
            this.sessionService.currentRoom = this.showingRoom.id;
            this.updateMapScroll();
        }else{
            console.log("no hay cuardo al cual ir");
        }


    }

}
