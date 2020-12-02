import { Component, OnInit, ViewEncapsulation } from '@angular/core';

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
  public chartType: string = 'line';

  public chartDatasets: Array<any> = [
    { data: [1,1,1,0,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]}
    ];

  public chartLabels: Array<any> = ['jan/2020', 'fev/2020', 'March 20', 'April 20', 'May 20', 'June 20', 'July 20', 'August 20', 'September 20', 'October 20', 'November 20', 'December 20'] ;

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
          max: 2,
          min: 0,
          stepSize: 1
        }
      }]
    }

  };
  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }
}
