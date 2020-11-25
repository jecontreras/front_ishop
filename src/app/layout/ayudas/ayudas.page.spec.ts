import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AyudasPage } from './ayudas.page';

describe('AyudasPage', () => {
  let component: AyudasPage;
  let fixture: ComponentFixture<AyudasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AyudasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AyudasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
