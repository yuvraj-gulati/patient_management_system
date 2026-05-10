import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChartDataServiceService {

  constructor(private http: HttpClient) {}


  getBarChartData(): Observable<any> {
    return this.http.get<any>('app/patient/charts/json/bar.json');
  }

  getLineChartData(): Observable<any> {
    return this.http.get<any>('app/patient/charts/json/line.json');
  }

  getPieChartData(): Observable<any> {
    return this.http.get<any>('app/patient/charts/json/pie.json');
  }

  getDoughnutChartData(): Observable<any> {
    return this.http.get<any>('app/patient/charts/json/doughnut.json');
  }

}
