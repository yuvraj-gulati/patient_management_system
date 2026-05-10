import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule } from './patient-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

import { SharedModule } from '../shared/shared.module';
import { BarChartComponent } from './charts/bar-chart/bar-chart.component';
import { PieChartComponent } from './charts/pie-chart/pie-chart.component';
import { LineChartComponent } from './charts/line-chart/line-chart.component';
import { DoughnutChartComponent } from './charts/doughnut-chart/doughnut-chart.component';
import { HttpClientModule } from '@angular/common/http';





@NgModule({
  declarations: [
    DashboardComponent,
    BarChartComponent,
    PieChartComponent,
    LineChartComponent,
    DoughnutChartComponent,
  ],
  imports: [
    CommonModule,
    PatientRoutingModule,
    SharedModule,
    HttpClientModule
  ]
})
export class PatientModule { }
