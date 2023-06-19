import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TableMilestone } from 'src/app/object/tableMilestone';
import { TableRoute } from 'src/app/object/tableRoute';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Observable, forkJoin, from, throwError } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// Remove this line from your component
import { HttpClient } from '@angular/common/http';
import { RouteMilestoneUserService } from 'src/app/services/route-milestone-user.service';
import { UsuInfo } from 'src/app/object/usuInfo';
import { DataServiceService } from 'src/app/services/data-service.service';
import { Milestone } from 'src/app/object/milestones';
import { RouteMilestone } from 'src/app/object/routeMilestones';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-crud-route-milestone',
  templateUrl: './crud-route-milestone.component.html',
  styleUrls: ['./crud-route-milestone.component.css']
})
export class CrudRouteMilestoneComponent implements OnInit {

  //CONFIGURAR FORM CONSTRUCTOR
  //INICIALIZAR FORM EDITAR MILESTONE CON PLACEHOLDER -VALUE
  //SERVICE DE ENVIAR DATOS UPGRADE BACK

  /*Declaracion de Formularios */
  formularioMilestoneC: FormGroup;
  formularioRouteC: FormGroup;

  formularioRouteEdit: FormGroup;
  formularioMilestoneEdit: FormGroup;

  formularioRouteDelete: FormGroup;
  formularioMilestoneDelete: FormGroup;

  constructor(
    private http: HttpClient,
    private RouteMilestoneUserService: RouteMilestoneUserService,
    private DataService: DataServiceService,
    private cdr: ChangeDetectorRef) {
    //formulario creacion
    this.formularioRouteC = new FormGroup({
      ReferenceRoute: new FormControl('', [Validators.required]),
      nameR: new FormControl('', [Validators.required]),
    });
    this.formularioMilestoneC = new FormGroup({
      ReferenceRoute: new FormControl('', [Validators.required]),
      milestoneName: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      info: new FormControl('', [Validators.required]),
    });
    //formulario edicion
    this.formularioRouteEdit = new FormGroup({
      editIdRoute: new FormControl('', [Validators.required]),
      editNameR: new FormControl('', [Validators.required]),
    });
    this.formularioMilestoneEdit = new FormGroup({
      ReferenceEditM: new FormControl('', [Validators.required]),
      nameEditM: new FormControl('', [Validators.required]),
      descriptionEditM: new FormControl('', [Validators.required]),
      infoEditM: new FormControl('', [Validators.required]),
    });

    this.formularioRouteDelete = new FormGroup({
      ReferenceRouteD: new FormControl('', [Validators.required]),
    });
    this.formularioMilestoneDelete = new FormGroup({
      ReferenceMilestoneDelete: new FormControl('', [Validators.required]),
    });
  }


  //DECLARACION

  public routeTable: TableRoute[] = [];
  public milestoneTable: RouteMilestone[] = [];
  public milestoneFull:Milestone[] = [];

  public idUser:number = 0;
  public userInfo: UsuInfo = new UsuInfo('', []);

  ngOnInit(): void {
    //obtener la tabla de ruta
    this.getUserInfo();
    this.getMilestoneTable();

  }
  getMilestoneTable() {
    this.RouteMilestoneUserService.getDataFromBackendRouteMilestone(this.idUser)
      .subscribe((milestones: RouteMilestone[]) => {
        this.milestoneTable = milestones;
        this.milestoneTable.forEach(element => {
          element.milestone.forEach(item=> {
            this.milestoneFull.push(item);

          });
        });
        this.cdr.detectChanges(); // Forzar actualización de la vista
      });
  }


  getUserInfo() {
    this.userInfo = this.DataService.getUsuInfo();

    console.log('%c Exito al obtener usuInfo', 'color:green', this.userInfo);


    this.userInfo.perfiles.forEach(element => {
      this.idUser = element.userId;
    });

    this.getTablaRoute(this.userInfo);
    this.getMilestoneTable();
  }

