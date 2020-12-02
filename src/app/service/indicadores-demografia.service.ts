import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IndicadorDemografia } from '../dto/indicador_demografia.response';

@Injectable({
  providedIn: 'root'
})
export class IndicadoresDemografiaService {
  constructor(private http: HttpClient) { }

  indicadorDemografia(codigoMunicipio: string) {

    let params = new HttpParams()
    .append('codigoMunicipio', codigoMunicipio)

    let headers = new HttpHeaders();
    console.log(params);
    return this.http.get<IndicadorDemografia>("https://mvesp.herokuapp.com/indicadorDemografia", { params, headers:headers });


  }
}