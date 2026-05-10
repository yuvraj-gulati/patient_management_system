import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartItem, registerables } from 'chart.js';
import linechart from '../json/line.json';
import { ChartDataServiceService } from '../service/chart-data-service.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  lineChartData : any;

  constructor(private chartDataService : ChartDataServiceService){}

  ngOnInit(): void {
    this.chartDataService.getLineChartData().subscribe(data => {
      this.lineChartData = data;
      this.createChart();
    })
    
  }


  createChart(): void {
    Chart.register(...registerables);
  
  
    const config: ChartConfiguration = {
      type: this.lineChartData.type,
      data: this.lineChartData.data,
      options: this.lineChartData.options,
    };
  
    const chartItem: ChartItem = document.getElementById('line-chart') as ChartItem;
  
    new Chart(chartItem, config);
  }

}
