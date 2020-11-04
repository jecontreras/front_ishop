import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CatalogosPage } from './catalogos.page';

describe('CatalogosPage', () => {
  let component: CatalogosPage;
  let fixture: ComponentFixture<CatalogosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CatalogosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
