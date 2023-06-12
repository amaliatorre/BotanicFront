import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormLoginComponent } from './component/login/form-login/form-login.component';
import { FormRegisterComponent } from './component/login/form-register/form-register.component';
import { ViewLoginComponent } from './component/login/view-login/view-login.component';
import { RoutePorcentagComponent } from './component/componentUser/route-porcentag/route-porcentag.component';
import { ListaRouteMilestComponent } from './component/componentUser/lista-route-milest/lista-route-milest.component';
import { ClueComponent } from './component/componentUser/clue/clue.component';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './component/home/home/home.component';
import { FooterComponent } from './component/home/footer/footer.component';
import { HeaderComponent } from './component/home/header/header.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { HeadComponent } from './component/login/head/head.component';
import { ResourcesListComponent } from './component/componentUser/resources-list/resources-list.component';
import { AvatarPerfilHomeComponent } from './component/home/avatar-perfil-home/avatar-perfil-home.component';
import { PerfilComponent } from './component/componentUser/perfil/perfil.component';
import { NgxPrintModule } from 'ngx-print';
import { AdmComponent } from './component/componentAdmin/adm/adm.component';
import { CrudRouteMilestoneComponent } from './component/componentAdmin/crud-route-milestone/crud-route-milestone.component';
import { NewAdminComponent } from './component/componentAdmin/new-admin/new-admin.component';
import { EstadisticsComponent } from './component/componentAdmin/estadistics/estadistics.component';


const routes: Routes = [
  // Otras rutas existentes...

  { path: 'loginPage', component: ViewLoginComponent },


  { path: 'perfilCardEdit', component: PerfilComponent },
  { path: 'viewPerfilHome', component: AvatarPerfilHomeComponent },

  { path: 'ListaEleccionHito', component: ListaRouteMilestComponent },
  { path: 'hitoCard', component: ClueComponent },

  { path: 'error', component: ErrorComponent },

  { path: 'recursos', component: ResourcesListComponent },




];

@NgModule({
  declarations: [
    AppComponent,
    FormLoginComponent,
    FormRegisterComponent,
    ViewLoginComponent,
    RoutePorcentagComponent,
    ListaRouteMilestComponent,
    ClueComponent,
    ErrorComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    HeadComponent,
    ResourcesListComponent,
    AvatarPerfilHomeComponent,
    PerfilComponent,
    AdmComponent,
    CrudRouteMilestoneComponent,
    NewAdminComponent,
    EstadisticsComponent,

  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    TooltipModule.forRoot(),
    NgxPrintModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
