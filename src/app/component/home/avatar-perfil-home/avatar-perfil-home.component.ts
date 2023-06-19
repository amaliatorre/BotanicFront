import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Profile } from 'src/app/object/profile';
import { ProfilesService } from 'src/app/services/profiles.service';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Color } from 'src/app/object/color';
import { Avatar } from 'src/app/object/avatar';
import { UsuInfo } from 'src/app/object/usuInfo';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-avatar-perfil-home',
  templateUrl: './avatar-perfil-home.component.html',
  styleUrls: ['./avatar-perfil-home.component.css']
})
export class AvatarPerfilHomeComponent implements OnInit {

  public profilesTable: Profile[] = [];
  public profileUpgrade: Profile = new Profile(0,0,'', new Date(), '', false, '', new Color('', '', ''), new Avatar('', '', ''))
  public userInfo: UsuInfo = new UsuInfo ('', []);
  public perfiles: Profile[] = [];
  public color: string ='';
  public localizacion: string = '';
  public nombre: string = '';

  constructor(private profilesService: ProfilesService, private router: Router, private DataServiceService:DataServiceService) { }

  ngOnInit(): void {
    this.userInfo = this.DataServiceService.getUsuInfo();
    this.perfiles = this.DataServiceService.getPerfiles();
    this.obtenerAvatar();
  }

  obtenerAvatar(){
    this.perfiles.forEach(element => {
      console.log('%c elemento: ', 'color:blue', element);
      if(element.rol == 'user' || element.rol == 'admin') {
        this.color = element.color.code;
        let url: string = '../../../..' + element.avatar.location;
        this.localizacion = url;
        this.nombre = element.name;
        console.log('%c color: ', 'color:blue', this.color);
        console.log('%c localizacion: ', 'color:blue', this.localizacion);
      }


    });
  }


  }


