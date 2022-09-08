/*-----Angular Imports----- */
import { Component, OnInit } from '@angular/core';

/* ---Other Vendor Imports ---*/
import { ChartOptions } from 'chart.js';
import * as moment from 'moment';
import { Color } from 'ng2-charts';

/* --- Shared Services --- */
import { WeatherService } from '../weather-service.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss'],
})
export class LineChartComponent implements OnInit {
  
  public lineChartOptions: ChartOptions = new Object()
  public lineChartLabels: string[] = [];
  public lineChartLegend: boolean;
  public lineData: number[] = [];
  public lineChartData: any[] = [];
  public lineChartColors: Color[];

  constructor(private weatherService: WeatherService) {
    /* --- Setting up basic line chart configurations --- */
    this.lineChartOptions = {
      responsive: true,
      animation: {
        duration: 0,
      },
      tooltips: {
        callbacks: {
          label: (Item: any) =>
            Item.label + ' - ' + Number(Item.value).toFixed(2) + ' C',
        },
      },
      legend: { display: false },
      scales: {
        xAxes: [
          {
            gridLines: {
              color: 'rgba(0, 0, 0, 0)',
            },
          },
        ],
      },
    };
    this.lineChartLegend = true;
    this.lineChartColors = [
      {
        borderColor: '#65A0BA',
        backgroundColor: '#FFF0',
      },
    ]
  }

  /* --- To set the fetched weather data to chart configurations --- */
  ngOnInit(): void {
    this.weatherService.chartData.subscribe((weatherData: any) => {
      let date = moment(weatherData?.smsResult?.createdAt).format('hh:mm');
      this.lineChartLabels.push(date);
      this.lineData.push(weatherData?.temperature);
      this.lineChartData = [
        {
          data: this.lineData,
          label: weatherData?.weatherInfo?.name + ' Temprature',
          pointBackgroundColor: '#65A0BA',
        },
      ];
    });
  }
}
