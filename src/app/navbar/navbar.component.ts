import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EFRTier } from '../common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  tierFilter: EFRTier;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.tierFilter = 'gold';
  }

  ngOnInit(): void {
  }

  changeQuery() {
    this.router.navigate([], { relativeTo: this.route, queryParams: { tier: this.tierFilter } });
  }

}
