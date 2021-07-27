import { Component, OnInit } from '@angular/core';
import { Player } from '../common';

interface Season {
  name: string;
  driversChampion: Player;
  constructorsChampions: Player[];
}

@Component({
  selector: 'app-hall-of-fame',
  templateUrl: './hall-of-fame.component.html',
  styleUrls: ['./hall-of-fame.component.scss']
})

export class HallOfFameComponent implements OnInit {
  seasons: Season[];

  constructor() { }

  ngOnInit(): void {
    this.seasons = [{
      name: 'Season 1',
      driversChampion: {
        name: 'SashaAndrei02',
        team: 'Williams',
        country: 'Ro'
      },
      constructorsChampions: [
        { name: 'XRL Tudy', team: 'Mercedes', country: 'Ro' }
      ]
    }, {
      name: 'Season 2',
      driversChampion: {
        name: 'SashaAndrei02',
        team: 'Williams',
        country: 'Ro'
      },
      constructorsChampions: [
        { name: 'SashaAndrei02', team: 'Williams', country: 'Ro' },
        { name: 'WiseUdr85', team: 'Williams', country: 'Ro' },
      ]
    }, {
      name: 'Season 3',
      driversChampion: {
        name: 'WiseUdr85',
        team: 'Red Bull',
        country: 'Ro'
      },
      constructorsChampions: [
        { name: 'WiseUdr85', team: 'Red Bull', country: 'Ro' },
        { name: 'Callum8869', team: 'Red Bull', country: 'Gb' },
      ]
    }]
  }

}
