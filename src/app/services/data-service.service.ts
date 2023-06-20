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
  public rol: string = '';

  public loginVerificacion: boolean = false;

  //que escuche modificaciones de la tabla milestoneUser


  constructor(private RouteMilestoneUserService: RouteMilestoneUserService) {

  }

  //Recibir objetos de Usuario Logeado exitosamente
  recibirUser(response: any) {
    this.usuInfo = response;

    //this.obtenerEmail(this.usuInfo.email);
    this.usuInfo.perfiles.forEach(element => {
      //this.obtenerIdUser(element.userId);
    });

  }

  obtenerEmail(response: string) {
    this.email = response;
  }

  obtenerIdUser(response: number) {
    this.idUser = response;
  }


  guardarLoginResponse(response: any) {

    let usuInfo = new UsuInfo(
      response.registerResponse.email,
      response.registerResponse.registerUser
    );
    this.recibirUser(usuInfo);
    this.email = response.registerResponse.email;
    this.perfiles = response.registerResponse.registerUser;
    console.log('%c perfilES:', 'color: blue', this.perfiles);

    this.email = this.usuInfo.email;
    console.log('%c EMAIL:', 'color: blue', this.email);

    this.obtenerRouteMilestone();
    console.log('%c this.RouteMilestoenUser guardarLoginResponse:', 'color: blue', this.RouteMilestoenUser);
  }

  obtenerRouteMilestone() {
    this.getIdUser();
    console.log(this.getIdUser());
    this.RouteMilestoneUserService.getDataFromBackendRouteMilestone(this.idUser)
      .subscribe((data: RouteMilestone[]) => {
        this.RouteMilestoenUser = data;
        console.log('%c 2. this.RouteMilestoenUser DATA:', 'color: blue', this.RouteMilestoenUser);
      });
    return this.RouteMilestoenUser;
  }

  checkCompleteMilestoneUpdate(milestone: Milestone) {
    try {
      // Recorre el array routeMilestoneTable
      for (const route of this.RouteMilestoenUser) {
        // Busca el hito que coincida con el nombre
        const index = route.milestone.findIndex((m: Milestone) => m.name === milestone.name);

        if (index !== -1) {
          // Reemplaza el hito encontrado con uno nuevo
          route.milestone[index] = milestone;
        }
      }
    }
    catch {
      console.log('error al actualizar la tabla Data de completeMilestone', 'color:red',);
    }
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
  }


  getRol() {
    let hayAdmin: boolean = false;
    this.usuInfo.perfiles.forEach(element => {
      let elemento = element.rol;
      console.log('1AA ROL', elemento)
      if (elemento === 'admin') {
        console.log('1C ENTRE EN TRUE ==')
        hayAdmin = true;
      }
      else {
        console.log('1D ENTRE EN FALSE ==')
      }
    });
    return hayAdmin;
  }
  getEmail() {
    console.log('DataServ email ', this.email);
    return this.email;

  }
  getPerfiles() {
    console.log('DataServ perfiles ', this.perfiles);
    return this.perfiles;
  }

  getMilestone() {
    return this.RouteMilestoenUser;
  }

  //----------------------------------------------------------------------------------------------
  /*LISTA TABLA HARCODEADO CAMBIAR - IMPLEMENTAR */

  tableColor: Color[] = [
    new Color("Rose Quartz", "#fc5484", "Delicate and feminine"),
    new Color("Cherry Blossom", "#fda9b6", "Soft and delicate as a flower"),
    new Color("Deep Sea", "#265762", "Mysterious and calm"),
    new Color("Blue Gray", "#8fa9b7", "Serene and soothing"),
    new Color("Olive Green", "#719618", "Natural and rustic"),
    new Color("Teal", "#6b937f", "Balanced and versatile")
  ];

  getColorTable() {
    return this.tableColor;
  }

  tableAvatar: Avatar[] = [
    new Avatar('A_Ducky_Duck','/assets/img/avatar/A_Ducky_Duck.png','An adorable yellow duck'),
    new Avatar('Chilly_Penguin','/assets/img/avatar/Chilly_Penguin.png','A cute penguin with a scarf'),
    new Avatar('Cute_Walrus','/assets/img/avatar/Cute_Walrus.png','A charming walrus'),
    new Avatar('Happy_Cactus','/assets/img/avatar/Happy_Cactus.png','A smiling cactus'),
    new Avatar('Miss_Carnation','/assets/img/avatar/Miss_Carnation.png','A lovely pink carnation'),
    new Avatar('Miss_Rose','/assets/img/avatar/Miss_Rose.png','A beautiful rose'),
    new Avatar('Mister_Whitebell','/assets/img/avatar/Mister_Whitebell.png','A handsome white bell'),
    new Avatar('Mister_Zebra','/assets/img/avatar/Mister_Zebra.png','A cool zebra'),
    new Avatar('Red_Raccoon','/assets/img/avatar/Red_Raccoon.png','A red raccoon'),
    new Avatar('Smart_Feline','/assets/img/avatar/Smart_Feline.png','A smart feline'),
    new Avatar('Spotter_Elephant','/assets/img/avatar/Spotter_Elephant.png','An elephant with spots'),
    new Avatar('Spray_Gun_Women','/assets/img/avatar/Spray_Gun_Women.png','A woman with a spray gun'),
    new Avatar('The_Fern_Boy','/assets/img/avatar/The_Fern_Boy.png','A boy with a fern hat')
  ];

  getAvatarTable() {
    return this.tableAvatar;
  }
}
