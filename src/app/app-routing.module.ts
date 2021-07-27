import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StandingsComponent } from './standings/standings.component';
import { ConstructorStandingsComponent } from './constructor-standings/constructor-standings.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CalendarNextSeasonComponent } from './calendar-next-season/calendar-next-season.component';
import { UpdateStandingsComponent } from './update-standings/update-standings.component';
import { HomeComponent } from './home/home.component';
import { RandomTeamComponent } from './random-team/random-team.component';
import { PenaltiesComponent } from './penalties/penalties.component';
import { LogoComponent } from './logo/logo.component';
import { IncidentReportComponent } from './incident-report/incident-report.component';
import { DriverDetailsComponent } from './adm/driver-details/driver-details.component';
import { ListDriversComponent } from './adm/list-drivers/list-drivers.component';
import { ListTracksComponent } from './adm/list-tracks/list-tracks.component';
import { HallOfFameComponent } from './hall-of-fame/hall-of-fame.component';

const routes: Routes = [
  { path: 'standings', component: StandingsComponent },
  { path: 'constructor-standings', component: ConstructorStandingsComponent },
  { path: 'calendar', component: CalendarComponent },
  // { path: 'calendar-next-season', component: CalendarNextSeasonComponent },
  { path: 'update', component: UpdateStandingsComponent },
  { path: 'random', component: RandomTeamComponent },
  { path: 'penalties', component: PenaltiesComponent },
  { path: 'hall-of-fame', component: HallOfFameComponent },
  { path: 'logo', component: LogoComponent },
  { path: 'incidents', component: IncidentReportComponent },
  { path: '', component: HomeComponent },
  { path: 'adm/driver/:id', component: DriverDetailsComponent },
  { path: 'adm/driver', component: DriverDetailsComponent },
  { path: 'adm/drivers', component: ListDriversComponent },
  { path: 'adm/tracks', component: ListTracksComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
