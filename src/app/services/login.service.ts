import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserCheck } from '../object/UserCheck';
import { DataServiceService } from './data-service.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

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

