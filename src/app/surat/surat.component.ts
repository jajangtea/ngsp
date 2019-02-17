import { Component, OnInit } from '@angular/core';
import { SuratService } from '../surat.service';
import { Router } from '@angular/router';

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

}
