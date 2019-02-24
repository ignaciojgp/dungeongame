import { Component } from '@angular/core';
import { RoomGeneratorService } from './services/room-generator.service';

enum appStates{
  BEGIN,
  INGAME,
  END
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {


  state: appStates;
}
