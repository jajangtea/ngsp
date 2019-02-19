import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { SuratService } from 'src/app/surat.service';

@Component({
  selector: 'app-surat',
  templateUrl: './surat.component.html',
  styleUrls: ['./surat.component.css']
})
export class SuratComponent implements OnInit {
  public surats = [];
  public errorMsg;
  constructor(private _surat: SuratService, private router: Router) { }

  ngOnInit() {
    this._surat.getEmployees().subscribe(data => this.surats = data,
      error => this.errorMsg = error);
  }

  getNavigation(link, id) {
    if (id === '') {
      this.router.navigate([link]);
    }
    else {
      this.router.navigate([link + '/' + id]);
    }
  }

}
