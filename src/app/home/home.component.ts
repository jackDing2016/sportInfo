import { Component, OnInit } from '@angular/core';
import {FixtureService} from '../fixture.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Fixture} from '../fixture';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  title = 'Premier League';

  results: string[];

  private teamInfoJsonArr;
  private teamTableJsonObj;

  private fixtureJsonObj;
  private fixtureJsonArrPartOne;
  private fixtureJsonArrPartTwo;
  fixtureArr = [];

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

  getNextFixture(filter: string) {

    this.fixtureService.getNextFixtures( filter ).subscribe(
      data => {
        this.fixtureJsonObj = data;

        this.fixtureJsonObj.fixtures.map(jsonData => {
          const f = new Fixture();
          f.homeTeamName = jsonData.homeTeamName;
          f.awayTeamName = jsonData.awayTeamName;
          this.fixtureArr.push(f);
        });

        console.log( 'higuy' );
        console.log( this.fixtureArr);

        this.fixtureJsonArrPartOne = this.fixtureArr.splice(4, 5);
        this.fixtureJsonArrPartTwo = this.fixtureArr.splice(0, 5);
      });
  }

  ngOnInit () {
    this.getNextFixture('timeFrame=n6');
    this.getTeamTable();
  }

}
