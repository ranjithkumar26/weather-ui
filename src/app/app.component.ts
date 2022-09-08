import { Component } from '@angular/core';
import { WeatherService } from './weather-service.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  chartData: boolean;

  constructor(public weatherService: WeatherService) {
    
    this.chartData = false
    /* --- To enable chart view after API response --- */
    this.weatherService.chartData.subscribe({
      next: (res:any) => {
        this.chartData = (res === undefined || res.length === 0) ? false : true;
      }
    })

  }
}
