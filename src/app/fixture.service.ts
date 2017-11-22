import { Injectable } from '@angular/core';
import { Fixture } from './fixture';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FixtureService {

  private  headers = new HttpHeaders( { 'X-Auth-Token': '68b7ddc952cf4694b802b52321428dc6' } );

  constructor( private http: HttpClient) { }

  // getNextFixtures(filter: string): Fixture[] {
  //   const httpParams = new HttpParams();
  //
  //   httpParams.set( 'timeFrame', 'n7' );
  //
  //   this.http.get('http://api.football-data.org/v1/competitions/445/fixtures?' + filter,
  //     {
  //       headers: this.headers
  //       // params: httpParams
  //     }
  //   ).subscribe(data => {
  //     // this.fixtureJsonObj = data;
  //     // this.fixtureJsonArrPartOne = this.fixtureJsonObj.fixtures.splice(4, 5);
  //     // this.fixtureJsonArrPartTwo = this.fixtureJsonObj.fixtures.splice(0, 5);
  //     return data;
  //   });
  //   return null;
  // }

  getNextFixtures(filter: string): Observable<any[]> {
    const httpParams = new HttpParams();

    return this.http.get('http://api.football-data.org/v1/competitions/445/fixtures?' + filter,
      {
        headers: this.headers
      }
    ).map(data => <any[]>data);
  }


}
