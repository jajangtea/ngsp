import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SuratService } from 'src/app/surat.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import * as $ from 'jquery';

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

  public captureScreen() {
    var canvasToImage = function (canvas: any) {
      var img = new Image();
      var dataURL = canvas.toDataURL('image/png', 0.92);
      img.src = dataURL;
      return img;
    };
    var canvasShiftImage = function (oldCanvas: any, shiftAmt: any) {
      shiftAmt = parseInt(shiftAmt) || 0;
      if (!shiftAmt) { return oldCanvas; }

      var newCanvas = document.createElement('canvas');
      newCanvas.height = oldCanvas.height - shiftAmt;
      newCanvas.width = oldCanvas.width;
      var ctx = newCanvas.getContext('2d');
      ctx['imageSmoothingEnabled'] = false; /* standard */
      ctx['mozImageSmoothingEnabled'] = false; // Firefox 
      ctx['oImageSmoothingEnabled'] = false; // Opera /
      ctx['webkitImageSmoothingEnabled'] = false; // Safari /
      ctx['msImageSmoothingEnabled'] = false; // IE */
      //ctx.fillStyle = "#";
      var img = canvasToImage(oldCanvas);
      ctx.drawImage(img, 0, shiftAmt, img.width, img.height, 0, 0, img.width, img.height);

      return newCanvas;
    };

    var canvasToImageSuccess = function (canvas: any) {
      var l = {
        orientation: 'p',
        unit: 'mm',
        format: 'a4',
        compress: true,
        fontSize: 40,
        lineHeight: 1,
        autoSize: false,
        printHeaders: true
      };
      var pdf = new jsPDF(l),
        pdfInternals = pdf.internal,
        pdfPageSize = pdfInternals.pageSize,
        pdfScaleFactor = pdfInternals.scaleFactor,
        pdfPageWidth = pdfPageSize.width,
        pdfPageHeight = pdfPageSize.height,
        totalPdfHeight = 0,
        htmlPageHeight = canvas.height,
        htmlScaleFactor = canvas.width / (pdfPageWidth * pdfScaleFactor),
        safetyNet = 0;
      while (totalPdfHeight < htmlPageHeight && safetyNet < 15) {
        var newCanvas = canvasShiftImage(canvas, totalPdfHeight);
        pdf.addImage(newCanvas, 'PNG', 0, 0, pdfPageWidth, pdfPageHeight, 'NONE', 'SLOW');

        totalPdfHeight += (pdfPageHeight * pdfScaleFactor * htmlScaleFactor);

        if (totalPdfHeight < (htmlPageHeight)) {
          pdf.addPage();
        }
        safetyNet++;
      }
      var source = $('#print')[0];
      pdf.save('invoice.pdf');
    };

    var bigCanvas = $("<div>").appendTo($('#print'));  // This will be the 2x sized canvas we're going to render
    var scaledElement = $('#print').clone()
      .css({
        'margin': '2%',
        'padding': '1%',
        'transform': 'scale(2,2)',
        'transform-origin': '0 0',
      })
      .appendTo(bigCanvas);

    var oldWidth = scaledElement.width();
    var oldHeight = scaledElement.height();

    var newWidth = oldWidth * 2;
    var newHeight = oldHeight * 2;

    bigCanvas.css({
      'width': newWidth + 200,
      'height': newHeight + 200,
      'margin': '2%',
      'padding': '1%',
    })

    /* html2canvas(bigCanvas[0]).then((canvas: any) => {
       canvasToImageSuccess(canvas);
       bigCanvas.remove();
       progress.done();
     });*/


    var data = document.getElementById('contentToConvert');
    html2canvas(data, bigCanvas[0]).then(canvas => {
      canvasToImageSuccess(canvas);
      bigCanvas.remove();
      // Few necessary setting options


      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png', 1.0);
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 20, 40, 170, 160)
      pdf.save('MYPdf.pdf'); // Generated PDF 
    });
  }

}
