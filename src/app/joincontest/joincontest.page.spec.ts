import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JoincontestPage } from './joincontest.page';

describe('JoincontestPage', () => {
  let component: JoincontestPage;
  let fixture: ComponentFixture<JoincontestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoincontestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JoincontestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
