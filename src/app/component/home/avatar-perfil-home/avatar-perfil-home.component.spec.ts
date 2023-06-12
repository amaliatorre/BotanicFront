import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvatarPerfilHomeComponent } from './avatar-perfil-home.component';

describe('AvatarPerfilHomeComponent', () => {
  let component: AvatarPerfilHomeComponent;
  let fixture: ComponentFixture<AvatarPerfilHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvatarPerfilHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvatarPerfilHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
