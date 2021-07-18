import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EFRTier, F1CalendarTrack } from '../common';
import { HttpService } from '../http/http.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CalendarComponent implements OnInit {
  calendarTracks: F1CalendarTrack[];
  tierFilter: EFRTier;

  constructor(private httpService: HttpService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.tierFilter = params['tier'];
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.httpService.getTracks().subscribe((response) => {
      this.calendarTracks = response.filter((track) => !!track.date).filter((track) => track.tier === this.tierFilter).map((track) => {
        return {
          ...track,
          date: new Date(track.date),
        }
      }).sort((a, b) => a.date.getTime() - b.date.getTime());
    });
  }
}
