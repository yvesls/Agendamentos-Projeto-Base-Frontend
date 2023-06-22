import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarMedicoComponent } from './criar-medico.component';

describe('CriarMedicoComponent', () => {
  let component: CriarMedicoComponent;
  let fixture: ComponentFixture<CriarMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CriarMedicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriarMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
