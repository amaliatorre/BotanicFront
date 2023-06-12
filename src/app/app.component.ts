import { Component, Output, EventEmitter, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { UsuInfo } from './object/usuInfo';
import { DataServiceService } from './services/data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BotanicFront';
  //bool visualización
  public showMain: boolean = false;
  public showLogin: boolean = true;

  public loginVerif: boolean = false;


  constructor(private DataServiceService:DataServiceService) { }

  ngOnInit(): void {
    this.checkCambios();
    console.log(this.loginVerif, 'ngoninit appcomponente verificacion');

  }

  checkCambios() {
    console.log('AQUI ESTOYYYYY');
    this.DataServiceService.getverificacionLogin().subscribe((value: boolean) => {
      this.loginVerif = value;
      console.log(this.loginVerif, 'ngOnInit AppComponent verificacion');
      if (this.loginVerif) {
        this.showMain = true;
        this.showLogin = false;
      } else {
        //caso de cierre de sesion
        this.showMain = false;
        this.showLogin = true;
      }
      // Realiza las acciones adicionales que necesites al recibir el nuevo valor
    });
  }


}





