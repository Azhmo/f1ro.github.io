import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http/http.service';
import { EFRTier, F1TeamRank, PlayerRank } from '../common';
import { forkJoin } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-constructor-standings',
  templateUrl: './constructor-standings.component.html',
  styleUrls: ['./constructor-standings.component.scss'],
  providers: [HttpService],
})
export class ConstructorStandingsComponent implements OnInit {
  teams: F1TeamRank[];
  players: PlayerRank[];
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
      this.teams = this.sortByPoints(response[0].filter((team) => team.tier === this.tierFilter));
      this.players = response[1].filter((player) => player.tier === this.tierFilter);
    }, (err) => console.log(err), () => this.loading = false);
  }

  public showGain(gain: number): number {
    return Math.abs(gain);
  }

  public sortByPoints(teams: F1TeamRank[]): F1TeamRank[] {
    return teams.sort((n1, n2) => {
      if (n1.points > n2.points) {
        return -1;
      }

      if (n1.points < n2.points) {
        return 1;
      }

      return 0;
    });
  }
}
