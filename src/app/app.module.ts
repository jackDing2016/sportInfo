import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import {FixtureService} from './fixture.service';
import { AppRoutingModule } from './app-routing.module';
import { FixtureComponent } from './fixture/fixture.component';
import { HomeComponent } from './home/home.component';
import { TeamComponent } from './team/team.component';

@NgModule({
  declarations: [
    AppComponent,
    FixtureComponent,
    HomeComponent,
    TeamComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ FixtureService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
