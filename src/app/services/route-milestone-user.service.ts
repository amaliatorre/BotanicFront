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

  //Obtener RouteMilestone relacion de rutas y sus hitos

/*
  //manda el objeto en json al back
  createCheckLogin(userCheck: UserCheck): Observable<any> {
    return this.http.post<any>(this.urlautenticacion + '/user/login', userCheck).pipe(
      tap(dataLogin => {
        if (dataLogin) {
          this.dataService.guardarLoginResponse(dataLogin);
        }
      })
    );
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
*/

  getDataFromBackend(userInfo: UsuInfo): Observable<any> {
    return this.http.post<any>(this.urlautenticacion + '/routes/getall', userInfo).pipe(
      map(response => {
        if (response != null) {
          console.log('respuesta del service Rutas', response);
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
        console.log('1. respuesta del service RUTA-milestones', response);
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
        console.log('%c Exito al actualizar tabla ruta','pink', response);
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
        console.log('%c Exito al borrar tabla ruta','pink', response);
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
deleteMilestone(milestone: TableMilestone): Observable<any> {

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
