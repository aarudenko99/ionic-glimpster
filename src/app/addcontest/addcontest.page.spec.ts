import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddcontestPage } from './addcontest.page';

describe('AddcontestPage', () => {
  let component: AddcontestPage;
  let fixture: ComponentFixture<AddcontestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddcontestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddcontestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
