import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RouteMilestone } from '../object/routeMilestones';
import { Observable, catchError, map } from 'rxjs';
import { Milestone } from '../object/milestones';
import { UsuInfo } from '../object/usuInfo';
import { TableRoute } from '../object/tableRoute';
import { TableMilestone } from '../object/tableMilestone';

@Injectable({
  providedIn: 'root'
})
// trata el Objeto RouteMilestone (routeName:string, milestoneList:Milestone[]'complete')
//Usuario Info
export class RouteMilestoneUserService {

  objectRouteMilestone: RouteMilestone = new RouteMilestone();

  public urlautenticacion: string = 'https://localhost:7228';


  constructor(private http: HttpClient) { }

  getDataFromBackend(userInfo: UsuInfo): Observable<any> {
    return this.http.post<any>(this.urlautenticacion + '/routes/getall', userInfo).pipe(
      map(response => {
        if (response != null) {
          return response;
        } else {
          throw new Error('La solicitud no fue exitosa');
        }
      })
    );
  }

getDataFromBackendRouteMilestone(id:number): Observable<RouteMilestone[]> {
  return this.http.post<any>(this.urlautenticacion + '/milestones/routes', id ).pipe(
    map(response => {
      if (response != null) {
        return response;
      } else {
        console.log('La solicitud no fue exitosa');
        throw new Error('La solicitud no fue exitosa');
      }
    })
  );
}

  updateCompleteMilestone(milestone: Milestone): Observable<any> {
    return this.http.post<any>(this.urlautenticacion + '/updateCompleteMilestone',milestone).pipe(
      map(response => {
        if (response.success) {
          // Devolver el objeto completo de la respuesta
          return response;
        } else {
          // Realiza acciones adicionales si la respuesta no es exitosa
          console.log('La solicitud actualizar no fue exitosa Ruta');
          // Puedes devolver cualquier cosa que desees en el observable, por ejemplo, un mensaje de error
          throw new Error('La solicitud actualizar no fue exitosa Ruta');
        }
      })
    );;
  }



  /*RUTA */
/*CREAR */
createRoute(route: TableRoute): Observable<any> {

  return this.http.post<any>(this.urlautenticacion + '/routes/create',route).pipe(
    map(response => {
      if (response != null) {
        var rutasLocalStorage = localStorage.getItem('rutas');
        if(rutasLocalStorage != null){
            var rutasObjeto = JSON.parse(rutasLocalStorage);
            rutasObjeto.push(response);
            localStorage.setItem('rutasActual', JSON.stringify(rutasObjeto));
        }
        return response;
      } else {
        // Realiza acciones adicionales si la respuesta no es exitosa
        console.log('La solicitud creación no fue exitosa Ruta');
        // Puedes devolver cualquier cosa que desees en el observable, por ejemplo, un mensaje de error
        throw new Error('La solicitud  creación no fue exitosa Ruta');
      }
    })
  );;
}
 /*ACTUALIZAR*/
 updateRoute(Route: TableRoute): Observable<any> {
  return this.http.post<any>(this.urlautenticacion + '/routes/update',Route).pipe(
    map(response => {
      if (response != null) {
        // Devolver el objeto completo de la respuesta
        return response;
      } else {
        // Puedes devolver cualquier cosa que desees en el observable, por ejemplo, un mensaje de error
        throw new Error('La solicitud actualizar no fue exitosa Ruta');
      }
    })
  );;
  }
 /*BORRAR*/
 deleteRoute(route: TableRoute): Observable<any> {

  return this.http.post<any>(this.urlautenticacion + '/routes/delete',route).pipe(
    map(response => {
      if (response != null) {
        // Devolver el objeto completo de la respuesta
        return response;
      } else {
        // Realiza acciones adicionales si la respuesta no es exitosa
        console.log('La solicitud borrar no fue exitosa Ruta');
        // Puedes devolver cualquier cosa que desees en el observable, por ejemplo, un mensaje de error
        throw new Error('La solicitud borrar no fue exitosa Ruta');
      }
    })
  );;
}
 /*HITO */

 createMilestone(milestone: Milestone): Observable<any> {

  return this.http.post<any>(this.urlautenticacion + '/milestones/create',milestone).pipe(
    map(response => {
      if (response != null) {
        // Devolver el objeto completo de la respuesta
        return response;
      } else {
        // Realiza acciones adicionales si la respuesta no es exitosa
        console.log('La solicitud creación no fue exitosa Hito');
        // Puedes devolver cualquier cosa que desees en el observable, por ejemplo, un mensaje de error
        throw new Error('La solicitud  creación no fue exitosa Hito');
      }
    })
  );;
}

/*ACTUALIZAR */
updateMilestone(Milestone: TableMilestone): Observable<any> {
  return this.http.post<any>(this.urlautenticacion + '/milestones/update',Milestone).pipe(
    map(response => {
      if (response != null) {
        // Devolver el objeto completo de la respuesta
        return response;
      } else {
        // Realiza acciones adicionales si la respuesta no es exitosa
        console.log('La solicitud actualizar no fue exitosa Hito');
        // Puedes devolver cualquier cosa que desees en el observable, por ejemplo, un mensaje de error
        throw new Error('La solicitud actualizar no fue exitosa Hito');
      }
    })
  );;
}
/*BORRAR*/
deleteMilestone(milestone: Milestone): Observable<any> {

  return this.http.post<any>(this.urlautenticacion + '/milestones/delete',milestone).pipe(
    map(response => {
      if (response != null) {
        // Devolver el objeto completo de la respuesta
        return response;
      } else {
        // Realiza acciones adicionales si la respuesta no es exitosa
        console.log('La solicitud borrar no fue exitosa Hito');
        // Puedes devolver cualquier cosa que desees en el observable, por ejemplo, un mensaje de error
        throw new Error('La solicitud  borrar no fue exitosa Hito');
      }
    })
  );;
}



}
