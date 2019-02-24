import { Component, OnInit } from '@angular/core';
import { RoomGeneratorService } from '../services/room-generator.service';
import { Level } from '../model/level';
import { Room } from '../model/room';

@Component({
  selector: 'app-room-displayer',
  templateUrl: './room-displayer.component.html',
  styleUrls: ['./room-displayer.component.less']
})
export class RoomDisplayerComponent implements OnInit {

    public level:Level;
    private  size = 30;
    private  wallSize = 3;

    constructor(private generator: RoomGeneratorService){
      this.level = generator.initMapWithSize(10);
      console.log(this.level);
    }

    ngOnInit() {
        this.drawMap();
    }

    drawMap(){

        let minx = Math.min.apply(Math, this.level.grid.map(function(o) { return o.locx; }));
        let miny = Math.min.apply(Math, this.level.grid.map(function(o) { return o.locy; }));

        let maxx = Math.max.apply(Math, this.level.grid.map(function(o) { return o.locx; }));
        let maxy = Math.max.apply(Math, this.level.grid.map(function(o) { return o.locy; }));


        console.log("minx: "+minx + " miny: "+miny +" maxx: "+maxx+" maxy: "+maxy );


        let canvas:HTMLCanvasElement = document.getElementById('canvas');
        //debugger;
        canvas.width = (Math.abs(minx) + Math.abs(maxx) +1 ) * this.size;
        canvas.height = (Math.abs(miny) + Math.abs(maxy) +1 ) * this.size;

        if(canvas.getContext('2d')){
            var ctx = canvas.getContext('2d');
            ctx.font = "10px Arial";

            var count = 1;
            for(let room of this.level.grid){
                count++;

                setTimeout(() => {
                    this.drawRoom(room,ctx,minx, miny);
     
                }, 10*count);
               
            }




        }
    }

    drawRoom(room:Room, ctx:any, minx:number, miny:number){
        ctx.fillStyle = '#FFeded';//+Math.floor(Math.random()*16777215).toString(16);

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

        ctx.fillText(room.name, posx+this.wallSize*2, posy+this.wallSize*5);

    }

}
