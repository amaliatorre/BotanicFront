  import { Component, OnInit } from '@angular/core';
  import { RegisterService } from 'src/app/services/register.service';
  import { Subscription } from 'rxjs';

  @Component({
    selector: 'app-view-login',
    templateUrl: './view-login.component.html',
    styleUrls: ['./view-login.component.css']
  })
  export class ViewLoginComponent implements OnInit {
    showLoginForm:boolean = true;
    showRegisterForm:boolean = false;
    registroSuccess: boolean = false;
    registroSuccessSubscription: Subscription =  new Subscription();

  constructor(private RegisterService:RegisterService) {}

  ngOnInit(): void {

    this.check();
  }

  check() {



  }
    //alternar valores
    toggleForms() {
      console.log('valoresSSS', this.showRegisterForm , this.registroSuccess);
      this.showLoginForm = !this.showLoginForm;
      this.showRegisterForm = !this.showRegisterForm;
    }
  }
