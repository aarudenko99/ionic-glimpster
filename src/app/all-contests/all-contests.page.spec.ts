import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AllContestsPage } from './all-contests.page';

describe('AllContestsPage', () => {
  let component: AllContestsPage;
  let fixture: ComponentFixture<AllContestsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllContestsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AllContestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
