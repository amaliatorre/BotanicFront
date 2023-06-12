import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutePorcentagComponent } from './route-porcentag.component';

describe('RoutePorcentagComponent', () => {
  let component: RoutePorcentagComponent;
  let fixture: ComponentFixture<RoutePorcentagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutePorcentagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutePorcentagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
