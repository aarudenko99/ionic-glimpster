import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectfriendsPage } from './selectfriends.page';

describe('SelectfriendsPage', () => {
  let component: SelectfriendsPage;
  let fixture: ComponentFixture<SelectfriendsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectfriendsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectfriendsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
