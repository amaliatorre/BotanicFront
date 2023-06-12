import { Injectable } from '@angular/core';
import { UsuInfo } from '../object/usuInfo';
import { RouteMilestone } from '../object/routeMilestones';
import { LoginResponse } from '../object/LoginResponse';
import { Subject, Observable } from 'rxjs';
import { Profile } from '../object/profile';
import { RouteMilestoneUserService } from './route-milestone-user.service';

import { Milestone } from '../object/milestones';
@Injectable({
  providedIn: 'root'
})export class DataServiceService {

  public usuInfo: UsuInfo= new UsuInfo('',[]); // Variable para almacenar los datos

  public RouteMilestoenUser: RouteMilestone[] = [];

  //public id, userId, name, birthday, gender, active, rol, color, avatar
  public perfiles: Profile[] = [];

  public routeName:string='';
  public email:string = '';
  public idUser:number = 0;

  public loginVerificacion: boolean = false;

  constructor(private RouteMilestoneUserService:RouteMilestoneUserService) { }

  recibirDatosLogin(response: any) {
    console.log('Recibido el response:', response);
    this.obtenerLoginResponse(response);

  }

  obtenerLoginResponse(response: any) {
    let loginResponse: LoginResponse | undefined;

    this.obtenerUsuInfo(response);
    this.obtenerRouteMilestone();
    this.verificacionLogin(true);



    this.email = response.registerResponse.email;
    this.perfiles = response.registerResponse.registerUser;
    console.log('%c perfilES:', 'color: blue', this.perfiles);

    this.email = this.usuInfo.email;
    console.log('%c EMAIL:', 'color: blue', this.email);

    console.log(this.email);
    console.log(this.perfiles);
    console.log(this.RouteMilestoenUser);


    if (typeof response === 'object') {}


    else {
      this.verificacionLogin(false);
    }
    return loginResponse;
  }

  obtenerUsuInfo(response: any) {
    this.usuInfo = response.registerResponse;
    console.log('%c usuinfo:', 'color: blue', this.usuInfo);
  }

  obtenerRouteMilestone () {
    this.getIdUser();
    this.RouteMilestoneUserService.getDataFromBackendRouteMilestone(this.idUser)
    .subscribe((data: RouteMilestone[]) => {
      this.RouteMilestoenUser = data;
    });
  }

  verificacionLogin(controlLogin: boolean){

    if(controlLogin){
    this.loginVerificacion = true;
  }
  else {
    this.loginVerificacion = false;
  }
    return this.loginVerificacion;

  }

//metodos para comprobar de nuevo al crear un cambio en otro componente

private loginVerifSubject: Subject<boolean> = new Subject<boolean>();
public loginVerif$: Observable<boolean> = this.loginVerifSubject.asObservable();

public getverificacionLogin(): Observable<boolean> {
  return this.loginVerif$;
}

public updateVerificacionLogin(value: boolean): void {
  this.loginVerifSubject.next(value);
}

  //metodos para OBTENER en componentes

  getUsuInfo() {
    return this.usuInfo;
  }

  getIdUser() {
    return this.idUser = 2;
  }

  getEmail() {
    return this.email;
  }
  getPerfiles() {
    return this.perfiles;
  }

  getRouteMilestonesUser() {
    return this.RouteMilestoenUser;
  }
}
