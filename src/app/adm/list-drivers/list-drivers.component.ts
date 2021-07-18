import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerRank } from 'src/app/common';
import { HttpService } from 'src/app/http/http.service';

@Component({
  selector: 'app-list-drivers',
  templateUrl: './list-drivers.component.html',
  styleUrls: ['./list-drivers.component.scss']
})
export class ListDriversComponent implements OnInit {
  players: PlayerRank[]

  constructor(
    private httpService: HttpService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.httpService.getPlayersRank().subscribe((players) => this.players = players);
  }

  reset(): void {
    this.httpService.addDrivers(this.players.map((player) => {
      return {
        name: player.name,
        country: player.country,
        gain: 0,
        points: 0,
        team: '-',
        penaltyPoints: 0,
        nextRacePenalty: '',
        tier: 'gold',
        raceInvolvement: 0,
        isCleanDriver: false,
        hasCleanRace: false,
        consecutiveCleanRaces: 0,
        isPotentialCleanDriver: true,
      }
    })).subscribe(() => {
      this.router.navigate(['adm/drivers']);
    });
  }

}
