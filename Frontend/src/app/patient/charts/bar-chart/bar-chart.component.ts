import { Component, OnInit } from '@angular/core';
import {
  Chart,
  ChartConfiguration,
  ChartItem,
  registerables,
} from 'node_modules/chart.js';
// import * as barData from '../json/bar.json';
import { ChartDataServiceService } from '../service/chart-data-service.service';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
})
export class BarChartComponent implements OnInit {
  barData :any;

  constructor(private chartDataService : ChartDataServiceService){}

  ngOnInit(): void {
    this.chartDataService.getBarChartData().subscribe(data => {
      this.barData = data;
      this.createChart();
    });
  }


  createChart(): void {
    Chart.register(...registerables);
  
  
    const config: ChartConfiguration = {
      type: 'bar',
      data: this.barData.data,
      options: this.barData.options
    };
  
    const chartItem: ChartItem = document.getElementById('bar-chart') as ChartItem;
  
    new Chart(chartItem, config);
  }


}

