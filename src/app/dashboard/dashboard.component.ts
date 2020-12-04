import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DadosMapa } from '../dto/dados_mapa.response';
import { Indicador } from '../dto/indicador.response';
import { IndicadorDemografia } from '../dto/indicador_demografia.response';
import { IndicadorViolencia } from '../dto/indicador_violencia.response';
import { IndicadorService } from '../service/indicador.service';
import { IndicadoresDemografiaService } from '../service/indicadores-demografia.service';
import { IndicadoresViolenciaService } from '../service/indicadores-violencia.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})


export class DashboardComponent implements OnInit {

  constructor(private router: Router, private demografiaService: IndicadoresDemografiaService, private indicadoresViolenciaService: IndicadoresViolenciaService, private indicadoresService: IndicadorService) { this.codigoMunicipio = this.router.getCurrentNavigation().extras.state.codigoMunicipio }

  codigoMunicipio = '';
  anos = ["2015","2016","2017","2018","2019","2020"]

  indicadores : Indicador[];

  indicador_selecionado = 'SCORE DE VIOLÊNCIA'
  ano_selecionado = 2020;

  public dadosGrafico : IndicadorViolencia[];

  dadosDemograficos : IndicadorDemografia;
  displayedColumns: string[] = ['pos', 'municipio', 'valor', 'quantidade', 'janeiro'];
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  dm : DadosMapa;

  public dataSource = new MatTableDataSource<DadosMapa>([]);
   doFilter(e) {
    console.log(e);
  }
  ngOnInit(): void {
    this.dm = new DadosMapa();
    this.dm.total = 500000;
    this.dataSource = new MatTableDataSource<DadosMapa>([this.dm]);

    this.demografiaService.indicadorDemografia(this.codigoMunicipio).subscribe(result => {
      this.dadosDemograficos = result[0];
      console.log(result);
    });

    this.indicadoresService.obterListaIndicadores().subscribe(x => {
      this.indicadores = x;
    });

    this.indicadoresViolenciaService.obterIndicadoresGrafico('3550308',1,2015,2020).subscribe( x=> {
      this.dadosGrafico = x;
    });

  }

  element = {crime1:"ROUBO", crime1Qnt: 10}

}
