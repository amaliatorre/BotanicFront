import { Component, OnInit } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { TableRoute } from 'src/app/object/tableRoute';
import { RouteMilestoneUserService } from 'src/app/services/route-milestone-user.service';
import { RouteMilestone } from 'src/app/object/routeMilestones';
import { User } from 'src/app/object/user';
import { UsuInfo } from 'src/app/object/usuInfo';
import { DataServiceService } from 'src/app/services/data-service.service';


@Component({
  selector: 'app-adm',
  templateUrl: './adm.component.html',
  styleUrls: ['./adm.component.css']
})
export class AdmComponent implements OnInit {

  public routeMilestoneTable: RouteMilestone[] = [];


  public expression: boolean = false;
  public showTables: boolean = false;

  public newAdminContent: string = '';
  public estadisticsContent: string = '';
  public routeMilestoneContent: string = '';
  public userInfo: UsuInfo = new UsuInfo('', []);
  constructor(private DataService: DataServiceService) { }


  ngOnInit(): void {
    this.tablaRouteMilestone();

  }

  //obtener la tabla de ruta relacionada con milestone
  tablaRouteMilestone() {
    let response = this.DataService.obtenerRouteMilestone();
    console.log('%c aRESPONSEXXX', 'color:green', response);
    if ( response != null) {
      this.routeMilestoneTable = response;
      console.log('%c app-component rutahitoXXX', 'color:green', this.routeMilestoneTable);
    }
    else {
      // Autenticación fallida
      console.log('Existe un problema obtener la tabla completa de usuario de relacion ruta hito ');
    }
  }

  //obtener el html de los otros componentes para pdf
  /*getComponentContent(componentName: string): void {
    if (componentName === 'newAdmin') {
      // Obtener el contenido de NewAdmin
      //this.newAdminContent = '<app-new-admin></app-new-admin>';
    } else if (componentName === 'estadistics') {
      // Obtener el contenido de Estadistics
      this.estadisticsContent = '<app-estadistics></app-estadistics>';
    }
  }*/
}