  //obtener la tabla de ruta
  getTablaRoute(userInfo: UsuInfo) {
    this.RouteMilestoneUserService.getDataFromBackend(userInfo).subscribe(response => {
      if (response != null) {
        // Autenticación exitosa
        this.routeTable = response;
        console.log('%c Exito al obtener tabla ruta', 'green', this.routeTable);
      } else {
        // Autenticación fallida
        console.log('%c Error al obtener tabla ruta', 'pink');
      }
    });

  }

  //obtener la tabla de milestone


  /*-------------------------------------------------------------------------------- */

  /*Crear*/
  public newRoute: TableRoute = new TableRoute(0, '');


  /*RUTA*/
  //Añadir rutas e hitos
  addRoute() {
    // Obtener valores del formulario
    this.newRoute.id = 0;
    this.newRoute.name = this.formularioRouteC.get('nameR')?.value;
    this.RouteMilestoneUserService.createRoute(this.newRoute).subscribe(response => {
      if (response != null) {
        // Autenticación exitosa
        this.getTablaRoute(this.userInfo); // Llamar a getMilestoneTable() después de la creación exitosa de la ruta
      } else {
        // Autenticación fallida
        console.log('La ruta NO se añadió correctamente');
      }
    });
  }

  public newMilestone: Milestone = new Milestone();

/*MILESTONE */
  addMilestone() {

    this.newMilestone.id = 0;
    this.newMilestone.routeId = this.formularioMilestoneC.get('ReferenceRoute')?.value;
    this.newMilestone.name = this.formularioMilestoneC.get('milestoneName')?.value;
    this.newMilestone.description = this.formularioMilestoneC.get('description')?.value;
    this.newMilestone.info = this.formularioMilestoneC.get('info')?.value;
    console.log('%c 1A crear hito check table: ', 'color: pink', this.newMilestone);

    this.RouteMilestoneUserService.createMilestone(this.newMilestone).subscribe(response => {
      if (response != null) {
        // Autenticación exitosa
        console.log('%c 2A crear hito check table: ', 'color: pink',response);
        this.getMilestoneTable();
      } else {
        // Autenticación fallida
        console.log('El hito NO se añadio correctamente');
      }
    });
  }

  /**Modificado Seleccionado */
  public seleccionadoEditR: TableRoute = new TableRoute(0, '');
  public newRuta: TableRoute = new TableRoute(0, '');

  public seleccionadoEditM: TableMilestone = new TableMilestone();
  public editMilestoneNameEdit: string = '0';
  public ViewHitoSelectEdit: Milestone[] = [];

  //Editar rutas e hitos

  /*RUTA*/
  editRoute() {
    this.seleccionadoEditR = this.formularioRouteEdit.get('editIdRoute')?.value;
    this.newRuta.id = this.seleccionadoEditR.id;
    this.newRuta.name =this.formularioRouteEdit.get('editNameR')?.value;
    console.log('%c 1Z ruta a insertar', 'green', this.newRuta);

    //luego guardar en BBDD.
    this.RouteMilestoneUserService.updateRoute(this.newRuta).subscribe(response => {
      if (response != null) {
        // Autenticación exitosa
        this.getTablaRoute(this.userInfo);
        console.log('%c 2Z ruta a insertar', 'green',  this.routeTable);
      } else {
        // Autenticación fallida
        console.log('La ruta NO se edito correctamente');
      }
    });
  }


  // public milestoneTable: TableMilestone[] = [];
  //public milestoneTableParse: parseGetMilestone = new parseGetMilestone();
  //seleccionadoEditM lo que obtine edel valor input


