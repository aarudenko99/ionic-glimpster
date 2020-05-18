import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BusinesscardPage } from './businesscard.page';

describe('BusinesscardPage', () => {
  let component: BusinesscardPage;
  let fixture: ComponentFixture<BusinesscardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinesscardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BusinesscardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
