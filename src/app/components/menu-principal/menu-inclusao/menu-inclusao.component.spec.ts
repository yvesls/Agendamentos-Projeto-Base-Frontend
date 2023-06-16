import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuInclusaoComponent } from './menu-inclusao.component';

describe('MenuInclusaoComponent', () => {
  let component: MenuInclusaoComponent;
  let fixture: ComponentFixture<MenuInclusaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuInclusaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuInclusaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
