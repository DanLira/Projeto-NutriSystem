import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroNutricionistaComponent } from './cadastro-nutricionista.component';

describe('CadastroNutricionistaComponent', () => {
  let component: CadastroNutricionistaComponent;
  let fixture: ComponentFixture<CadastroNutricionistaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroNutricionistaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroNutricionistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
