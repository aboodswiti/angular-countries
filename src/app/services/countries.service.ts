import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  ALL_COUNTRIES_URL = 'https://restcountries.eu/rest/v2/all';
  COUNTRY_DETAILS_URL = 'https://restcountries.eu/rest/v2/alpha/';
  constructor(private http: HttpClient) {}

  getCountries():Observable<any>  {
    return this.http.get(this.ALL_COUNTRIES_URL);
  }

  getCountryDetails(code: string | null): Observable<any> {
    return this.http
      .get(this.COUNTRY_DETAILS_URL + code)
      .pipe(catchError(this.handleError));
  }

  handleError(error: any) {
    return throwError(error.message || ' Page Not Found');
  }
}
