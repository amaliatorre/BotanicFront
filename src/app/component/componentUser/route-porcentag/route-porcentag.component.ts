import { Component, OnInit } from '@angular/core';
import { RouteMilestoneUserService } from 'src/app/services/route-milestone-user.service';
import { RouteMilestone} from 'src/app/object/routeMilestones';
import { UsuInfo } from 'src/app/object/usuInfo';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-route-porcentag',
  templateUrl: './route-porcentag.component.html',
  styleUrls: ['./route-porcentag.component.css']
})
export class RoutePorcentagComponent implements OnInit {
  public showProgressBar: boolean = false;
  selectedRoute: string = '';
  public progressBarValue: number = 0;
  public routeMilestoneUser: RouteMilestone[] = [];
  public userInfo: UsuInfo = new UsuInfo('', []);
  public backgroundColor:string = '';

  constructor(private routeMilestoneService: RouteMilestoneUserService, private DataServiceService:DataServiceService) { }

  ngOnInit(): void {
    this.getRouteMilestoneUser();
  }

  getRouteMilestoneUser() {

    //this.routeMilestoneUser = this.DataServiceService.getRouteMilestonesUser();
    console.log('%c Rutas Milestone: ', 'color: green', this.routeMilestoneUser);

  }

  showProgress(route: RouteMilestone) {
    console.log('Route:', route);
    this.selectedRoute = route.name;
    const completedCount = route.milestone.filter((milestone) => milestone.completed).length;
    const arrayLength = route.milestone.length;
    console.log(route, 'ruta que entra');
    const porc = completedCount / arrayLength * 100;
    this.progressBarValue = porc;
    console.log('% VALOR ', porc);
    this.showProgressBar = true;
   if(porc <= 25) {
    this.backgroundColor = '#9f8a79';
   }
   else if(porc > 25 && porc < 50) {
    this.backgroundColor = '#598fa3';
   }
   else if(porc >= 50 && porc <= 75){
    this.backgroundColor = '#c96da0';
   }
   else {
    this.backgroundColor = '#a35998 ';
   }
    return porc;

  }
}
