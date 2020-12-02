import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { DadosMapa } from '../dto/dados_mapa.response';

@Component({
  selector: 'app-map',
  templateUrl: './map.svg',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }
  
  @Input()
  public ranking : DadosMapa[] = [];



  colors = ['#DC143C', '#FFA07A',  '#F08080'];

  posicao;
  nomeMunicipio = '';
  valor;


  ngOnChanges() {

    var precision = 0.001;


    if (this.ranking.length == 0) {
      var list = document.getElementsByClassName("st2");

      for (var i = 0; i < list.length; i++) {
        document.getElementById(list[i].id).setAttribute('fill', '#B0B0B0')
      }
  
    }

    this.ranking.forEach(x => {
      let valor = x.por100Mil;
      let color = '#9b9b9';

      if (valor == 0) {
        color = '#ead3d7';
      } else if (valor > 0.000 &&  Math.floor(valor) <= 10) {
        color = '#cc6674';
      } else if (valor > 11.000 && Math.floor(valor) <= 100) {
        color = '#993341';
      } else if (valor > 101.000 && Math.floor(valor) <= 1000) {
        color = '#66000e';
      } else {
        console.log('!!!!!!!!!!!',valor)
        color = '#000000';
      }

      console.log(color);
      var e = document.getElementById(x.codigo).setAttribute('fill', color);

    });
  }



  ngOnInit(): void {
  }

  last = 0;

  mostra(e) {
    console.log('x_x',e.path[0].id)
    this.last = e.path[0].id;
    let index = this.ranking.findIndex(x => x.codigo === e.path[0].id);
    if (this.last == e.path[0].id) {
      this.posicao = this.ranking[index].ranking;
      this.nomeMunicipio = this.ranking[index].nome;
      this.valor = this.ranking[index].por100Mil;  
    }

  }

}
