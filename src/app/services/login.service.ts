import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, catchError, of, tap } from 'rxjs';
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

  constructor(private http: HttpClient, private dataService: DataServiceService) { }

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
}

