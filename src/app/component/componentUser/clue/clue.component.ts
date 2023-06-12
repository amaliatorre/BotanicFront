import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { Milestone } from 'src/app/object/milestones';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-clue',
  templateUrl: './clue.component.html',
  styleUrls: ['./clue.component.css']
})
export class ClueComponent implements OnInit{

  public openInfo: boolean = false;
  public openMap: boolean = false;

  public milestoneValue: any = null;
  public miCheckboxValue: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    const { milestone } = history.state;
    console.log('history.state', history.state);
    this.milestoneValue = milestone;
  }

  obtenerValorCheckbox() {
    if (this.milestoneValue) {
      if (this.miCheckboxValue) {
        console.log("El checkbox está seleccionado.");
        this.milestoneValue.completed = true;
      } else {
        console.log("El checkbox no está seleccionado.");
        this.milestoneValue.completed = false;
      }
    }
  }

  openPdf(): void {
    const pdfUrl = '../../../../assets/img/pdf/Mapa-del-jardin.-de-la-concepcion.pdf';
    window.open(pdfUrl, '_blank');
  }
  onCloseClue() {

    // Realiza cualquier acción necesaria antes de redirigir
    // Define los datos que deseas pasar al componente destino
    const dataToUpdate = this.milestoneValue;

    // Redirige al componente destino y pasa los datos en el estado de la ruta
    this.router.navigate(['/lista_rutas'], { state: { dataToUpdate } });
  }

}
