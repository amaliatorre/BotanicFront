import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/object/profile';
import { ProfilesService } from 'src/app/services/profiles.service';
import { catchError } from 'rxjs/operators';
import { TableRoute } from 'src/app/object/tableRoute';
import { TableMilestone } from 'src/app/object/tableMilestone';
import { Observable } from 'rxjs';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-estadistics',
  templateUrl: './estadistics.component.html',
  styleUrls: ['./estadistics.component.css']
})
export class EstadisticsComponent implements OnInit {




  //age
  showStadisticAge: boolean = false;

  public childish: number = 0;
  public kids: number = 0;
  public teenager: number = 0;
  public young: number = 0;
  public middle_age: number = 0;
  public adult: number = 0;
  public senior: number = 0;
  public age: number = 0;

  public childishGraphic: number = 0;
  public kidsGraphic: number = 0;
  public teenagerGraphic: number = 0;
  public youngGraphic: number = 0;
  public middle_ageGraphic: number = 0;
  public adultGraphic: number = 0;
  public seniorGraphic: number = 0;
  public ageGraphic: number = 0;

  progressBarValue: number = 0;
  progressBarValue1: number = 0;
  progressBarValue2: number = 0;
  progressBarValue3: number = 0;
  progressBarValue4: number = 0;
  progressBarValue5: number = 0;
  progressBarValue6: number = 0;
  progressBarValue7: number = 0;

  //PERFILES
  public profileTable: Profile[] = [];
  //  TABLAS
  public TMilestone: TableMilestone[] = [];
  public TRoute: TableRoute[] = [];

  constructor(
    private DataService: DataServiceService) {

  }

  ngOnInit(): void {
    this.getPerfilTable();
  }


  //obtener la información
  getPerfilTable() {
     this.profileTable = this.DataService.getPerfiles();
    }

  //metodos para estadisticas

  /*% EDAD */
  AgesPorcentage() {

    this.profileTable.forEach((item: Profile) => {
      this.age = this.calcularEdad(item.birthday); // Calcula la edad a partir de la fecha de nacimiento

      if (this.age >= 0 && this.age <= 6) {
        this.childish++;
      } else if (this.age >= 7 && this.age <= 12) {
        this.kids++;
      } else if (this.age >= 13 && this.age <= 17) {
        this.teenager++;
      } else if (this.age >= 18 && this.age <= 28) {
        this.young++;
      } else if (this.age >= 29 && this.age <= 45) {
        this.middle_age++;
      } else if (this.age >= 46 && this.age <= 60) {
        this.adult++;
      } else if (this.age >= 61) {
        this.senior++;
      }
    });
  }

  calcularEdad(fechaNacimiento: Date) {
    ;
    const fechaActual = new Date();
    let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    const mesActual = fechaActual.getMonth() + 1;
    const mesNacimiento = fechaNacimiento.getMonth() + 1;

    if (mesActual < mesNacimiento || (mesActual === mesNacimiento && fechaActual.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }

    return edad;
  }

  stadicticAge() {
    this.AgesPorcentage();
    let total: number = this.childish + this.kids + this.teenager + this.young + this.middle_age + this.adult + this.senior;

    this.childishGraphic = this.childish / total * 100;
    this.kidsGraphic = this.kids / total * 100;
    this.teenagerGraphic = this.teenager / total * 100;
    this.youngGraphic = this.young / total * 100;
    this.middle_ageGraphic = this.middle_age / total * 100;
    this.adultGraphic = this.adult / total * 100;
    this.seniorGraphic = this.senior / total * 100;

    this.showStadisticAge = true;

    this.progressBarValue1 = this.childishGraphic;
    this.progressBarValue2 = this.kidsGraphic;
    this.progressBarValue3 = this.teenagerGraphic;
    this.progressBarValue4 = this.youngGraphic;
    this.progressBarValue5 = this.middle_ageGraphic;
    this.progressBarValue6 = this.adultGraphic;
    this.progressBarValue7 = this.seniorGraphic;

  }
}





