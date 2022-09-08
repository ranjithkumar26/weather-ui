/*-----Angular Imports----- */
import { Component, OnDestroy } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

/* ---Other Vendor Imports ---*/
import { interval, Subscription, take } from 'rxjs';

/* --- Shared Services --- */
import { WeatherService } from '../weather-service.service';

/* --- Constants ---*/
import { INTERVAL_TIMEOUT } from '../../environments/environment'

@Component({
  selector: 'app-weather-form',
  templateUrl: './weather-form.component.html',
  styleUrls: ['./weather-form.component.scss'],
})
export class WeatherFormComponent implements OnDestroy{

  weatherRequestForm: FormGroup;
  subscription: Subscription[] = [];
  errorMessage:string;
  apiCounter: number;
  checksub: boolean;
  isError: boolean;
  disableSubmit: boolean;
  smsError: boolean;
  cityError: boolean;

  constructor(private fb: FormBuilder, private weatherService: WeatherService) {
    this.weatherRequestForm = this.fb.group({
      city: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
    });
    this.checksub = false;
    this.isError = false;
    this.smsError = false;
    this.cityError = false;
    this.disableSubmit = false;
    this.weatherRequestForm.valueChanges.subscribe(()=>{
      this.disableSubmit = false;
    })
    this.errorMessage = '';
    this.apiCounter = 0
  }

  
  onSubmit() {
    this.disableSubmit = true;
    this.apiCounter++;  //counter variable to track the API calls
    if (this.weatherRequestForm.invalid) {
      this.isError = true;
      this.errorMessage = 'Please fill the required data';
      return;
    } else {
      const city = this.weatherRequestForm.value.city;
      const phoneNumber = this.weatherRequestForm.value.phoneNumber;

      /* --- API call to fetch weather data --- */
      const weatherSub = this.weatherService
        .getWeatherData(city, phoneNumber)
        .subscribe({
          next:(res) =>{
            this.isError = false
            this.disableSubmit = false;
            this.weatherService.updateChartData(res);
            // Checking for the counter to be 1 or 11 or 21 ... so on
            if ((this.apiCounter % 10) === 1) {
              this.checksub = true;
              this.callFunc();
            }
        },
        error:(err) => {
          this.isError = true;
          this.errorMessage = err?.error?.message;
          if(this.errorMessage.split('-')[0] === 'Unable to Send SMS '){
            this.smsError = true;
          } else {
            this.cityError = true;
          }
          this.disableSubmit = false;
        }});
      this.subscription.push(weatherSub);
    }
  }

  /* --- To clear the text fields --- */
  clearField(fieldName: string) {
    this.isError = false;
    if(fieldName === "city") {
      this.cityError = false;
      this.weatherRequestForm.controls['city'].setValue("");
    } else if (fieldName === "phoneNumber") {
      this.smsError = false;
      this.weatherRequestForm.controls['phoneNumber'].setValue("");
    }
  }

  /* --- To call the API for an interval of 1 min. --- */
  callFunc() {
    interval(INTERVAL_TIMEOUT)
      .pipe(take(9))
      .subscribe({next: (e) => {
        this.onSubmit();
      }
    });
  }

  ngOnDestroy() {
    this.subscription.map((e) => {
      e.unsubscribe();
    });
  }
}
