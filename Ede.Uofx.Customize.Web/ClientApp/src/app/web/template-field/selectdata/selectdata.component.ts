import { UofxDialog, UofxDialogController } from "@uofx/web-components/dialog";

import { Component } from "@angular/core";
import { FormDirtyConfirm } from "@uofx/core";

@Component({
 selector: 'component-selector',
 templateUrl: './selectdata.component.html',
 styleUrls: ['./selectdata.component.css']
})
export class SelectdataComponent extends UofxDialog {
   constructor(private dialogCtrl: UofxDialogController) {
     super();
   }

   Close() {
   //  this.dialogCtrl.close();
   }
}
