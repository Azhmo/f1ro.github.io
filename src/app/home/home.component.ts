import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http/http.service';
import { PlayerRank, F1TeamRank, EFRTier } from '../common';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  players: PlayerRank[];
  teams: F1TeamRank[];
  loading: boolean;
  tierFilter: EFRTier;

  constructor(private httpService: HttpService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.tierFilter = params['tier'];
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.loading = true;
    forkJoin([this.httpService.getTeamsRank(), this.httpService.getPlayersRank()]).subscribe((response) => {
      this.teams = response[0].filter((team) => team.tier === this.tierFilter);
      this.players = response[1].filter((player) => player.tier === this.tierFilter);
    }, (err) => console.log(err), () => this.loading = false);
  }
}
