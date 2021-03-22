import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../services/countries.service';
import { ActivatedRoute } from '@angular/router';
import { CountryDetails } from '../models/CountryDetails';
import { Countries } from '../models/Countries';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.css'],
})
export class CountryDetailsComponent implements OnInit {
  country: any;
  countries: Countries[] = [];
  borders: Countries[] = [];
  showBorders: boolean = false;
  isThereBorders: boolean = true;
  isLoading: boolean = true;
  errorMessage: string = '';
  isNoError: boolean = true;
  constructor(
    public countriesService: CountriesService,
    private route: ActivatedRoute,
    private titleService: Title,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getDetails();
  }

  getDetails() {
    this.route.paramMap.subscribe((params) => {
      this.countriesService.getCountryDetails(params.get('code')).subscribe(
        (country: CountryDetails) => {
          this.country = country;
          this.showBorders = false;
          this.isLoading = false;
          if (country.borders.length == 0) this.isThereBorders = false;
          this.getAllCountries();
          this.titleService.setTitle(country.name);
        },
        (err) => {
          this.errorMessage = err;
          this.isNoError = false;
        }
      );
    });
  }

  getAllCountries() {
    this.countriesService.getCountries().subscribe((countries: Countries[]) => {
      this.countries = countries;

      this.borders = this.countries.filter((item: any) => {
        return this.country.borders.includes(item.alpha3Code);
      });
    });
  }

  onClickBorders() {
    this.showBorders = !this.showBorders;
  }

  onClickBack(){
    this.location.back();

  }
}
