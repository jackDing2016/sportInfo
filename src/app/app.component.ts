import { Component, OnInit, AfterContentInit } from '@angular/core';
import {FixtureService} from './fixture.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentInit {

  title = 'Premier League';

  results: string[];

  private teamInfoJsonArr;
  private teamTableJsonObj;

  private fixtureJsonObj;
  private fixtureJsonArrPartOne;
  private fixtureJsonArrPartTwo;

  constructor( private fixtureService: FixtureService, private http: HttpClient) {

  }

  private  headers = new HttpHeaders( { 'X-Auth-Token': '68b7ddc952cf4694b802b52321428dc6' } );

  getTeamTable() {
    this.http.get('http://api.football-data.org/v1/competitions/445/leagueTable',
      {headers: this.headers }
    ).subscribe(data => {
      this.teamTableJsonObj = data;
      console.log(this.teamTableJsonObj);
    });
  }

  // getNextFixture(filter: string) {
  //
  //   const httpParams = new HttpParams();
  //
  //   httpParams.set( 'timeFrame', 'n7' );
  //
  //   this.http.get('http://api.football-data.org/v1/competitions/445/fixtures?' + filter,
  //     {
  //       headers: this.headers
  //       // params: httpParams
  //     }
  //     ).subscribe(data => {
  //       this.fixtureJsonObj = data;
  //       this.fixtureJsonArrPartOne = this.fixtureJsonObj.fixtures.splice(4, 5);
  //       this.fixtureJsonArrPartTwo = this.fixtureJsonObj.fixtures.splice(0, 5);
  //   });
  // }

  getNextFixture(filter: string) {

    this.fixtureService.getNextFixtures( filter ).subscribe(
      data => {
        this.fixtureJsonObj = data;
        this.fixtureJsonArrPartOne = this.fixtureJsonObj.fixtures.splice(4, 5);
        this.fixtureJsonArrPartTwo = this.fixtureJsonObj.fixtures.splice(0, 5);
      });
  }

  ngOnInit () {
    this.getNextFixture('timeFrame=n6');
    this.getTeamTable();
  }


    // this.fixtureJsonArrPartOne = this.fixtureJsonObj.fixtures.splice(4, 5);
    // this.fixtureJsonArrPartTwo = this.fixtureJsonObj.fixtures.splice(0, 5);

    // this.getTeamTable();
    // this.getNextFixture('timeFrame=n7');

  ngAfterContentInit () {

  }

}
