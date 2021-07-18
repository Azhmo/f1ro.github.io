import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http/http.service';
import { EFRTier, PlayerRank } from '../common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss'],
  providers: [HttpService],
})
export class StandingsComponent implements OnInit {
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
    this.loading = true
    this.httpService.getPlayersRank().subscribe((response) => {
      this.players = this.sortByPoints(response.filter((player) => player.tier === this.tierFilter));
    }, (err) => console.log(err), () => this.loading = false);
  }

  public sortByPoints(players: PlayerRank[]): PlayerRank[] {
    return players.sort((n1, n2) => {
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
