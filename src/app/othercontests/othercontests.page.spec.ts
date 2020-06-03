import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OthercontestsPage } from './othercontests.page';

describe('OthercontestsPage', () => {
  let component: OthercontestsPage;
  let fixture: ComponentFixture<OthercontestsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OthercontestsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OthercontestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
