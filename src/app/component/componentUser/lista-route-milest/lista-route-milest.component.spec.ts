import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaRouteMilestComponent } from './lista-route-milest.component';

describe('ListaRouteMilestComponent', () => {
  let component: ListaRouteMilestComponent;
  let fixture: ComponentFixture<ListaRouteMilestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaRouteMilestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaRouteMilestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
