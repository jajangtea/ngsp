import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SuratService } from 'src/app/surat.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  productID: any;
  productData: any;
  constructor(
    private _suratService: SuratService,
    private router: Router,
    private actRoute: ActivatedRoute) { }

  ngOnInit() {
    this.productID = this.actRoute.snapshot.params['id'];
    this.loadProductDetails(this.productID);
  }

  loadProductDetails(productID) {
    this._suratService.getSuratDetails(productID).subscribe(product => {
      this.productData = product;
    });
  }
  navigation(link) {
    this.router.navigate([link]);
  }

}
