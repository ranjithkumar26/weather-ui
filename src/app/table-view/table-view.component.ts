/*-----Angular Imports----- */
import { Component, OnInit } from '@angular/core';

/* --- Shared Services --- */
import { WeatherService } from '../weather-service.service';

@Component({
  selector: 'app-table-view',
  templateUrl: './table-view.component.html',
  styleUrls: ['./table-view.component.scss']
})
export class TableViewComponent implements OnInit {

  data:any[];
  
  constructor( private weatherService:WeatherService) {
    this.data = [];
  }

  ngOnInit(): void {
    /* Getting table data */
    this.weatherService.chartData.subscribe({
      next: (res: any) => {
        if(res) {
          this.data.push(res)
        }
        
      }
    })
  }

}
