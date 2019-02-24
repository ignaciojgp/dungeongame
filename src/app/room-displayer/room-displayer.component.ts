import { Component, OnInit } from '@angular/core';
import { RoomGeneratorService } from '../services/room-generator.service';
import { Level } from '../model/level';

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

        let minx = Math.min.apply(Math, this.level.grid.map(function(o) { return o.locx; }))
        let miny = Math.min.apply(Math, this.level.grid.map(function(o) { return o.locy; }))

        console.log("minx: "+minx + " miny: "+miny );


        var canvas = document.getElementById('canvas');
        if(canvas.getContext('2d')){
            var ctx = canvas.getContext('2d');

            for(var room:Room of this.level.grid){

                ctx.fillStyle = '#ededed';//+Math.floor(Math.random()*16777215).toString(16);
                ctx.fillRect((room.locx - minx)*this.size, (room.locy - miny)*this.size, this.size, this.size);

                ctx.fillStyle = '#000000';
                if(room.topWall){
                    ctx.fillRect((room.locx - minx)*this.size, (room.locy - miny)*this.size, this.size, this.wallSize);
                }
                if(room.bottomWall){
                    ctx.fillRect((room.locx - minx)*this.size, ((room.locy - miny)*this.size)+(this.size-this.wallSize), this.size, this.wallSize);
                }
                if(room.leftWall){
                    ctx.fillRect((room.locx - minx)*this.size, (room.locy - miny)*this.size, this.wallSize, this.size);
                }
                if(room.rightWall){
                    ctx.fillRect(((room.locx - minx)*this.size)+(this.size-this.wallSize), (room.locy - miny)*this.size, this.wallSize, this.size);
                }

            }




        }
    }

}
