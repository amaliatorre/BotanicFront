import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Profile } from 'src/app/object/profile';
import { RegisterService } from 'src/app/services/register.service';
import { NavigationExtras, Router } from '@angular/router';
import { Color } from 'src/app/object/color';
import { Avatar } from 'src/app/object/avatar';
import { User } from 'src/app/object/user';
import { UsuInfo } from 'src/app/object/usuInfo';




@Component({
  selector: 'app-form-register',
  templateUrl: './form-register.component.html',
  styleUrls: ['./form-register.component.css']
})
export class FormRegisterComponent {
  formularioProfile: FormGroup;
  formularioUser: FormGroup;

  errorMngErrorRegister = false;
  submitted: boolean = false;
  age: number = 0;
  emailMatch: boolean = false;
  showMngPasswordSame: boolean = false;
  showMngAge:boolean = false;
  checkAge: boolean = false;
  registroSuccess: boolean = false;
  showEmailExist: boolean = false;

  public pasw1:string = '';
  public pasw2:string = '';

  public colorRegister: Color = new Color('', '', '');
  public avatarRegister: Avatar = new Avatar('', '', '');

  constructor(private registerService: RegisterService, private router: Router) {

    this.formularioProfile = new FormGroup({
      profileName: new FormControl('', [Validators.required]),
      birthday: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
    });
    this.formularioUser = new FormGroup({
      userEmail: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      password2: new FormControl('', [Validators.required]),
      dni: new FormControl('', [Validators.required]),
      surname: new FormControl('', [Validators.required]),
    });
    this.submitted = false;
  }

  ngOnInit() {

  }

  submit() {
    this.submitted = true;

    if (this.formularioProfile.valid && this.formularioUser.valid && this.emailMatch) {
      //user
      let emialInsert: string = this.formularioUser.value.userEmail;
      console.log(emialInsert);
      this.registerService.setRegistroSuccess(true);

    //control de email

      const profileName = this.formularioProfile.value.profileName;
      const birthday = new Date(this.formularioProfile.value.birthday);
      console.log(birthday);
      const gender = this.formularioProfile.value.gender;
      console.log(gender);
      const active = true;
      const character = 'user';

      const profileNew = new Profile(0,0,profileName, birthday, gender, active, character, this.colorRegister, this.avatarRegister);

      const listProfile: Profile[] = [];
      console.log(listProfile);
      listProfile.push(profileNew);
      console.log(listProfile);
      const email = emialInsert;
      const password = this.formularioUser.value.password;
      const dni = this.formularioUser.value.dni;
      const surname = this.formularioUser.value.surname;

      let user: User = new User(surname, email, password, dni,listProfile )
      console.log(user, 'user');
      this.registerService.createRegister(user).subscribe(response => {
        if (response.success) {
          // Autenticación exitosa
          //abrir el componente login
          this.registroSuccess = true;
          this.registerService.setRegistroSuccess(this.registroSuccess);
          ;
          console.log('%c insertardo?? tegristro succes true en service?', 'color:blue',this.registerService.getRegistroSuccess() )




        } else {
          // Autenticación fallida
          console.log('Existe un problema al insertar en nuevo administrador ');
        }
      });
    }
    else {
      console.log('El email ya existe:');
      this. showEmailExist =  true;

    }
  }



//Control

  calcularEdad() {
    const fechaNacimiento = new Date(this.formularioProfile.value.birthday);
    const fechaActual = new Date();
    let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    const mesActual = fechaActual.getMonth() + 1;
    const mesNacimiento = fechaNacimiento.getMonth() + 1;

    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && fechaActual.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }

    this.age = edad;
    this.showMngAge = this.age < 18;
    if(!this.showMngAge) {
      this.checkAge = true;
    }
  }


  checkSamePassword() {
    const password = this.formularioUser.value.password;
    const password2 = this.formularioUser.value.password2;

    if (password === password2) {
      this.showMngPasswordSame = false;
      this. emailMatch = true;
    } else {
      this.showMngPasswordSame = true;
    }
  }

}
