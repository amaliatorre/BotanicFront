import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { Milestone } from 'src/app/object/milestones';
import { DataServiceService } from 'src/app/services/data-service.service';
import { Observable, Subject } from 'rxjs';
import { RouteMilestone } from 'src/app/object/routeMilestones';

@Component({
  selector: 'app-clue',
  templateUrl: './clue.component.html',
  styleUrls: ['./clue.component.css']
})
export class ClueComponent implements OnInit{


  @Input() milestone: EventEmitter<Milestone> | undefined;
  @Output() closeClue: EventEmitter<Milestone> = new EventEmitter<Milestone>();

  public openInfo: boolean = false;
  public openMap: boolean = false;

  //milestone que viene de padre lista hitos
  public milestoneValue: any = null;

  public miCheckboxValue: boolean = false;


  constructor(private dataService: DataServiceService) {}




  ngOnInit() {
    this.pasarObservableMilestone();

  }

  pasarObservableMilestone() {
    if (this.milestone) {
      this.milestone.subscribe((milestoneObj: Milestone) => {
        this.milestoneValue = milestoneObj;
        console.log('%c ObserrvclueVALUE ', 'color:green', this.milestoneValue);
      });
    }
  }

  onCloseClue() {
    //actualiza la tabla routeMilestoneUser de data Service
    this.dataService.checkCompleteMilestoneUpdate(this.milestoneValue);

  }

  openPdf(): void {
    const pdfUrl = '../../../../assets/img/pdf/Mapa-del-jardin.-de-la-concepcion.pdf';
    window.open(pdfUrl, '_blank');
  }
  obtenerValorCheckbox() {
    if (this.milestone) {
      if (this.miCheckboxValue) {
        console.log("El checkbox está seleccionado.");
        this.milestoneValue.completed = true;
      } else {
        console.log("El checkbox no está seleccionado.");
        this.milestoneValue.completed = false;
      }
    }
  }

}

