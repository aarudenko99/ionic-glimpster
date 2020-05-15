import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllcommentPage } from './allcomment.page';

describe('AllcommentPage', () => {
  let component: AllcommentPage;
  let fixture: ComponentFixture<AllcommentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllcommentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllcommentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
