import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Profile } from 'src/app/object/profile';
import { RouteMilestone } from 'src/app/object/routeMilestones';
import { User } from 'src/app/object/user';
import { ProfilesService } from 'src/app/services/profiles.service';
import { RegisterService } from 'src/app/services/register.service';
import { ActivatedRoute } from '@angular/router';
import { UsuInfo } from 'src/app/object/usuInfo';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user_email: string = 'example@example.com';
  showProgress: boolean = false;
  showRoutes: boolean = false;
  showResource: boolean = false;
  showEditProfile: boolean = false;

  showAdm: boolean = true;
  admin: boolean = true;

  public usuInfo: UsuInfo = new UsuInfo("", []);
  public routeMilestoneUser = new RouteMilestone();

  //dato enviado a header
  @Output() emailUserChange = new EventEmitter<string>();
  public mail:string = '';

  //datos recibidos de login
  @Input() userInfo!: UsuInfo;
  @Input() milestoneUser!: RouteMilestone;

  constructor(private ProfilesService: ProfilesService, private RegisterService: RegisterService, private route: ActivatedRoute, private dataService: DataServiceService) {

  }
  ngOnInit(): void {
    //acceder a la propiedades del ususario logeado mediante el service Data
    //this.usuInfo = this.dataService.getUsuInfo;
    //this.routeMilestoneUser = this.dataService.getRouteMilestoneUser();

    this.checkAdmin();
    //console.log('respuesta de response componente HOME info usu:', this.userInfo);
    //console.log('respuesta de response componente HOME ruta Hito:', this.routeMilestoneUser);
    //this.enviarDatosEmail(this.userInfo.email)

  }
  //Enviar datos
  //header
  enviarDatosEmail(email: string) {
    this.emailUserChange.emit(email);
    this.mail = email;
  }
  //si el rol del algun perfil es admin visualizar estos componentes
  checkAdmin() {
    this.usuInfo.perfiles.forEach(item => {
      if (item.rol == 'admin') {
        this.showAdm = true;
      }
    });
  }
  closeListaRutas() {
    this.showRoutes = false;
  }
}
