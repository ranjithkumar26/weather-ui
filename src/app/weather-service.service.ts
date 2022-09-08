import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { APIs } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  
  chartData:BehaviorSubject<any> = new BehaviorSubject<any>([])
  
  constructor(private http: HttpClient) { }
  
  /* --- Api call to fetch weather data. --- */
  getWeatherData(city: string, phoneNumber: number): Observable<any> {
    return this.http.get(`${APIs?.weatherData}?city=${city}&phoneNumber=${phoneNumber}`)
  }

  updateChartData(data: any) {
    this.chartData.next(data);
  }
}
