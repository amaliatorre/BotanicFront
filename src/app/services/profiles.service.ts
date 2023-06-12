import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Profile } from '../object/profile';
import { Observable, catchError, map } from 'rxjs';
import { Avatar } from '../object/avatar';
import { Color } from '../object/color';
import { UsuInfo } from '../object/usuInfo';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {
  public urlautenticacion: string = 'https://localhost:7228';

  constructor(private http: HttpClient) { }

 //obtener tabla de perfiles

  getDataFromBackend(): Observable<any> {
    return this.http.get<any>(this.urlautenticacion + '/getTableProfile').pipe(
      map(response => {
        if (response.success) {
          // Devolver el objeto completo de la respuesta
          return response;
        } else {
          // Realiza acciones adicionales si la respuesta no es exitosa
          console.log('La solicitud no fue exitosa');
          // Puedes devolver cualquier cosa que desees en el observable, por ejemplo, un mensaje de error
          throw new Error('La solicitud no fue exitosa');
        }
      })
    );;

  }


/*Editar */
updateProfile(profile: Profile): Observable<any> {
  return this.http.post<any>(this.urlautenticacion + '/upgradeProfile',profile).pipe(
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

}
