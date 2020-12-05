import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DadosMapa } from '../dto/dados_mapa.response';
import { Indicador } from '../dto/indicador.response';
import { IndicadoresMunicipio } from '../dto/indicadores_municipio';
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
  anos = [2015,2016,2017,2018,2019,2020]
  @ViewChild(MatSort, { static: false }) sort:MatSort;

  indicadores : Indicador[];

  indicador_selecionado = 'SCORE DE VIOLÊNCIA'
  ano_selecionado = 2020;


  ano_inicio = 2020;
  ano_fim = 2020;
  id_indicador = 20;

  indicador_txt = "";

  ano_inicio_txt = 2020;
  ano_fim_txt = 2020;


  alterarAnoInicio(e) {
    this.ano_inicio = e;
  }

  alterarAnoFim(e) {
    this.ano_fim = e;
  }

  alterarIndicador(e) {
    this.id_indicador = e;
  }

  public dadosGrafico : IndicadorViolencia[];

  dadosDemograficos : IndicadorDemografia;
  displayedColumns: string[] = ['pos', 'municipio', 'valor', 'quantidade', 'janeiro'];
  
  @ViewChild(MatPaginator,  {static: false}) paginator: MatPaginator;

  dm : DadosMapa;


  public buscarDadosMapa() {

    let i = this.indicadores.filter(x=> x.id == this.id_indicador);
    this.indicador_txt = i[0].indicador_formatado;
    this.ano_inicio_txt = this.ano_inicio;
    this.ano_fim_txt = this.ano_fim;

    this.indicadoresViolenciaService.obterIndicadoresGrafico(this.codigoMunicipio,this.id_indicador,this.ano_inicio,this.ano_fim).subscribe( x=> {
      this.dadosGrafico = x;
    });


  }

  public dataSource = new MatTableDataSource<IndicadoresMunicipio>();
   doFilter(e) {
    console.log(e);
  }
  ngOnInit(): void {


    this.dataSource.paginator = this.paginator

    this.indicadoresViolenciaService.obterIndicadoresMunicipio(this.codigoMunicipio).subscribe( result => {
      this.dataSource = new MatTableDataSource<IndicadoresMunicipio>(result);

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator


    });
    this.demografiaService.indicadorDemografia(this.codigoMunicipio).subscribe(result => {
      this.dadosDemograficos = result[0];
      console.log(result);
    });

    this.indicadoresService.obterListaIndicadores().subscribe(x => {
      this.indicadores = x;
    });

    this.indicadoresViolenciaService.obterIndicadoresGrafico(this.codigoMunicipio,20,2020,2020).subscribe( x=> {
      this.dadosGrafico = x;
    });

    this.indicador_txt = 'Roubo de Veículo';


  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    let i = this.indicadores.filter(x=> x.id == 20);
    this.indicador_txt = i[0].indicador_formatado;

  }

  element = {crime1:"ROUBO", crime1Qnt: 10}

}
