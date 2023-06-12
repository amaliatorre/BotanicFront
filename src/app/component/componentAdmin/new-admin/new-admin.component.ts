import { Component, OnInit } from '@angular/core';
import { Avatar } from 'src/app/object/avatar';
import { Color } from 'src/app/object/color';
import { Profile } from 'src/app/object/profile';
import { ProfilesService } from 'src/app/services/profiles.service';
import { RegisterService } from 'src/app/services/register.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/object/user';


@Component({
  selector: 'app-new-admin',
  templateUrl: './new-admin.component.html',
  styleUrls: ['./new-admin.component.css']
})
export class NewAdminComponent implements OnInit {

  public color: Color = new Color('adminColor', '#cf010b', 'color_adm_Base');
  public avatar: Avatar = new Avatar('admin', '../../../../assets/img/avatar/Chilly_Penguin.png', 'pingu_Admin');
  public newAdmin: Profile = new Profile(0,0,'', new Date, 'x', false, 'admin', this.color, this.avatar);
  public listProf: Profile[] = [];

  //objeto recibido del Back
  public dataUser:User = new User('', '', '', '', this.listProf);

  public newUserAdm: User = new User('', '', '', '', this.listProf);

  public profileTable: Profile[] = [];

  showMngExistEmail: boolean = false;
  showMngPasswordSame: boolean = false;
  emailMatch: boolean = false;
  showTablaPerfiles: boolean = false;

  public formularioNewAdmin: FormGroup;
  public formularioUserAdm: FormGroup;

  constructor(private ProfilesService: ProfilesService, private RegisterService: RegisterService) {
    this.formularioNewAdmin = new FormGroup({
      profileNameAdmin: new FormControl('', [Validators.required]),
      birthdayAdmin: new FormControl('', [Validators.required]),
      genderAdmin: new FormControl('', [Validators.required]),
    });

    this.formularioUserAdm = new FormGroup({
      userEmail: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      password2: new FormControl('', [Validators.required]),
      dni: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
    });

  }

  ngOnInit(): void {

    this.getPerfilTable();
  }


  //obtener la información
  getPerfilTable() {
    this.ProfilesService.getDataFromBackend().subscribe(response => {
      if (response.success) {
        this.profileTable = response;
        // Autenticación exitosa
        console.log('Exito al obtener tabla Perfiles');
      } else {
        // Autenticación fallida
       console.log('Error al obtenertabla Perfiles');
      }
    });
}


  createNewAdmin() {
    // Obtener valores del formulario

    //control de email
      this.newUserAdm.Email = this.formularioUserAdm.value.userEmail;
      this.newUserAdm.Password = this.formularioUserAdm.value.password;
      this.newUserAdm.Dni = this.formularioUserAdm.value.dni;
      this.newUserAdm.Surname = this.formularioUserAdm.value.surname;

      //profile
      this.newAdmin.name = this.formularioNewAdmin.get('profileNameAdmin')?.value;
      this.newAdmin.birthday = this.formularioNewAdmin.get('birthdayAdmin')?.value;
      this.newAdmin.gender = this.formularioNewAdmin.get('genderAdmin')?.value;
      //obtendo un objeto ripo usuario-perfil -Objeto User
      this.listProf.push(this.newAdmin);
      this.newUserAdm.RegisterProfile = this.listProf;
//obtener la información

  this.RegisterService.createRegister(this.newUserAdm).subscribe(response => {
    if (response.success) {
      // Autenticación exitosa
      this.profileTable.push(this.newAdmin)
      console.log('Exito al obtener tabla Perfiles');
    } else {
      // Autenticación fallida
     console.log('Error al obtenertabla Perfiles');
    }
  });
}
  checkSamePassword() {
    const password = this.formularioUserAdm.value.password;
    const password2 = this.formularioUserAdm.value.password2;

    let valor = this.emailMatch = password === password2;

    if (valor) {
      this.emailMatch = true;
      this.showMngPasswordSame = false;
    }
    else {
      this.showMngPasswordSame = true;
    }
  }

}
