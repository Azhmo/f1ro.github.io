import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StandingsComponent } from './standings/standings.component';
import { ConstructorStandingsComponent } from './constructor-standings/constructor-standings.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HttpService } from './http/http.service';
import { UpdateStandingsComponent } from './update-standings/update-standings.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FilterPipe } from './filter.pipe';
import { RandomOrderPipe } from './random-order.pipe';
import { RandomTeamComponent } from './random-team/random-team.component';
import { FilterByNumberPipe } from './filter-by-number.pipe';
import { PenaltiesComponent } from './penalties/penalties.component';
import { LogoComponent } from './logo/logo.component';
import { IncidentReportComponent } from './incident-report/incident-report.component';
import { CalendarNextSeasonComponent } from './calendar-next-season/calendar-next-season.component';
import { CardComponent } from './card/card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DriverDetailsComponent } from './adm/driver-details/driver-details.component';
import { ListDriversComponent } from './adm/list-drivers/list-drivers.component';
import { ListTracksComponent } from './adm/list-tracks/list-tracks.component';
import { HallOfFameComponent } from './hall-of-fame/hall-of-fame.component';

@NgModule({
  declarations: [
    AppComponent,
    StandingsComponent,
    ConstructorStandingsComponent,
    CalendarComponent,
    UpdateStandingsComponent,
    HomeComponent,
    NavbarComponent,
    FilterPipe,
    RandomOrderPipe,
    RandomTeamComponent,
    FilterByNumberPipe,
    PenaltiesComponent,
    LogoComponent,
    IncidentReportComponent,
    CalendarNextSeasonComponent,
    CardComponent,
    DriverDetailsComponent,
    ListDriversComponent,
    ListTracksComponent,
    HallOfFameComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, MatProgressSpinnerModule],
  providers: [HttpService],
  bootstrap: [AppComponent],
})
export class AppModule { }
