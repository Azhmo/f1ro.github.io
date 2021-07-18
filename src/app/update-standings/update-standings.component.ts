import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import html2canvas from 'html2canvas';
import { forkJoin } from 'rxjs';
import { F1Team, PlayerRank, F1TeamRank, EFRTier } from '../common';
import { HttpService } from '../http/http.service';

interface Result {
  position: number | string;
  name: string;
  team: F1Team | undefined;
  points: number;
}

@Component({
  selector: 'app-update-standings',
  templateUrl: './update-standings.component.html',
  styleUrls: ['./update-standings.component.scss'],
  providers: [HttpService],
})
export class UpdateStandingsComponent implements OnInit {
  results: Result[];
  players: PlayerRank[];
  oldPlayers: PlayerRank[];
  teams: F1TeamRank[];
  oldTeams: F1TeamRank[];
  tierFilter: EFRTier;

  constructor(private httpService: HttpService, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      this.tierFilter = params['tier'];
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.httpService.getTeamsRank().subscribe((response) => {
      this.teams = this.sortByPoints(response.filter((team) => team.tier === this.tierFilter));
      this.oldTeams = JSON.parse(JSON.stringify(this.teams));
    });
    this.httpService.getPlayersRank().subscribe((response) => {
      this.players = this.sortByPoints(response.filter((player) => player.tier === this.tierFilter));
      this.oldPlayers = JSON.parse(JSON.stringify(this.players));
    });

    this.resetResults();
  }

  resetResults(): void {
    this.results = [
      {
        position: 1,
        name: '',
        team: undefined,
        points: 25,
      },
      {
        position: 2,
        name: '',
        team: undefined,
        points: 18,
      },
      {
        position: 3,
        name: '',
        team: undefined,
        points: 15,
      },
      {
        position: 4,
        name: '',
        team: undefined,
        points: 12,
      },
      {
        position: 5,
        name: '',
        team: undefined,
        points: 10,
      },
      {
        position: 6,
        name: '',
        team: undefined,
        points: 8,
      },
      {
        position: 7,
        name: '',
        team: undefined,
        points: 6,
      },
      {
        position: 8,
        name: '',
        team: undefined,
        points: 4,
      },
      {
        position: 9,
        name: '',
        team: undefined,
        points: 2,
      },
      {
        position: 10,
        name: '',
        team: undefined,
        points: 1,
      },
      {
        position: '11',
        name: '',
        team: undefined,
        points: 0,
      },
      {
        position: '12',
        name: '',
        team: undefined,
        points: 0,
      },
      {
        position: '13',
        name: '',
        team: undefined,
        points: 0,
      },
      {
        position: '14',
        name: '',
        team: undefined,
        points: 0,
      },
      {
        position: '15',
        name: '',
        team: undefined,
        points: 0,
      },
      {
        position: '16',
        name: '',
        team: undefined,
        points: 0,
      },
      {
        position: '17',
        name: '',
        team: undefined,
        points: 0,
      },
      {
        position: '18',
        name: '',
        team: undefined,
        points: 0,
      }, {
        position: '19',
        name: '',
        team: undefined,
        points: 0,
      }, {
        position: '20',
        name: '',
        team: undefined,
        points: 0,
      },
      {
        position: 'Fastest lap',
        name: '',
        team: undefined,
        points: 1,
      },
      {
        position: 'Bonus no penalties',
        name: '',
        team: undefined,
        points: 1,
      },
    ];
  }

  public sortByPoints(teams: any[]): any[] {
    if (!teams) {
      return [];
    }
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

  public generateRaceStandings() {
    this.players.forEach((player) => {
      const raceResult = this.results.find(
        (result) => result.position == player.currentRacePosition
      );

      if (player.hasFastestLap) {
        const fasterLapRaceResult = this.results.find((result) => result.position === 'Fastest lap')
        raceResult.points += 1;
        fasterLapRaceResult.name = player.name;
        fasterLapRaceResult.team = player.team !== 'Res' ? player.team : player.provisionalTeam;;
      }

      if (player.hasBonusPoint) {
        const bonusPointRaceResult = this.results.find((result) => result.position === 'Bonus no penalties')
        raceResult.points += 1;
        bonusPointRaceResult.name = player.name;
        bonusPointRaceResult.team = player.team !== 'Res' ? player.team : player.provisionalTeam;;
      }

      if (player.penaltyPoints > 3 || player.nextRacePenalty.indexOf('ban') > -1) {
        player.isCleanDriver = false;
        player.isPotentialCleanDriver = false;
      }

      if (player.hasCleanRace) {
        player.consecutiveCleanRaces++;
        if (player.consecutiveCleanRaces === 3 && !player.isCleanDriver && player.isPotentialCleanDriver) {
          player.isCleanDriver = true;
        }
      } else player.consecutiveCleanRaces = 0;

      const teamRaceResult = this.teams.find((team) => team.name === (player.team !== 'Res' ? player.team : player.provisionalTeam));
      if (raceResult) {
        raceResult.name = player.name;
        raceResult.team = player.team !== 'Res' ? player.team : player.provisionalTeam;
        //update player
        player.points += raceResult.points;
        player.raceInvolvement += 1;
        //update team
        teamRaceResult.points += raceResult.points;
      }
    });
  }

  generateStandings() {
    this.sortByPoints(this.players).forEach((player, index) => {
      const oldPlayerIndex = this.oldPlayers.findIndex(
        (oldPlayer) => oldPlayer.name === player.name
      );
      player.gain = oldPlayerIndex - index;
      player.hasFastestLap = false;
      player.hasBonusPoint = false;
      player.hasCleanRace = false;
      player.currentRacePosition = undefined;
      player.provisionalTeam = undefined;
    });

    this.sortByPoints(this.teams).forEach((team, index) => {
      const oldTeamIndex = this.oldTeams.findIndex(
        (oldTeam) => oldTeam.name === team.name
      );
      team.gain = oldTeamIndex - index;
    });

    forkJoin([this.httpService.addDrivers(this.players), this.httpService.addTeams(this.teams)]).subscribe(
      () => this.router.navigate(['/standings']));
  }

  saveStandings() {
    let element = document.querySelector("#capture-standings") as HTMLElement;
    html2canvas(element).then(function (canvas) {
      // Convert the canvas to blob
      canvas.toBlob(function (blob) {
        const now = new Date();
        // To download directly on browser default 'downloads' location
        let link = document.createElement("a");
        link.download = `standings-${now.getDate()}-${now.toLocaleString('default', { month: 'long' })}.png`;
        link.href = URL.createObjectURL(blob);
        link.click();
      }, 'image/png');
    });
  }
}
