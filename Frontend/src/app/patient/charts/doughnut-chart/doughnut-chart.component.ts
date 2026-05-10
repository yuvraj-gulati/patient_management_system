import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartItem, registerables } from 'chart.js';
import doughnutchart from '../json/doughnut.json';
import { ChartDataServiceService } from '../service/chart-data-service.service';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent implements OnInit {

  doughnutChartData : any;

  constructor(private chartDataService : ChartDataServiceService){}

  ngOnInit(): void {
    this.chartDataService.getDoughnutChartData().subscribe(data => {
      this.doughnutChartData = data;
      this.createChart();
    })
    
  }


  createChart(): void {
    Chart.register(...registerables);
  
  
    const config: ChartConfiguration = {
      type: this.doughnutChartData.type,
      data: this.doughnutChartData.data,
      options: this.doughnutChartData.options,
    };
  
    const chartItem: ChartItem = document.getElementById('doughnut-chart') as ChartItem;
  
    new Chart(chartItem, config);
  }

}
