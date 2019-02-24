import { Component, OnInit } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  constructor(public sessionService:SessionService, private router: Router) { }

  ngOnInit() {

    

  }

  public startGame(){
    this.sessionService.startNewGame();
    this.router.navigateByUrl("room");
  }

}
