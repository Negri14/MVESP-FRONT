import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DadosMapa } from '../dto/dados_mapa.response';
import {HttpParams} from "@angular/common/http";

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

}

