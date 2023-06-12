import { Component, ViewChild } from '@angular/core';
import { TooltipDirective } from 'ngx-bootstrap/tooltip/tooltip.directive';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  @ViewChild('emailButton', { static: true }) emailButtonTooltip!: TooltipDirective;
  constructor() { }

  copyEmail() {
    const textToCopy = 'botanicolaconcepcion@malaga.eu';

    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        this.emailButtonTooltip.tooltip = '¡Email copiado!';
        this.emailButtonTooltip.show();
      })
      .catch((error) => {
        console.error('Error al copiar el texto', error);
      });
  }


  //abrir en una ventan separada
  openPriceTime(): void {
    const priceTimeUrl = 'https://laconcepcion.malaga.eu/es/visitas-horarios-y-tarifas/visitas-horarios-y-tarifas/#.ZGvrg3ZBy44';
    window.open(priceTimeUrl, '_blank');
  }

  openActivities(): void {
    const activitiesUrl = 'https://laconcepcion.malaga.eu/es/actividades-y-eventos/';
    window.open(activitiesUrl, '_blank');
  }

  openPdf(): void {
    const pdfUrl = '../../../../assets/img/pdf/Mapa-del-jardin.-de-la-concepcion.pdf';
    window.open(pdfUrl, '_blank');
  }

}
