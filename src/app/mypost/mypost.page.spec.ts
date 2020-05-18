import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MypostPage } from './mypost.page';

describe('MypostPage', () => {
  let component: MypostPage;
  let fixture: ComponentFixture<MypostPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypostPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MypostPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
