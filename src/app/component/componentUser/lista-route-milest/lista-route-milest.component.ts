import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  @Output() milestoneOutput: EventEmitter<Milestone> = new EventEmitter<Milestone>();

  public listImg: string[] = [];
  public urlImg:string = '../../../../assets/img/rutas/';


  public dataToUpdateMilestoneCompleted: Milestone = new Milestone();
  public milestoneToUpdate: Milestone = new Milestone();
  public selectedRoute: string = '';
  public showMilestonesList: boolean = false;
  public ShowClue: boolean = false;

  constructor(private dataService: DataServiceService, private routeMilestoneService: RouteMilestoneUserService) { }


  ngOnInit(): void {
    //obtener la tabla de ruta y milestones
    this.getRouteMilestone();
    this.listaImg();

  }

getRouteMilestone() {
  this.routeMilestoneTable = this.dataService.getMilestone();

}

showMilestones(route: string) {
  this.selectedRoute = route;
  this.showMilestonesList = true;
}

//viisualizar hito
goToClue(milestone: Milestone) {
  console.log('%c entro en go to clue:', 'color:pink', milestone);
  this.milestoneOutput.emit(milestone);
  this.ShowClue = true;
}

listaImg() {
  this.listImg.push(this.urlImg + 'edificaciones.jpg');
  this.listImg.push(this.urlImg + 'naturaleza.jpg');
  this.listImg.push(this.urlImg + 'lugaresEncanto.jpg');
}

cerrarHitos() {
  this.showMilestonesList = !this.showMilestonesList
  //control sobre el anidamiento de componetes
  if (this.showMilestonesList) {
    this.ShowClue = true;
  }
  else {
    this.ShowClue = false;
  }
}

onCloseClue(milestone: Milestone) {
  console.log('Hito seleccionado:', milestone);
  // Recorre el array routeMilestoneTable
  // Recorre el array routeMilestoneTable
  for (const route of this.routeMilestoneTable) {
    // Busca el hito que coincida con el nombre
    const index = route.milestone.findIndex((m: Milestone) => m.name === milestone.name);

    if (index !== -1) {
      // Reemplaza el hito encontrado con uno nuevo
      route.milestone[index] = milestone;
    }
  }

  // Restablece el estado del componente
  this.ShowClue = false;
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
