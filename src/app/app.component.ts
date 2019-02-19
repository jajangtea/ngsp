import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private router: Router
  ) { }
  ngOnInit() {
  }
  netImage: any = "../themes/img/profile.png";
  title = 'ngsp';
  judul = 'APLIKASI CETAK SURAT PENGANTAR KERJA PRAKTEK DAN SKRIPSI';

  getNavigation(link) {
    this.router.navigate([link]);
  }
}


