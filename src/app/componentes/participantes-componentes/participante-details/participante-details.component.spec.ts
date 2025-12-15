import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipanteDetailsComponent } from './participante-details.component';

describe('ParticipanteDetailsComponent', () => {
  let component: ParticipanteDetailsComponent;
  let fixture: ComponentFixture<ParticipanteDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipanteDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipanteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
