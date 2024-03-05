import {
  AbstractControl,
  FormControl,
  FormGroup,
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { BpmFwWriteComponent, UofxFormTools } from '@uofx/web-components/form';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit } from '@angular/core';
import { UofxDialog, UofxDialogController } from "@uofx/web-components/dialog";

import { FormDirtyConfirm } from "@uofx/core";
import { customer } from 'src/app/model/UtilityModel';
import { kjtiService } from '@service/kjti-service';

@Component({
 selector: 'component-selector',
 templateUrl: './selectdata.component.html',
 styleUrls: ['./selectdata.component.css']
})
export class SelectdataComponent extends UofxDialog   implements OnInit {

  @Input() value: customer;
  form: UntypedFormGroup;
  parentForm: FormGroup;
  /** 表單內所有欄位中，自己的 control */
  selfControl: FormControl;
  valueChanges: EventEmitter<any>;
   constructor(    private cdr: ChangeDetectorRef,
    private fb: UntypedFormBuilder,
    private tools: UofxFormTools,
    private dialogCtrl: UofxDialogController,
    private ks:kjtiService,) {
     super();
   }

   ngOnInit(): void {

    this.initForm();

  }
  initForm() {
    this.form = this.fb.group({
      companyName: [this.value?.companyName || '', Validators.required],
      address: [this.value?.address || '', Validators.required],
      phone: [this.value?.phone || '', Validators.required],
    });

    if (this.selfControl) {
      // 在此便可設定自己的驗證器
      this.selfControl.setValidators(validateSelf(this.form));
      this.selfControl.updateValueAndValidity();
    }
  }

  Add()
  {
    this.close(this.form.value);
  }

   Close() {

    this.close();
   }
}

/*外掛欄位自訂的證器*/
function validateSelf(form: UntypedFormGroup): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return form.valid ? null : { formInvalid: true };
  };
}

