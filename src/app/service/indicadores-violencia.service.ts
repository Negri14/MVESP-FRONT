import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DadosMapa } from '../dto/dados_mapa.response';
import {HttpParams} from "@angular/common/http";
import { IndicadorViolencia } from '../dto/indicador_violencia.response';
import { IndicadoresMunicipio } from '../dto/indicadores_municipio';

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
    console.log(params);
    return this.http.get<Array<IndicadorViolencia>>("https://mvesp.herokuapp.com/indicadorGrafico", { params, headers:headers }); 

  }


  obterIndicadoresMunicipio(codigoMunicipio: string) {
    let params = new HttpParams()
    .append('codigoMunicipio', codigoMunicipio)
    let headers = new HttpHeaders();
    console.log(params);
    return this.http.get<Array<IndicadoresMunicipio>>("https://mvesp.herokuapp.com/listaIndicadoresMunicipio", { params, headers:headers }); 

  }

}

