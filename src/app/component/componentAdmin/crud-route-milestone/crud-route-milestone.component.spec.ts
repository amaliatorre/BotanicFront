import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudRouteMilestoneComponent } from './crud-route-milestone.component';

describe('CrudRouteMilestoneComponent', () => {
  let component: CrudRouteMilestoneComponent;
  let fixture: ComponentFixture<CrudRouteMilestoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrudRouteMilestoneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudRouteMilestoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
