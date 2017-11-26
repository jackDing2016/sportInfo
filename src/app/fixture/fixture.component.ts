import { Component, OnInit } from '@angular/core';
import { FixtureService } from '../fixture.service';
import {Fixture} from '../fixture';

@Component({
  selector: 'app-fixture',
  templateUrl: './fixture.component.html',
  styleUrls: ['./fixture.component.css']
})
export class FixtureComponent implements OnInit {

  private fixtureJsonObj;
  private teamJsonObj;
  fixtureArr = [];

  constructor( private fixtureService: FixtureService) { }

  getNextFixture(filter: string): any {

     this.fixtureService.getNextFixtures( filter ).subscribe(
      data => {

        this.fixtureJsonObj = data;
        this.fixtureJsonObj.fixtures.map(jsonData => {
          const f = new Fixture();
          f.homeTeamName = jsonData.homeTeamName;
          f.awayTeamName = jsonData.awayTeamName;
          this.fixtureArr.push(f);
        });

      });

  }

  getNextFixtureTwo(filter: string) {

    this.fixtureService.getNextFixturesTwo( filter ).subscribe(
      data => {

        this.fixtureJsonObj = data[0];
        this.teamJsonObj = data[1];
        this.fixtureJsonObj.fixtures.map(jsonData => {
          const f = new Fixture();
          f.homeTeamName = jsonData.homeTeamName;
          f.awayTeamName = jsonData.awayTeamName;
          this.fixtureArr.push(f);
        });

        for ( let i = 0; i < this.fixtureArr.length; i++) {

          for ( let j = 0; j < this.teamJsonObj.teams.length; j++ ) {
            console.log( 'fixture: ' + this.fixtureArr[i].homeTeamName);
            console.log( 'team: ' + this.teamJsonObj.teams[j].name);
            if (this.fixtureArr[i].homeTeamName === this.teamJsonObj.teams[j].name) {
              console.log('higuy111');
              this.fixtureArr[i].homeTeamImg =  this.teamJsonObj.teams[j].crestUrl;
            }
            if (this.fixtureArr[i].awayTeamName === this.teamJsonObj.teams[j].name) {
              console.log('higuy222');
              this.fixtureArr[i].awayTeamImg =  this.teamJsonObj.teams[j].crestUrl;
            }
          }
        }
      });
  }

  ngOnInit() {
    // this.getNextFixture('timeFrame=n3');
    this.getNextFixtureTwo('timeFrame=n3');
    console.log('just test');
  }

}
