import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContestsPage } from './contests.page';

describe('ContestsPage', () => {
  let component: ContestsPage;
  let fixture: ComponentFixture<ContestsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContestsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContestsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
