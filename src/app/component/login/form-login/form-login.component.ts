import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { NavigationExtras, Router } from '@angular/router';
import { UserCheck } from 'src/app/object/UserCheck';
import { HomeComponent } from '../../home/home/home.component';
import { UsuInfo } from 'src/app/object/usuInfo';
import { RouteMilestone } from 'src/app/object/routeMilestones';
import { DataServiceService } from 'src/app/services/data-service.service';
import { catchError } from 'rxjs';
import { Observer } from 'rxjs';


@Component({
  selector: 'app-form-login',
  templateUrl: './form-login.component.html',
  styleUrls: ['./form-login.component.css']
})
export class FormLoginComponent {

  formularioLogin: FormGroup;
  submitted: boolean = false;
  errorMngErrorLogin: boolean = false;
  public controlLogin: boolean = false;

  constructor(private loginService: LoginService, private router: Router, private DataServiceService: DataServiceService) {
    this.formularioLogin = new FormGroup({
      userEmail: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  submit() {
    this.errorMngErrorLogin = false;
    this.submitted = true;

      if (this.formularioLogin.valid) {
        let email: string = this.formularioLogin.value.userEmail;
        let password: string = this.formularioLogin.value.password;

        let userCkech: UserCheck = new UserCheck(email, password);
        this.loginService.createCheckLogin(userCkech).subscribe({
          next: (response) => {
            if (response != null) {
              console.log('%c response en el componenteform login!! ', 'color:blue', response);
              // Autenticación exitosa
              this.DataServiceService.verificacionLogin(this.controlLogin);
              this.notifyLoginVerifChange(true);
            } else {
              this.notifyLoginVerifChange(false);
            }
          },
          error: (error) => {
            this.notifyLoginVerifChange(false);
          }
        });
      }
    }

  //notificacion cuando exista cambios en el componente
    notifyLoginVerifChange(value: boolean): void {
    this.DataServiceService.updateVerificacionLogin(value);
    this.errorMngErrorLogin = !value;
  }
}
