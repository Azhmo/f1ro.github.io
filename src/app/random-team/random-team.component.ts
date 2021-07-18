import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http/http.service';
import { PlayerRank, F1TeamRank } from '../common';

@Component({
  selector: 'app-random',
  templateUrl: './random-team.component.html',
  styleUrls: ['./random-team.component.scss'],
})
export class RandomTeamComponent implements OnInit {
  players: PlayerRank[];
  teams: F1TeamRank[];

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

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
    this.getTeamsRank();
    this.httpService.getPlayersRank().subscribe((response) => {
      this.players = response;
    });
  }

  getTeamsRank() {
    this.httpService.getTeamsRank().subscribe((response) => {
      this.teams = response;
    });
  }

  resetTeams() {
    this.teams = this.noTeams;
  }
}
