import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { CountriesComponent } from './countries.component';
import { CountriesService } from '../services/countries.service';

describe('CountriesComponent', () => {
  let component: CountriesComponent;
  let fixture: ComponentFixture<CountriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientModule],

      declarations: [CountriesComponent],
      providers: [HttpClient, CountriesService],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(CountriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should Countries Component create', () => {
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

  it('should show a loading spinner when isLoading = true on CountriesComponent', () => {
    component.isLoading = true;
    fixture.detectChanges();

    const spinner: HTMLUListElement = fixture.nativeElement.querySelector(
      '.spinner-border'
    );
    expect(spinner.isConnected).toBeTruthy();
  });

  it('should show "Filter By Region" default value on select', () => {
    fixture.detectChanges();

    expect(component.selectedRegion).toBe('Filter By Region');
  });
});
