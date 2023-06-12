import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  //dato recibidos

    public emailUserChange!: string;
    public loginVerif: boolean = false;

  constructor(private DataServiceService:DataServiceService) {
    this.emailUserChange! = this.DataServiceService.getEmail();
  }

  logout() {
    this.notifyLoginVerifChange(false);
  }

   //notificacion cuando exista cambios en el componente
   public notifyLoginVerifChange(value: boolean): void {
    this.DataServiceService.updateVerificacionLogin(value);
  }
}
