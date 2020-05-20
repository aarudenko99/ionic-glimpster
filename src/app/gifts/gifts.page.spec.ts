import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GiftsPage } from './gifts.page';

describe('GiftsPage', () => {
  let component: GiftsPage;
  let fixture: ComponentFixture<GiftsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiftsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GiftsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
