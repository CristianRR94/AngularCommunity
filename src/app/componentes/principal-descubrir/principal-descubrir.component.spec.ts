import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrincipalDescubrirComponent } from './principal-descubrir.component';

describe('PrincipalDescubrirComponent', () => {
  let component: PrincipalDescubrirComponent;
  let fixture: ComponentFixture<PrincipalDescubrirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrincipalDescubrirComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrincipalDescubrirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
