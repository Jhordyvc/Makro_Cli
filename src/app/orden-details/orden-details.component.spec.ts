import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdenDetailsComponent } from './orden-details.component';

describe('OrdenDetailsComponent', () => {
  let component: OrdenDetailsComponent;
  let fixture: ComponentFixture<OrdenDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrdenDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdenDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
