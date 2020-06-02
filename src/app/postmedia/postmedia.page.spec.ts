import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PostmediaPage } from './postmedia.page';

describe('PostmediaPage', () => {
  let component: PostmediaPage;
  let fixture: ComponentFixture<PostmediaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostmediaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PostmediaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
