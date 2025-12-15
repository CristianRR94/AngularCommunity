import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParticipantesComponent } from './add-participantes.component';

describe('AddParticipantesComponent', () => {
  let component: AddParticipantesComponent;
  let fixture: ComponentFixture<AddParticipantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddParticipantesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddParticipantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
