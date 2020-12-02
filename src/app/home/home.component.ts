import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
import { MatSelect } from '@angular/material/select';
import {MatTableDataSource} from '@angular/material/table';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DadosMapa } from '../dto/dados_mapa.response';
import { Indicador } from '../dto/indicador.response';
import { Municipio } from '../dto/municipio.response';
import { IndicadorService } from '../service/indicador.service';
import { IndicadoresViolenciaService } from '../service/indicadores-violencia.service';
import { MunicipioService } from '../service/municipio.service';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private titleService: Title, 
              private service: MunicipioService, 
              private ivService: IndicadoresViolenciaService,
              private iService: IndicadorService,
              private router: Router 
              ) { }


  ranking: DadosMapa[] = [];
  public dataSource = new MatTableDataSource<DadosMapa>(this.ranking);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSelect) select: MatPaginator;

  indicadores : Indicador[];

  municipios : Municipio[];

  indicadorSelecionado = null;
  anoSelecionado = null;

  atualizarMapa() {
    if (this.indicadorSelecionado != null && this.anoSelecionado != null) {
        this.ivService.obterDadosMapa(this.indicadorSelecionado, this.anoSelecionado).subscribe(result => {
        this.ranking = result
        this.dataSource = new MatTableDataSource<DadosMapa>(result);
        this.dataSource.paginator = this.paginator;
      });
      this.indicador_selecionado = this.is;
      this.ano_selecionado = this.as;
    }
  }

  indicador_selecionado = 'SCORE DE VIOLÊNCIA'
  ano_selecionado = 2020;

  is = '';
  as = 0;
  alterarIndicador(e) {
    let t = this.indicadores.filter(x => x.id == e);
    this.is = t[0].indicador_formatado.toUpperCase();
    this.indicadorSelecionado = e;
  }

  codigoMunicipio = '';

  definirMunicipio(e) {
    this.codigoMunicipio = e;
  }
  

  irParaHome() {
    this.router.navigate(['dashboard'], { state: {codigoMunicipio: this.codigoMunicipio}});
  }

  alterarAno(e) {
    this.as = e;
    this.anoSelecionado = e;
  }


  ngOnInit(): void {

    this.iService.obterListaIndicadoresMapa().subscribe(result => this.indicadores = result);
    this.dataSource.paginator = this.paginator;
    this.titleService.setTitle( 'Mapa da Violência do Estado de São Paulo' );
    this.service.obterMunicipios().subscribe(result => {
      console.log(result);
      this.municipios = result
    });

    this.ivService.obterDadosMapa(50, 2020).subscribe(result => {
      console.log(result);
      this.ranking = result
      this.dataSource = new MatTableDataSource<DadosMapa>(result);
      this.dataSource.paginator = this.paginator;
    });
  }

  doFilter(e) {
    console.log(e);
  }

   ngAfterViewInit() {
        this.dataSource.paginator = this.paginator
    }

displayedColumns: string[] = ['pos', 'municipio', 'valor', 'quantidade'];

  element = {crime1:"ROUBO", crime1Qnt: 10}
  anos = ["2015","2016","2017","2018","2019","2020"]
}
