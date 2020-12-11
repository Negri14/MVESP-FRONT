import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { IndicadorViolencia } from '../dto/indicador_violencia.response';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ChartComponent implements OnInit {
  options: any;
  constructor() {}

  ngOnInit(): void {
  }

  @Input()
  arrayIV: IndicadorViolencia[];

  mapaEixoX = {2020: ['jan/2020','fev/2020','marco/2020','abril/2020','maio/2020','jun/2020','jul/2020','ago/2020'],
               2019: ['jan/2019','fev/2019','marco/2019','abril/2019','maio/2019','jun/2019','jul/2019','ago/2019','set/2019','out/2019', 'nov/2019', 'dez/2019'],
               2018: ['jan/2018','fev/2018','marco/2018','abril/2018','maio/2018','jun/2018','jul/2018','ago/2018','set/2018','out/2018', 'nov/2018', 'dez/2018'],
               2017: ['jan/2017','fev/2017','marco/2017','abril/2017','maio/2017','jun/2017','jul/2017','ago/2017','set/2017','out/2017', 'nov/2017', 'dez/2017'],
               2016: ['jan/2016','fev/2016','marco/2016','abril/2016','maio/2016','jun/2016','jul/2016','ago/2016','set/2016','out/2016', 'nov/2016', 'dez/2016'],
               2015: ['jan/2015','fev/2015','marco/2015','abril/2015','maio/2015','jun/2015','jul/2015','ago/2015','set/2015','out/2015', 'nov/2015', 'dez/2015']};

  valoresX = [];
  valoresY = [];

  ngOnChanges() {
    console.log('Alteracao');
    this.definirEixoX();
  }

  public definirEixoX() {

    this.valoresX = [];
    this.valoresY = [];
    
    console.log('definindo:',this.arrayIV);

    this.arrayIV.forEach(indicador => {
      
      this.valoresX = this.valoresX.concat(this.mapaEixoX[indicador.ano]);

      if (indicador.ano != 2020) {
        this.valoresY = this.valoresY.concat([indicador.janeiro, indicador.fevereiro, indicador.marco, indicador.abril, indicador.maio, indicador.junho, indicador.julho, indicador.agosto, indicador.setembro, indicador.outubro, indicador.novembro, indicador.dezembro]);
      } else {
        this.valoresY = this.valoresY.concat([indicador.janeiro, indicador.fevereiro, indicador.marco, indicador.abril, indicador.maio, indicador.junho, indicador.julho, indicador.agosto]);
      }

    });

    this.chartDatasets = [ { data: this.valoresY, label: 'Número de Ocorrências' }];
    this.chartLabels = this.valoresX;

    
  }



  public chartType: string = 'line';

  public chartDatasets: Array<any>;

  public chartLabels: Array<any>;

  public chartColors: Array<any> = [
    
    {
      fill:false,
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 4,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true,
    scales: {
      xAxes:[{
        offset: true
      }],
      yAxes: [{
        offset: true,
        ticks: {
        }
      }]
    }

  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
}
