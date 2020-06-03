import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PostvideoPage } from './postvideo.page';

describe('PostvideoPage', () => {
  let component: PostvideoPage;
  let fixture: ComponentFixture<PostvideoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostvideoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PostvideoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
