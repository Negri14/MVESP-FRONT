import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IndicadorPrincipal } from '../dto/dados-principais.response';
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

  constructor
  (
    private router: Router, 
    private demografiaService: IndicadoresDemografiaService, 
    private indicadoresViolenciaService: IndicadoresViolenciaService, 
    private indicadoresService: IndicadorService,
    public dialog: MatDialog
    ) { this.codigoMunicipio = this.router.getCurrentNavigation().extras.state.codigoMunicipio }

  codigoMunicipio = '';
  anos = [2015,2016,2017,2018,2019,2020]
  @ViewChild(MatSort, { static: false }) sort:MatSort;

  indicadores : Indicador[];

  indicador_selecionado = 'SCORE DE VIOLÊNCIA'
  ano_selecionado = 2020;
  
  irParaScore(): void {
    this.router.navigateByUrl('score');
}


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

  downloadCSV() {
    this.indicadoresViolenciaService.downloadFile(this.dadosDemograficos.nome, this.codigoMunicipio);
  }

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

  indicadorPrincipal: IndicadorPrincipal[];
  
  ngOnInit(): void {


    this.dataSource.paginator = this.paginator

    this.indicadoresViolenciaService.obterIndicadoresMunicipio(this.codigoMunicipio).subscribe( result => {
      this.dataSource = new MatTableDataSource<IndicadoresMunicipio>(result);

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator


    });

    this.indicadoresViolenciaService.obterPrincipais(this.codigoMunicipio).subscribe(result=>{
      this.indicadorPrincipal = result;
      console.log(this.indicadorPrincipal);
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

  abrirDialogDemografia() {
    const dialogDemografia = this.dialog.open(DialogDemografia);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    let i = this.indicadores.filter(x=> x.id == 20);
    this.indicador_txt = i[0].indicador_formatado;

  }

  abrirDica(id: number) {

    console.log(id);

    if ([16,5,21].includes(id)) {
      const dialogDemografia = this.dialog.open(DialogUm);

    } else if ([4,13,15,11,20].includes(id)) {
      const dialogDemografia = this.dialog.open(DialogDois);

    } else if ([7].includes(id)) {
      const dialogDemografia = this.dialog.open(DialogTres);

    } else if ([8,23,22].includes(id)) {
      const dialogDemografia = this.dialog.open(DialogQuatro);

    } else if ([3,19,14].includes(id)) {
      const dialogDemografia = this.dialog.open(DialogCinco);

    } else if ( [6].includes(id)) {
      const dialogDemografia = this.dialog.open(DialogSeis);

    }   else {
      const dialogDemografia = this.dialog.open(DialogExtra);
    }


  }

  element = {crime1:"ROUBO", crime1Qnt: 10}

}
@Component({
  selector: 'dialog-demografia',
  templateUrl: 'dialog-demografia.html',
})
export class DialogDemografia {}


@Component({
  selector: 'dialog-dica-um',
  templateUrl: 'dialog-dica-um.html',
})
export class DialogUm {}

@Component({
  selector: 'dialog-dica-dois',
  templateUrl: 'dialog-dica-dois.html',
})
export class DialogDois {}

@Component({
  selector: 'dialog-dica-tres',
  templateUrl: 'dialog-dica-tres.html',
})
export class DialogTres {}

@Component({
  selector: 'dialog-dica-quatro',
  templateUrl: 'dialog-dica-quatro.html',
})
export class DialogQuatro {}

@Component({
  selector: 'dialog-dica-cinco',
  templateUrl: 'dialog-dica-cinco.html',
})
export class DialogCinco {}

@Component({
  selector: 'dialog-dica-seis',
  templateUrl: 'dialog-dica-seis.html',
})
export class DialogSeis {}

@Component({
  selector: 'dialog-extra',
  templateUrl: 'dialog-extra.html',
})
export class DialogExtra {}




