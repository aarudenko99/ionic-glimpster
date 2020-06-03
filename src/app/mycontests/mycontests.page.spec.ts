import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MycontestsPage } from './mycontests.page';

describe('MycontestsPage', () => {
  let component: MycontestsPage;
  let fixture: ComponentFixture<MycontestsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MycontestsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MycontestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
