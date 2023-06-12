import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Color } from '../object/color';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColorsService {
  public urlautenticacion: string = 'https://localhost:7228';

  constructor(private http: HttpClient) { }

  //Obtine el objeto  de la tabla del back
  getDataFromBackend(): Observable<any> {
    return this.http.get<any>(this.urlautenticacion + '/getTableColor').pipe(
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
}
