import { Component, OnInit } from '@angular/core';
import { TableMilestone } from 'src/app/object/tableMilestone';
import { TableRoute } from 'src/app/object/tableRoute';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// Remove this line from your component
import { HttpClient } from '@angular/common/http';
import { RouteMilestoneUserService } from 'src/app/services/route-milestone-user.service';
import { UsuInfo } from 'src/app/object/usuInfo';
import { DataServiceService } from 'src/app/services/data-service.service';
import { Milestone } from 'src/app/object/milestones';
import { RouteMilestone } from 'src/app/object/routeMilestones';



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

  constructor(private http: HttpClient, private RouteMilestoneUserService: RouteMilestoneUserService, private DataService: DataServiceService) {
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
      editNameR: new FormControl('', [Validators.required]),
    });
    this.formularioMilestoneEdit = new FormGroup({
      ReferenceRouteEditM: new FormControl('', [Validators.required]),
      nameEditM: new FormControl('', [Validators.required]),
      descriptionEditM: new FormControl('', [Validators.required]),
      infoEditM: new FormControl('', [Validators.required]),
    });

    this.formularioRouteDelete = new FormGroup({
      ReferenceRouteD: new FormControl('', [Validators.required]),
      newNameRD: new FormControl('', [Validators.required]),
    });
    this.formularioMilestoneDelete = new FormGroup({
      ReferenceMilestoneDelete: new FormControl('', [Validators.required]),

    });
  }


  //DECLARACION

  public routeTable: TableRoute[] = [];
  public milestoneTable: RouteMilestone[] = [];

  public milestoneFull:Milestone[] = [];

  public userInfo: UsuInfo = new UsuInfo('', []);

  ngOnInit(): void {
    //obtener la tabla de ruta
    this.getUserInfo();
    this.getTablaRoute(this.userInfo);

  }



  getMilestoneFull() {



    this.milestoneTable.forEach(element => {
      element.milestone.forEach(item=> {
        this.milestoneFull.push(item);
      });
    });
    console.log('ver lista de milesotne de milestone table',this.milestoneFull);




  }

  getUserInfo() {
    this.userInfo = this.DataService.getUsuInfo();
    console.log('%c Exito al obtener usuInfo', 'green', this.userInfo);

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
  public RefRforM: TableRoute = new TableRoute(0, '');
  public newMilestone: Milestone = new Milestone();
  public idRutaSelec: number = 0;

  //Añadir rutas e hitos
  addRoute() {
    // Obtener valores del formulario
    this.newRoute.id = 0;
    this.newRoute.name = this.formularioRouteC.get('nameR')?.value;

    console.log('%c NOMBRE DE LA RUTA ENVIADO -> ','color:red', this.newRoute.name);

    this.RouteMilestoneUserService.createRoute(this.newRoute).subscribe(response => {
      if (response != null) {
        // Autenticación exitosa
        console.log('El hito se añadio correctamente');
        this.routeTable.push(this.newRoute);
      } else {
        // Autenticación fallida
        console.log('El hito NO se añadio correctamente');
      }
    });
  }

  addMilestone() {
    this.newMilestone.routeId = this.RefRforM.id;
    this.newMilestone.name = this.formularioMilestoneC.get('milestoneName')?.value;
    this.newMilestone.description = this.formularioMilestoneC.get('description')?.value;
    this.newMilestone.info = this.formularioMilestoneC.get('info')?.value;
    console.log('%c editar hito check table: ', 'color: pink', this.milestoneTable);

    this.RouteMilestoneUserService.createMilestone(this.newMilestone).subscribe(response => {
      if (response != null) {
        // Autenticación exitosa
        this.milestoneTable.forEach(element => {
          let RefRforMName = this.RefRforM.name;
          if (element.name == RefRforMName) {
            element.milestone.push(this.newMilestone);
          }
        });

      } else {
        // Autenticación fallida
        console.log('El hito NO se añadio correctamente');
      }
    });
  }
  onMilestoneSelectionCrearRefRutaChange(event: any) {
    const EditRouteId = this.formularioMilestoneC.get('ReferenceRoute')?.value;

    var rutaSelected = this.routeTable.find(x => x.name == event.value);
    localStorage.getItem('rutasActual')

    var rutasLocalStorage = localStorage.getItem('rutasActual');
    if(rutasLocalStorage != null){
        var rutasObjeto = JSON.parse(rutasLocalStorage);

        console.log('%c ESTO ES OTRA COSA ', 'color: green', rutasObjeto);
        console.log('%c ESTO ES OTRA COSA ', 'color: green', event.value);

        for(let i = 0; i < rutasObjeto.length; i++){
            if(rutasObjeto[i].name == event.value){
              console.log('%c ESTO ES OTRA COSA ', 'color: green', rutasObjeto[i].id);
            }
        }

    }


    console.log('%c HEMOS ENCONTRADO LA RUTA ', 'color: green', rutaSelected);
    console.log('%c EUREKA ', 'color: green', this.routeTable);
    this.EditRouteId = EditRouteId;
  }

  /**Eliminar Seleccionado*/
  public seleccionadoRutaDelete: TableRoute = new TableRoute(0, '');
  public controlRuta: boolean = true;
  public seleccionadoMilestoneDelete: TableMilestone = new TableMilestone();


  //BORRAR
  //comprobar que no exista una referencia en milestone para poder borrar ruta
  habilitarBotonDelete(event: any): void {
    this.controlRuta = !this.routeTable.some(route => {
      return this.milestoneTable.some(data => data.milestone.forEach(x => x.routeId == this.seleccionadoRutaDelete.id));
    });
    this.onRutaSelectionDeleteChange(event);
  }

  //Borrar rutas
  deleteRoute() {
    let route = this.seleccionadoRutaDelete;
    this.RouteMilestoneUserService.deleteRoute(route).subscribe(response => {
      if (response != null) {
        // Autenticación exitosa
        const indice = this.routeTable.findIndex(elemento => elemento.id === this.seleccionadoEdit.id);

        if (indice !== -1) {
          // Eliminar el elemento del arreglo por su índice
          this.routeTable.splice(indice, 1);
        }
        console.log('La ruta se elimino correctamente');

      } else {
        // Autenticación fallida
        console.log('La ruta NO se elimino correctamente');
      }
    });
  }

  onRutaSelectionDeleteChange(event: any) {
    const EditRouteDelete = event.target.value;
    this.seleccionadoRutaDelete = EditRouteDelete;
    console.log(this.seleccionadoRutaDelete);
  }

  deleteMilestone() {
    let milestone = this.seleccionadoMilestoneDelete;
    this.RouteMilestoneUserService.deleteMilestone(milestone).subscribe(response => {
      if (response != null) {
        // Autenticación exitosa
        const indice = this.milestoneTable.findIndex(elemento => elemento, milestone === milestone);

        if (indice !== -1) {
          // Eliminar el elemento del arreglo por su índice
          this.milestoneTable.splice(indice, 1);
          console.log('La ruta se elimino correctamente');
        }
        else {
          console.log('La ruta NO se elimino correctamente NO se encontro el elemento en el array');
        }

      } else {
        // Autenticación fallida
        console.log('La ruta NO se elimino correctamente');
      }
    });
  }
  onMilestoneSelectionDeleteChange(event: any) {
    const EditMilestoneDelete = event.target;
    this.seleccionadoMilestoneDelete = EditMilestoneDelete;
    console.log('Hito seleccionado para borrar',this.seleccionadoMilestoneDelete);
  }

  /**Modificado Seleccionado */
  public seleccionadoEdit: TableRoute = new TableRoute(0, '');
  public EditRouteId: number = 0;
  public seleccionadoEditM: TableMilestone = new TableMilestone();
  public editMilestoneNameEdit: string = '0';
  public ViewHitoSelectEdit: Milestone[] = [];

  //Editar rutas e hitos
  editRoute() {
    this.EditRouteId = this.seleccionadoEdit.id;
    console.log('%c this.EditRouteId', 'green', this.EditRouteId);
    this.seleccionadoEdit.name = this.formularioRouteEdit.get('editNameR')?.value;
    //luego guardar en BBDD.
    this.RouteMilestoneUserService.updateRoute(this.seleccionadoEdit).subscribe(response => {
      if (response != null) {
        // Autenticación exitosa
        this.routeTable = this.routeTable.map(elemento => {
          if (elemento.id === this.EditRouteId) {
            // Modificar la propiedad del objeto encontrado
            elemento.name = this.seleccionadoEdit.name;
          }
          console.log('La ruta se elimino correctamente');
          return elemento;

        });
      } else {
        // Autenticación fallida
        console.log('La ruta NO se elimino correctamente');
      }
    });
  }

  onRouteSelectionChange(event: any) {
    const selectedValue = event.target.value;
    this.seleccionadoEdit = selectedValue;
    console.log(selectedValue);
  }

  // public milestoneTable: TableMilestone[] = [];
  //public milestoneTableParse: parseGetMilestone = new parseGetMilestone();
  //seleccionadoEditM lo que obtine edel valor input

  editMilestone() {

    this.editMilestoneNameEdit = this.seleccionadoEditM.name;
    this.seleccionadoEditM.referenciaRuta = this.formularioMilestoneEdit.get('referenciaRutaEdit')?.value;
    this.seleccionadoEditM.name = this.formularioMilestoneEdit.get('nameEdit')?.value;
    this.seleccionadoEditM.description = this.formularioMilestoneEdit.get('descriptionEdit')?.value;
    this.seleccionadoEditM.info = this.formularioMilestoneEdit.get('infoEdit')?.value;


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



}



