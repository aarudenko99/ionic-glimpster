import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailcontestPage } from './detailcontest.page';

describe('DetailcontestPage', () => {
  let component: DetailcontestPage;
  let fixture: ComponentFixture<DetailcontestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailcontestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailcontestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
