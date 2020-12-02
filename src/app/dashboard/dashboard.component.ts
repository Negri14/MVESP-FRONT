import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IndicadorDemografia } from '../dto/indicador_demografia.response';
import { IndicadoresDemografiaService } from '../service/indicadores-demografia.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private demografiaService: IndicadoresDemografiaService) { this.codigoMunicipio = this.router.getCurrentNavigation().extras.state.codigoMunicipio }

  codigoMunicipio = '';
  anos = ["2015","2016","2017","2018","2019","2020"]

  dadosDemograficos : IndicadorDemografia;

  ngOnInit(): void {
    this.demografiaService.indicadorDemografia(this.codigoMunicipio).subscribe(result => {
      this.dadosDemograficos = result[0];
      console.log(result);
    });
  }

  element = {crime1:"ROUBO", crime1Qnt: 10}

}
