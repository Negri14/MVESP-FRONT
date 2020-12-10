import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent, DialogCinco, DialogDemografia, DialogDois, DialogExtra, DialogQuatro, DialogSeis, DialogTres, DialogUm } from './dashboard/dashboard.component';
import {MatSelectModule} from '@angular/material/select';
import { MapComponent } from './map/map.component';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table'  
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ChartComponent } from './chart/chart.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MatSortModule } from '@angular/material/sort';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatDialogModule, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from  '@angular/material/dialog';
import { ScoreComponent } from './score/score.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    MapComponent,
    HomeComponent,
    ChartComponent,
    DialogDemografia,
    DialogDemografia,
    DialogUm,
    DialogDois,
    DialogTres,
    DialogQuatro,
    DialogCinco,
    DialogSeis,
    DialogExtra,
    ScoreComponent
    ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MatSelectModule,
    NgbModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatSortModule,
    NgxMatSelectSearchModule,
    MatDialogModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    MDBBootstrapModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