  /*MILESTONE */
  editMilestone() {
    console.log('%c 2C edicion hito', 'color:blue', this.formularioMilestoneEdit.get('ReferenceEditM')?.value);
    this.editMilestoneNameEdit = this.seleccionadoEditM.name;
    this.seleccionadoEditM.referenciaRuta = (this.formularioMilestoneEdit.get('ReferenceEditM')?.value).id;
    this.seleccionadoEditM.name = this.formularioMilestoneEdit.get('nameEdit')?.value;
    this.seleccionadoEditM.description = this.formularioMilestoneEdit.get('descriptionEdit')?.value;
    this.seleccionadoEditM.info = this.formularioMilestoneEdit.get('infoEdit')?.value;

console.log('%c 3C edicion hito', 'color:blue', this.seleccionadoEditM);

    this.RouteMilestoneUserService.updateMilestone(this.seleccionadoEditM).subscribe(response => {
      if (response != null) {
        // Autenticación exitosa

        this.milestoneTable = this.milestoneTable.map(elemento => {

          let nameSeach: string = this.editMilestoneNameEdit;
          console.log('El hito se edito correctamente en bbdd');
          return elemento;

        });
      } else {
        // Autenticación fallida
        console.log('El hito NO se elimino correctamente');
      }
    });
  }

  onMilestoneSelectionChange(event: any) {
    const selectedValue = event.target.value;
    this.seleccionadoEditM = selectedValue;
    console.log(this.seleccionadoEditM);
  }


 /**Eliminar Seleccionado*/
 public seleccionadoRutaDelete: TableRoute = new TableRoute(0, '');
 public controlRuta: boolean = true;
 public showAviso:boolean = false;
 public coicidentesMilestone:Milestone[] = []
  public habilitarBotonDelete:boolean=  false;
  /*RUTA*/
  //Borrar rutas
  //BORRAR
  //comprobar que no exista una referencia en milestone para poder borrar ruta
  deleteRoute(): void {
    let event = this.formularioRouteDelete.get('ReferenceRouteD')?.value;
    console.log('1D ',  event);
    const existeCoincidencia = this.buscarMilestone(event.id);
    if (!existeCoincidencia) {
      this.controlRuta = true;
      this.RouteMilestoneUserService.deleteRoute(event).subscribe({
        next: () => {
          this.getTablaRoute(this.userInfo);
        },
        error: error => {
          //  en caso de fallo al borrar la ruta
        }
      });
    } else {
      // Acción en caso de haber coincidencias
      if (window.confirm('¿Estás seguro de que deseas borrar todos los hitos?')) {
        // Acciones para borrar todos los hitos
        this.borrarMilestoneCoincidentesRuta(event.id);

      } else {
        // En caso de cancelar el borrado No se hace nada
      }
    }
  }

  buscarMilestone(routeId: number): boolean {
    console.log('2D ', routeId);
    return this.milestoneFull.some(milestone => milestone.routeId === routeId);
  }

  borrarMilestoneCoincidentesRuta(routeId: number): void {
    try {
      //almacenar los coincidentes
      this.coicidentesMilestone = this.milestoneFull.filter(milestone => milestone.routeId === routeId);
      this.coicidentesMilestone.forEach(element => {
        const result = this.RouteMilestoneUserService.deleteMilestone(element);
        if (result) {
          //todo a salido correcto actualiza la tabla milestone
          this.getMilestoneTable();
          //se llma de nuevo a la funcion al no tener coincidencias borrar la ruta
          this.deleteRoute();
        } else {
          // La llamada a deleteMilestone ha fallado
          // Puedes manejar el error o realizar acciones correspondientes
        }
      });
    }
    catch {

    }
  }



/*MILESTONE */
  /**Eliminar Seleccionado*/
  public seleccionadoMilestoneDelete: Milestone = new Milestone();

  deleteMilestone() {
    this.seleccionadoMilestoneDelete = this.formularioMilestoneC.get('ReferenceMilestoneDelete')?.value;

    this.RouteMilestoneUserService.deleteMilestone(this.seleccionadoMilestoneDelete).subscribe(response => {
      if (response != null) {
        // Autenticación exitosa
        this.getMilestoneTable();
      }
      else {
        //problema con el borrado del hito
      }
    });
  }

}



