import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http/http.service';
import { PlayerRank, F1TeamRank, EFRTier } from '../common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-random',
  templateUrl: './random-team.component.html',
  styleUrls: ['./random-team.component.scss'],
})
export class RandomTeamComponent implements OnInit {
  players: PlayerRank[];
  teams: F1TeamRank[];
  tierFilter: EFRTier;

  noTeams: F1TeamRank[] = [
    {
      name: '-',
      gain: 0,
      points: 0,
      tier: 'gold',
    },
    {
      name: '-',
      gain: 0,
      points: 0,
      tier: 'gold',
    },
    {
      name: '-',
      gain: 0,
      points: 0,
      tier: 'gold',
    },
    {
      name: '-',
      gain: 0,
      points: 0,
      tier: 'gold',
    },
    {
      name: '-',
      gain: 0,
      points: 0,
      tier: 'gold',
    },
    {
      name: '-',
      gain: 0,
      points: 0,
      tier: 'gold',
    },
    {
      name: '-',
      gain: 0,
      points: 0,
      tier: 'gold',
    },
    {
      name: '-',
      gain: 0,
      points: 0,
      tier: 'gold',
    },
    {
      name: '-',
      gain: 0,
      points: 0,
      tier: 'gold',
    },
    {
      name: '-',
      gain: 0,
      points: 0,
      tier: 'gold',
    },
  ];

  constructor(private httpService: HttpService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.tierFilter = params['tier'];
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.getTeamsRank();
    this.httpService.getPlayersRank().subscribe((response) => {
      this.players = response.filter((player) => player.tier === this.tierFilter);
    });
  }

  getTeamsRank() {
    this.httpService.getTeamsRank().subscribe((response) => {
      this.teams = response.filter((team) => team.tier === this.tierFilter);
    });
  }

  resetTeams() {
    this.teams = this.noTeams;
  }
}
