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
import { Score } from '../dto/score.response';
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


  ranking = [];
  public dataSource = new MatTableDataSource<DadosMapa>(this.ranking);
  

  public score = true;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSelect) select: MatPaginator;

  indicadores : Indicador[];

  municipios : Municipio[];

  indicadorSelecionado = 24;
  anoSelecionado = 2020;

  indsel = 24;

  atualizarMapa() {

    if (this.indicadorSelecionado != null && this.anoSelecionado != null) {
        console.log(this.indicadorSelecionado, this.ano_selecionado);

        if(this.indicadorSelecionado != 24) {
          this.indsel = this.indicadorSelecionado;
          this.score = false;

          this.ivService.obterDadosMapa(this.indicadorSelecionado, this.anoSelecionado).subscribe(result => {

            this.ranking = result
            this.dataSource = new MatTableDataSource<DadosMapa>(result);
            this.dataSource.paginator = this.paginator;
          });
    
        } else {
          this.indsel = this.indicadorSelecionado;  
          this.score = true;
          this.ivService.obterScore(this.anoSelecionado).subscribe(result => {
            this.ranking = result
            this.dataSourceScore = new MatTableDataSource<Score>(result);
            this.dataSourceScore.paginator = this.paginator;
          });
        }
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

  public dataSourceScore = new MatTableDataSource<Score>([]);



  ngOnInit(): void {

    this.iService.obterListaIndicadoresMapa().subscribe(result => this.indicadores = result);
    this.dataSource.paginator = this.paginator;
    this.titleService.setTitle( 'Mapa da Violência do Estado de São Paulo' );

    this.service.obterMunicipios().subscribe(result => {
      console.log(result);
      this.municipios = result
    });

    this.ivService.obterScore(this.anoSelecionado).subscribe(result => {
      this.ranking = result
      this.dataSourceScore = new MatTableDataSource<Score>(result);
      this.dataSourceScore.paginator = this.paginator;
    });

  }

  doFilter(e) {
    console.log(e);
  }

   ngAfterViewInit() {
        this.dataSource.paginator = this.paginator
    }

displayedColumns: string[] = ['pos', 'municipio', 'valor', 'quantidade'];
displayedColumnsScore: string[] = ['pos', 'municipio', 'score'];

  element = {crime1:"ROUBO", crime1Qnt: 10}
  anos = ["2017","2018","2019","2020"]
}
