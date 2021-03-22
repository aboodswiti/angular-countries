import { CountriesService } from './countries.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { HttpErrorResponse} from '@angular/common/http'
const dummyData= [{
  
  "name": "Afghanistan",

  "alpha2Code": "AF",
  "alpha3Code": "AFG",

  "capital": "Kabul",
 
  "region": "Asia",

  "borders": [
    "IRN",
    "PAK",
    "TKM",
    "UZB",
    "TJK",
    "CHN"
  ],
  "nativeName": "افغانستان",
  
}] 

describe('CountriesService', () => {
  let service: CountriesService;
  let httpMock : HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers:[CountriesService]
    });
    service = TestBed.get(CountriesService);
    httpMock = TestBed.get(HttpTestingController);
  });
afterEach(() => {
  httpMock.verify();
})
  it('should retrieve all countries from Api Via GET', () => {

  service.getCountries().subscribe((countries:any) => {
    expect(countries).toEqual(dummyData);
    expect(countries.length).toBe(1);
  })
  const request = httpMock.expectOne(service.ALL_COUNTRIES_URL);

  expect(request.request.method).toBe('GET');
    // Respond with mock Data

  request.flush(dummyData)
 });

 it('should retrieve country Details from Api Via GET', () => {

  service.getCountryDetails('AFG').subscribe((countries:any) => {
    expect(countries).toEqual(dummyData);
    expect(countries.length).toBe(1);
  })
  const request = httpMock.expectOne(`${service.COUNTRY_DETAILS_URL}AFG`);

  expect(request.request.method).toBe('GET');
      // Respond with mock Data

  request.flush(dummyData)
 });

 it('can test for 404 error', () => {
  const emsg = 'deliberate 404 error';

  service.getCountries().subscribe(
    data => fail('should have failed with the 404 error'),
    (error: HttpErrorResponse) => {
      expect(error.status).toEqual(404, 'status');
      expect(error.error).toEqual(emsg, 'message');
    }
  );

  const request = httpMock.expectOne(service.ALL_COUNTRIES_URL);

  // Respond with mock error
  request.flush(emsg, { status: 404, statusText: 'Not Found' });
});

});
