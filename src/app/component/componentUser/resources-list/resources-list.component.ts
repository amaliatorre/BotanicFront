import { Component } from '@angular/core';

@Component({
  selector: 'app-resources-list',
  templateUrl: './resources-list.component.html',
  styleUrls: ['./resources-list.component.css']
})
export class ResourcesListComponent {
  pdfs = [
    {
      name: 'Colorear Animales',
      url: '/assets/pdf/ColorearAnimales.pdf'
    },
    {
      name: 'Colorear Plantas',
      url: '/assets/pdf/ColorearPlantas.pdf'
    },
    {
      name: 'Educativo Infantil',
      url: '/assets/pdf/EducativoInfantil.pdf'
    },
    {
      name: 'Ideas Varias',
      url: '/assets/pdf/IdeasVarias.pdf'
    }
  ];

  constructor() { }
  downloadPdf(pdf?: string) {
    if (pdf) {
      const link = document.createElement('a');
      link.setAttribute('target', '_blank');
      link.setAttribute('href', pdf);
      link.setAttribute('download', pdf.split('/').pop() || '');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}
