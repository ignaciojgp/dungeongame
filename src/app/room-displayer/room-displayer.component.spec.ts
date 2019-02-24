import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDisplayerComponent } from './room-displayer.component';

describe('RoomDisplayerComponent', () => {
  let component: RoomDisplayerComponent;
  let fixture: ComponentFixture<RoomDisplayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomDisplayerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomDisplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
