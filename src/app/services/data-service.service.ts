import { Injectable } from '@angular/core';
import { UsuInfo } from '../object/usuInfo';
import { RouteMilestone } from '../object/routeMilestones';
import { LoginResponse } from '../object/LoginResponse';
import { Subject, Observable } from 'rxjs';
import { Profile } from '../object/profile';
import { RouteMilestoneUserService } from './route-milestone-user.service';

import { Milestone } from '../object/milestones';
import { Avatar } from '../object/avatar';
import { Color } from '../object/color';
@Injectable({
  providedIn: 'root'
}) export class DataServiceService {

  public usuInfo: UsuInfo = new UsuInfo('', []); // Variable para almacenar los datos
  public RouteMilestoenUser: RouteMilestone[] = [];

  //public id, userId, name, birthday, gender, active, rol, color, avatar
  public perfiles: Profile[] = [];
  public avatar: Avatar = new Avatar('', '', '');
  public color: Color = new Color('', '', '');
  public routeName: string = '';
  public email: string = '';
  public idUser: number = 0;

  public loginVerificacion: boolean = false;

  constructor(private RouteMilestoneUserService: RouteMilestoneUserService) { }

  //Recibir objetos de Usuario Logeado exitosamente
  recibirUser(response: any) {
    console.log('recibirUser:', response);
    this.usuInfo = response;

    //this.obtenerEmail(this.usuInfo.email);
    this.usuInfo.perfiles.forEach(element => {
      //this.obtenerIdUser(element.userId);
      console.log('perfiles:', response);
    });

  }

  obtenerEmail(response: string) {
    this.email = response;
  }

  obtenerIdUser(response: number) {
    this.idUser = response;
  }

  obtenerAvatar(response: Avatar) {

  }





  recibirRecorrido(response: any) {
    console.log('recibirRecorrido:', response);
    this.RouteMilestoenUser = response;
  }






  guardarLoginResponse(response: any) {

    let usuInfo = new UsuInfo(
      response.registerResponse.email,
      response.registerResponse.registerUser
    );
    this.recibirUser(usuInfo);
    this.obtenerRouteMilestone();

    this.email = response.registerResponse.email;
    this.perfiles = response.registerResponse.registerUser;
    console.log('%c perfilES:', 'color: blue', this.perfiles);

    this.email = this.usuInfo.email;
    console.log('%c EMAIL:', 'color: blue', this.email);
  }

  obtenerRouteMilestone() {
    this.getIdUser();
    console.log(this.getIdUser());
    this.RouteMilestoneUserService.getDataFromBackendRouteMilestone(this.idUser)
      .subscribe((data: RouteMilestone[]) => {
        this.RouteMilestoenUser = data;
      });
  }

  verificacionLogin(controlLogin: boolean) {
    console.log('DAta Service verif controlLogin', controlLogin);
    if (controlLogin) {
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
    console.log('DataServ usuInfo', this.usuInfo);
    return this.usuInfo;

  }

  getIdUser() {
    this.usuInfo.perfiles.forEach(element => {
      return this.idUser = element.userId;
    });
    console.log('DataServ idUser ', this.idUser);
  }

  getEmail() {
    console.log('DataServ email ', this.email);
    return this.email;

  }
  getPerfiles() {
    console.log('DataServ perfiles ', this.perfiles);
    return this.perfiles;
  }

  getRouteMilestonesUser() {
    console.log('DataServ proute milestone ', this.RouteMilestoenUser);
    return this.RouteMilestoenUser;
  }

  getMilestone() {

  }
}
