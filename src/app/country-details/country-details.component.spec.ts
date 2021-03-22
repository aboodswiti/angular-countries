import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { CountriesService } from '../services/countries.service';
import { CountryDetailsComponent } from './country-details.component';

describe('CountryDetailsComponent', () => {
  let component: CountryDetailsComponent;
  let fixture: ComponentFixture<CountryDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],

      declarations: [CountryDetailsComponent],
      providers: [HttpClient, CountriesService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should CountryDetails Component create', () => {
    expect(component).toBeTruthy();
  });

  it('should use the getCountries from the services', () => {
    const countriesService = fixture.debugElement.injector.get(
      CountriesService
    );
    fixture.detectChanges();
    expect(countriesService.getCountries).toEqual(
      component.countriesService.getCountries
    );
  });
  it('should use the getCountryDetails from the services', () => {
    const countriesService = fixture.debugElement.injector.get(
      CountriesService
    );
    fixture.detectChanges();
    expect(countriesService.getCountryDetails).toEqual(
      component.countriesService.getCountryDetails
    );
  });
  it('should show a loading spinner when isLoading = true on CountryDetails Component', () => {
    component.isLoading = true;
    fixture.detectChanges();

    const spinner: HTMLUListElement = fixture.nativeElement.querySelector(
      '.spinner-border'
    );
    expect(spinner.isConnected).toBeTruthy();
  });

  it('should toggle show Borders boolean when onClick Borders function execute ', () => {
    component.onClickBorders();
    expect(component.showBorders).toBeTruthy();
    component.onClickBorders();
    expect(component.showBorders).toBeFalsy();
  });
});
