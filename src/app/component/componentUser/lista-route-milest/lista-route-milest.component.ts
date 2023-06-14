import { Component, OnInit } from '@angular/core';
import { RouteMilestone } from 'src/app/object/routeMilestones';
import { RouteMilestoneUserService } from 'src/app/services/route-milestone-user.service';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Milestone } from 'src/app/object/milestones';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuInfo } from 'src/app/object/usuInfo';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-lista-route-milest',
  templateUrl: './lista-route-milest.component.html',
  styleUrls: ['./lista-route-milest.component.css']
})
export class ListaRouteMilestComponent implements OnInit {

  public routeMilestoneTable: RouteMilestone[] = [];
  public dataToUpdateMilestoneCompleted: Milestone = new Milestone();
  public milestoneToUpdate:Milestone =  new Milestone();
  public selectedRoute: string = '';
  public userInfo:UsuInfo = new UsuInfo('', []);
  showMilestonesList: boolean = false;
  ShowClue: boolean = false;

  constructor(private routeMilestoneService: RouteMilestoneUserService, private dataService: DataServiceService) {

  }
  ngOnInit(): void {
    //obtener la tabla de ruta y milestones
    this.getRouteMilestone();
  }


  getRouteMilestone() {
    this.dataService.obtenerRouteMilestone ();
    this.routeMilestoneTable = this.dataService.getRouteMilestonesUser();

    console.log('llega:', this.routeMilestoneTable );
}

  showMilestones(route: string) {
    this.selectedRoute = route;
    this.showMilestonesList = true;
  }

  //viisualizar hito
  goToClue(milestone: Milestone) {
    console.log('%c entro en go to clue:','color:pink', milestone);
    this.ShowClue = true;

    //mandar al componente

  }

  //busqueda y actualizacion de array
  bussinesUpgradeMilestone() {

    for (const routeList of this.routeMilestoneTable) {
      var milestoneToUpdate = routeList.milestone.find((milestone: Milestone) => milestone.name === this.dataToUpdateMilestoneCompleted.name);

      if (milestoneToUpdate) {
        //milestoneToUpdate.milestone_completed = this.dataToUpdateMilestoneCompleted.milestone_completed;
      }

      // Mandar a la funcion de la actualización de datos
      this.actualizarDatos(this.milestoneToUpdate);
    }
  }
  //mandar al back la actualizacion de datos
  actualizarDatos(milestone: Milestone) {
    this.routeMilestoneService.updateCompleteMilestone(this.milestoneToUpdate)
      .pipe(
        tap(response => {
          console.log('Actualización exitosa:', response);
          // Realiza acciones adicionales si es necesario
        }),
        catchError(error => {
          console.error('Error en la actualización:', error);
          // Maneja el error si ocurre alguno durante la solicitud HTTP
          throw error; // O maneja el error de otra manera
        })
      )
      .subscribe();
  }
}
