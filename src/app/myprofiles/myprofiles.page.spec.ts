import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MyprofilesPage } from './myprofiles.page';

describe('MyprofilesPage', () => {
  let component: MyprofilesPage;
  let fixture: ComponentFixture<MyprofilesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyprofilesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MyprofilesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
