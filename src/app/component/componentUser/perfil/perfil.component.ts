import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Avatar } from 'src/app/object/avatar';
import { Color } from 'src/app/object/color';
import { DataServiceService } from 'src/app/services/data-service.service';
import { Profile } from 'src/app/object/profile';
import { TooltipDirective } from 'ngx-bootstrap/tooltip/tooltip.directive';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  public profile: Profile = new Profile(0, 0, '', new Date(), '', false, '', new Color('', '', ''), new Avatar('', '', ''));
  profileForm: FormGroup;
  nameBefore: string = '';
  colorTable: Color[] = [];
  avatarTable: Avatar[] = [];

  @ViewChild('avatarTooltip', { static: true }) avatarTooltip!: TooltipDirective;

  constructor(private dataService: DataServiceService) {
    this.profileForm = new FormGroup({
      perfilSelect: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      birthday: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      active: new FormControl(),
      avatar: new FormControl('', Validators.required),
      color: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.getTablesAvatarColor();
    this.getUserInfo();

  }

  public perfiles: Profile[] = [];

  getUserInfo() {
    this.perfiles = this.dataService.getPerfiles();
    console.log('1P perfiles Edicion - existentes', this.perfiles);
  }

  patchFormValues(): void {
    if (this.profile) {
      this.profileForm.patchValue({
        name: this.profile.name,
        birthday: this.profile.birthday,
        gender: this.profile.gender,
        active: this.profile.active,
        avatar: this.profile.avatar,
        color: this.profile.color
      });
    }
  }

  color1 = new Color('', '', '');
  avatar1 = new Avatar('', '', '');
  perfilSeleccionado: Profile = new Profile(
    0,
    0,
    '',
    new Date(),
    '',
    false,
    'profile',
    this.color1,
    this.avatar1
  );

  updateProfile(): void {
    if (this.profileForm.valid) {
      this.perfilSeleccionado = this.profileForm.get('perfilSelect')?.value;
      this.profile.name = this.profileForm.controls['name'].value;
      this.profile.birthday = this.profileForm.controls['birthday'].value;
      this.profile.gender = this.profileForm.controls['gender'].value;
      this.profile.active = this.profileForm.controls['active'].value;
      this.profile.avatar = this.profileForm.controls['avatar'].value;
      this.profile.color = this.profileForm.controls['color'].value;

      console.log('%c perfil modificado', 'color:pink', this.profile);
    }
  }

  tableAvatar: Avatar[] = [];
  tableColor: Color[] = [];
  avatarSelecc = new Avatar('', '', '');
  confirmacion: boolean = false;

  getTablesAvatarColor() {
    this.tableColor = this.dataService.getColorTable();

    this.tableAvatar = this.dataService.getAvatarTable();
    this.tableAvatar.forEach(element => {
      console.log( '1H',element.location);
        let location= '../../../..' + element.location;
        element.location = location;

    });
  }
  confirmarSeleccion(avatar: Avatar) {
    this.confirmacion = true;
    this.avatarSelecc = avatar;
  }

  seleccionarAvatar(avatar: Avatar) {
    this.profileForm.controls['avatar'].setValue(avatar);
    this.cancelarSeleccion();
  }

  cancelarSeleccion() {
    this.confirmacion = false;
    this.avatarSelecc = new Avatar('', '', '');
  }

}
