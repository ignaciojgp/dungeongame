import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomDisplayerComponent } from './room-displayer/room-displayer.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'room', component: RoomDisplayerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
