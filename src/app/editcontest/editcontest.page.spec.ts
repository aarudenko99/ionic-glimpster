import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditcontestPage } from './editcontest.page';

describe('EditcontestPage', () => {
  let component: EditcontestPage;
  let fixture: ComponentFixture<EditcontestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditcontestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditcontestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
