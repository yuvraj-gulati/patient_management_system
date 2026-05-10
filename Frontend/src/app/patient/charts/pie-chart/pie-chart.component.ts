import { Component, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartItem, registerables } from 'chart.js';
import { ChartDataServiceService } from '../service/chart-data-service.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css'],
})
export class PieChartComponent implements OnInit {
  pieData: any;
  constructor(private chartDataService: ChartDataServiceService) {}

  ngOnInit(): void {
    this.chartDataService.getPieChartData().subscribe((data) => {
      this.pieData = data;
      this.createChart();
    });
  }

  createChart(): void {
    Chart.register(...registerables);

    const config: ChartConfiguration = {
      type: 'pie',
      data: this.pieData,
      options: {},
    };

    const chartItem: ChartItem = document.getElementById(
      'pie-chart'
    ) as ChartItem;

    new Chart(chartItem, config);
  }
}
