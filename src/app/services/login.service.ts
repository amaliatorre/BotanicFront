import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map,  catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CheckLogin } from '../object/checkLogin';
import { UserCheck } from '../object/UserCheck';
import { User } from '../object/user';
import { DataServiceService } from './data-service.service';
import { UsuInfo } from '../object/usuInfo';
import { RouteMilestone } from '../object/routeMilestones';
import { LoginResponse } from '../object/LoginResponse';
import { Router } from '@angular/router';
import { Milestone } from '../object/milestones';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public urlautenticacion: string = 'https://localhost:7228';

  constructor(private http: HttpClient,private dataService: DataServiceService, private router: Router) {}

  //manda el objeto en json al back
  createCheckLogin(userCheck: UserCheck): Observable<any> {
    return this.http.post<any>(this.urlautenticacion + '/user/login', userCheck, {responseType: "application/json"}).pipe(
      map(response => {
        if (response != null) {
          // Establecer los objetos en el servicio DataService
          const loginResponse: LoginResponse = JSON.parse(response);
          // Devolver el objeto completo de la respuesta
          console.log('%c response en el service login!! ', 'color:green', loginResponse);
          this.dataService.recibirDatosLogin(loginResponse);

          this.dataService.verificacionLogin(true);

          return loginResponse;
        } else {
          // Realiza acciones adicionales si la respuesta no es exitosa
          let x = this.dataService.verificacionLogin(false); // Llamar al método verificacionLogin con el valor false
          console.log('prueba si lee: ',x);
          // Puedes devolver cualquier cosa que desees en el observable, por ejemplo, un mensaje de error
          throw new Error('La solicitud no fue exitosa');
        }
      }),
      catchError(error => {
        // Manejar la excepción aquí y realizar las acciones necesarias
        console.error('Error del catch en la solicitud:', error);
        this.dataService.verificacionLogin(false); // Llamar al método verificacionLogin con el valor false
        throw error;
      })
    );
  }
}

