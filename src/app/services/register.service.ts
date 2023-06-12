import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../object/user';
import { RouteMilestone } from '../object/routeMilestones';


@Injectable({
  providedIn: 'root'
})
export class RegisterService {

public urlautenticacion:string = 'https://localhost:7228';
private registroSuccess: boolean = false;
private registroSuccessSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
public registroSuccess$: Observable<boolean> = this.registroSuccessSubject.asObservable();

constructor(private http: HttpClient) { }

createRegister(User: User): Observable<any> {
  return this.http.post<any>(this.urlautenticacion + '/user/create', User).pipe(
    map(response => {
      if (response.success) {
        // Devolver el objeto completo de la respuesta
        console.log('response existosa');
        this.registroSuccessSubject.next(true);
        return response;
      } else {
        // Realiza acciones adicionales si la respuesta no es exitosa
        console.log('La solicitud no fue exitosa');
        // Puedes devolver cualquier cosa que desees en el observable, por ejemplo, un mensaje de error
        throw new Error('La solicitud no fue exitosa');
      }
    }));
  }

  //cambio de stado de register a login
  /*getRegistroSuccess(): boolean {
    return this.registroSuccessSubject.value;
  }*/

  getRegistroSuccess(): Observable<boolean> {
    return this.registroSuccessSubject.asObservable();
  }

  setRegistroSuccess(valor: boolean) {
    this.registroSuccessSubject.next(valor);
  }

}



