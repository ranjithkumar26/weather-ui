import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherFormComponent } from './weather-form/weather-form.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { HttpClientModule } from  '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { TableViewComponent } from './table-view/table-view.component';
@NgModule({
  declarations: [
    AppComponent,
    WeatherFormComponent,
    LineChartComponent,
    TableViewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
