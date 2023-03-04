import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { demoprintService } from 'src/app/core/service/demoprint.service';
import { PrintLabelService } from 'src/app/core/service/printlabel.service';
declare var $: any;

@Component({
  selector: 'org-ims-tagreprint',
  templateUrl: './tagreprint.component.html',
  styleUrls: ['./tagreprint.component.css']
})
export class TagreprintComponent implements OnInit {

  error = "";
  TagRePrintForm: FormGroup;
  submitted: boolean = false;
  loading = false;

  printLabelDesignCodes!: string[];

  get TagRePrintFormControls() { return this.TagRePrintForm.controls; }
  constructor(private formBuilder: FormBuilder, private printLabelService: PrintLabelService,
    private demoPrintService: demoprintService, public datepipe: DatePipe) {
    this.TagRePrintForm = this.formBuilder.group({
      PrintTemplateSelCode: [null, Validators.required],
      TagNumbers: ['', Validators.required]
    });
  }

  async ngOnInit() {
    this.printLabelDesignCodes = await this.printLabelService.getPrintLabelDesign();

    $('.select2bs4').select2();
    $('[name="PrintTemplateSelCode"]').on("change", () => {
      this.TagRePrintFormControls.PrintTemplateSelCode.setValue($('[name="PrintTemplateSelCode"]').val());
    });
  }

  toHexString(byteArray: any) {
    return Array.from(byteArray, function (byte: any) {
      return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('')
  }

  async PrintTag() {
    this.error = '';
    this.submitted = true;

    if (this.TagRePrintForm.invalid) {
      return;
    }

    this.submitted = false;
    let selectedData: string = this.TagRePrintFormControls.TagNumbers.value;
    if (selectedData.trim().length <= 0) {
      this.error = 'Please emter atleast one serial number';
      return;
    }

    let serialNos = selectedData.split(',');

    this.loading = true;
    var printZPL = '';
    var finalZPL = '';

    var designContent = await this.printLabelService.getPrintLabelDesignData(this.TagRePrintFormControls.PrintTemplateSelCode.value);
    designContent = designContent.replace(/\r?\n|\r/g, "</br>");


    var res = this.demoPrintService.GetReprintData(serialNos);
    res.subscribe(
      async result => {
        if (result == null || result.length == 0) {
          this.error = "Invalid serial no(s) entered";
          this.loading = false;
          return
        }

        result.forEach((el: any) => {
          printZPL = designContent;
          var prefix: any; var suffix: any;
          prefix = localStorage.getItem('prefix');
          suffix = localStorage.getItem('suffix');
          var bytes = Buffer.from(prefix + el.serialNo + suffix);
          var text = this.toHexString(bytes);
          var latest_date: any = this.datepipe.transform(el.expirationDate, 'dd-MM-yyyy');
          printZPL = printZPL.replace('[RFID]', text);
          printZPL = printZPL.replace('[BARCODE]', el.serialNo);
          printZPL = printZPL.replace('[BARCODE]', el.serialNo);
          printZPL = printZPL.replace('[RFIDNO]', el.serialNo);
          printZPL = printZPL.replace('[ITEMCODE]', el.itemCode);
          printZPL = printZPL.replace('[ITEMDESC]', el.itemName.substring(0, 40));
          printZPL = printZPL.replace('[SUPBATCHNO]', el.supplierLotNumber);
          printZPL = printZPL.replace('[LOTNO]', el.lotNumber);
          printZPL = printZPL.replace('[LOCCODE]', el.orgCode + '/' + el.locationCode);
          printZPL = printZPL.replace('[EXPDATE]', latest_date);
          finalZPL += printZPL;
        });

        this.loading = false;

        let popupWin;
        popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
        popupWin?.document.open();
        popupWin?.document.write(`
          <html>
            <head>
              <title>Print tab</title>
              <style>
              //........Customized style.......
              </style>
            </head>
        <body onload="window.print();setTimeout(function(){window.close();}, 10000);">${finalZPL}</body>
          </html>`
        );
        popupWin?.document.close();

      },
      err => {
        this.loading = false;
        this.error = err.error ? err.error : err.message;
      }
    );



  }

}
