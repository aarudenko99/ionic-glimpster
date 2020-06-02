import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PosttextPage } from './posttext.page';

describe('PosttextPage', () => {
  let component: PosttextPage;
  let fixture: ComponentFixture<PosttextPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosttextPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PosttextPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
