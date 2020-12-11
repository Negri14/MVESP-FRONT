import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DadosMapa } from '../dto/dados_mapa.response';
import {HttpParams} from "@angular/common/http";
import { IndicadorViolencia } from '../dto/indicador_violencia.response';
import { IndicadoresMunicipio } from '../dto/indicadores_municipio';
import { Score } from '../dto/score.response';
import { IndicadorPrincipal } from '../dto/dados-principais.response';

@Injectable({
  providedIn: 'root'
})
export class IndicadoresViolenciaService {

  constructor(private http: HttpClient) { }

  obterDadosMapa(indicador: number, ano:number) {

 
    let params = new HttpParams()
    .append('indicador', indicador.toString())
    .append('ano', ano.toString());

    let headers = new HttpHeaders();
    console.log(params);
    return this.http.get<Array<DadosMapa>>("https://mvesp.herokuapp.com/indicadorMapa", { params, headers:headers });


  }

  obterIndicadoresGrafico(codigoMunicipio: string, indicador:number, anoInicial:number, anoFinal:number) {

    let params = new HttpParams()
    .append('codigoMunicipio', codigoMunicipio)
    .append('codigoIndicador', indicador.toString())
    .append('anoInicial', anoInicial.toString())
    .append('anoFinal', anoFinal.toString());

    let headers = new HttpHeaders();
    return this.http.get<Array<IndicadorViolencia>>("https://mvesp.herokuapp.com/indicadorGrafico", { params, headers:headers }); 

  }


  obterIndicadoresMunicipio(codigoMunicipio: string) {
    let params = new HttpParams()
    .append('codigoMunicipio', codigoMunicipio)
    let headers = new HttpHeaders();
    return this.http.get<Array<IndicadoresMunicipio>>("https://mvesp.herokuapp.com/listaIndicadoresMunicipio", { params, headers:headers }); 

  }

  obterScore(ano: number) {
    let params = new HttpParams()
    .append('ano', ano.toString())
    let headers = new HttpHeaders();
    return this.http.get<Array<Score>>("https://mvesp.herokuapp.com/listaScore", { params, headers:headers }); 

  }

  obterPrincipais(codigoMunicipio: string) {
    let params = new HttpParams()
    .append('codigoMunicipio', codigoMunicipio)
    let headers = new HttpHeaders();
    return this.http.get<Array<IndicadorPrincipal>>("https://mvesp.herokuapp.com/principais", { params, headers:headers }); 

  }

  obterCSV(codigoMunicipio: string) {
    let params = new HttpParams()
    .append('codigoMunicipio', codigoMunicipio)
    let headers = new HttpHeaders();
    return this.http.get<Array<Score>>("https://mvesp.herokuapp.com/csv", { params, headers:headers }); 
  }

  obterDadosCompletos(codigoMunicipio: string) {
    let params = new HttpParams()
    .append('codigoMunicipio', codigoMunicipio)
    let headers = new HttpHeaders();
    return this.http.get<Array<IndicadoresMunicipio>>("https://mvesp.herokuapp.com/listaIndicadoresMunicipio", { params, headers:headers }); 

  }

  downloadFile(municipio, codigoMunicipio: string) {
    let filename = `${municipio}_Indicadores_Violencia`
    let data = [];
    this.obterCSV(codigoMunicipio).subscribe(result=>{
      data = result
      let csvData = this.ConvertToCSV(data, ['codigo','nome', 'ano', 'indicador', 'indicador_Formatado', 'janeiro', 'fevereiro', 'marco','abril','maio','junho','julho','agosto','setembro','outubro','novembro','dezembro','total','por100Mil', 'ranking']);
      console.log(csvData)
      let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
      let dwldLink = document.createElement("a");
      let url = URL.createObjectURL(blob);
      let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
      if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
          dwldLink.setAttribute("target", "_blank");
      }
      dwldLink.setAttribute("href", url);
      dwldLink.setAttribute("download", filename + ".csv");
      dwldLink.style.visibility = "hidden";
      document.body.appendChild(dwldLink);
      dwldLink.click();
      document.body.removeChild(dwldLink);
      });
}

  ConvertToCSV(objArray, headerList) {
    let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    let str = '';
    let row ='';

    for (let index in headerList) {
        row += headerList[index] + ';';
    }
    row = row.slice(0, -1);
    str += row + '\r\n';
    for (let i = 0; i < array.length; i++) {
        let line = '';
        for (let index in headerList) {
           let head = headerList[index];

            line += array[i][head]+';';
        }
        line = line.slice(0, -1);

        str += line + '\r\n';
    }
    return str;
}
}

