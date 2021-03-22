import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../services/countries.service';
import { Continents } from '../Continent';
import { Countries } from '../models/Countries';
import { CountryDetails } from '../models/CountryDetails';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
})
export class CountriesComponent implements OnInit {
  countries: Countries[] = [];
  regions: string[] = Continents;
  selectedRegion = 'Filter By Region';
  searchName: string = '';
  filteredItems: Countries[] = [];
  isLoading: boolean = true;
  isNoResult: boolean = false;

  constructor(
    public countriesService: CountriesService,
    private titleService: Title
  ) {
    this.titleService.setTitle('Countries');
  }

  ngOnInit() {
    this.getAllCountries();
  }
  getAllCountries() {
    this.countriesService.getCountries().subscribe((allCountries: any) => {
      this.countries = allCountries;
      this.onSearchCountry();
      this.isLoading = false;
    });
  }

  onSearchCountry() {
    this.filteredItems = this.onRegionSelected(
      this.searchByValue(this.countries)
    );
    if (this.filteredItems.length == 0) this.isNoResult = true;
    else this.isNoResult = false;
  }

  searchByValue(Countries: Countries[]) {
    return Countries.filter((country: CountryDetails) => {
      if (this.searchName.trim() === '') {
        return true;
      } else {
        return (
          country.name
            .toLowerCase()
            .includes(this.searchName.trim().toLocaleLowerCase()) ||
          country.capital
            .toLowerCase()
            .includes(this.searchName.trim().toLocaleLowerCase())
        );
      }
    });
  }

  onRegionSelected(Countries: Countries[]) {
    return Countries.filter((country: CountryDetails) => {
      if (
        this.selectedRegion === 'Filter By Region' ||
        this.selectedRegion === 'All' ||
        this.selectedRegion === country.region
      )
        return true;
      else return false;
    });
  }
}
