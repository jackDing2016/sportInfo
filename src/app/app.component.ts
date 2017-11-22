import { Component, OnInit, AfterContentInit } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentInit {

  private  headers = new HttpHeaders( { 'X-Auth-Token': '68b7ddc952cf4694b802b52321428dc6' } );

  title = 'Premier League';

  results: string[];

  private teamInfoJsonArr;
  private teamTableJsonObj;

  private fixtureJsonObj;
  private fixtureJsonArrPartOne;
  private fixtureJsonArrPartTwo;

  constructor( private  http: HttpClient) {

  }

  getTeamsInfo() {
    this.http.get( 'http://api.football-data.org/v1/competitions/445/teams',
      {headers: this.headers}
      ).subscribe(data => {
        this.teamInfoJsonArr = data;
    });
  }

  getTeamTable() {
    this.http.get('http://api.football-data.org/v1/competitions/445/leagueTable',
      {headers: this.headers }
    ).subscribe(data => {
      this.teamTableJsonObj = data;
      console.log(this.teamTableJsonObj);
    });
  }

  getNextFixture(filter: string) {

    const httpParams = new HttpParams();

    httpParams.set( 'timeFrame', 'n7' );

    this.http.get('http://api.football-data.org/v1/competitions/445/fixtures?' + filter,
      {
        headers: this.headers
        // params: httpParams
      }
      ).subscribe(data => {
        this.fixtureJsonObj = data;

        this.http.get( 'http://api.football-data.org/v1/competitions/445/teams',
          {headers: this.headers}
        ).subscribe(interdata => {
          this.teamInfoJsonArr = interdata;

          console.log( 'higuy' );
          console.log( this.fixtureJsonObj.fixtures.length );

          this.fixtureJsonObj.fixtures.forEach(function (fixture) {
            this.teamInfoJsonArr.teams.forEach(function (team) {
              if (fixture.homeTeamName === team.name) {
                fixture.homeTeamImageUrl = team.crestUrl;
              }
              if (fixture.awayTeamName === team.name) {
                fixture.awayTeamImageUrl = team.crestUrl;
              }
            });
            // console.log( 'image url is ' + fixture.homeTeamImageUrl);
            console.log( 'himan' );
          });

        });

        this.fixtureJsonArrPartOne = this.fixtureJsonObj.fixtures.splice(4, 5);
        this.fixtureJsonArrPartTwo = this.fixtureJsonObj.fixtures.splice(0, 5);
    });
  }

  ngOnInit () {

    this.getTeamTable();
    this.getNextFixture('timeFrame=n7');

    // this.fixtureJsonObj.fixtures.forEach(function (fixture) {
    //   this.teamInfoJsonArr.teams.forEach(function (team) {
    //     if (fixture.homeTeamName === team.name) {
    //       fixture.homeTeamImageUrl = team.crestUrl;
    //     }
    //     if (fixture.awayTeamName === team.name) {
    //       fixture.awayTeamImageUrl = team.crestUrl;
    //     }
    //   });
    // });

  }

  ngAfterContentInit () {
    // this.fixtureJsonArrPartOne = this.fixtureJsonObj.fixtures.splice(4, 5);
    // this.fixtureJsonArrPartTwo = this.fixtureJsonObj.fixtures.splice(0, 5);
  }

}
