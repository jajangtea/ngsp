import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SuratService } from 'src/app/surat.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  public productID: any;
  public productData: any;
  constructor(
    private _suratService: SuratService,
    private router: Router,
    private actRoute: ActivatedRoute) { }

  ngOnInit() {
    this.productID = this.actRoute.snapshot.params['NIM'];
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

  public captureScreen() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png',1.0)
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 20, 40, 170, 160)
      pdf.save('MYPdf.pdf'); // Generated PDF 
    });
  }

}
