/*
此為外掛欄位wtite mode的樣板，修改/置換的項事如下
修改import 擴充屬性(ExProps)的interface
修改selector和templateUrl路徑
修改classname
修改 @Input() exProps 的interface
*/

import {
  AbstractControl,
  FormArray,
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { BpmFwWriteComponent, UofxFormTools } from '@uofx/web-components/form';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { categorys, custInfo, products } from 'src/app/model/UtilityModel';

import { DemoFieldExProps } from '../props/demo-field.props.component';
import { Settings } from '@uofx/core';
import { UofxDialogController } from '@uofx/web-components/dialog';
import { UofxUserSetItemType } from '@uofx/web-components/user-select';
import { kjtiService } from '@service/kjti-service';

/*修改*/
/*↑↑↑↑修改import 各模式的Component↑↑↑↑*/

/*修改*/
/*置換selector和templateUrl*/
@Component({
  selector: 'uofx-template-field-write-component',
  templateUrl: './demo-field.write.component.html',
})

/*修改*/
/*置換className*/
export class DemoFieldWriteComponent
  extends BpmFwWriteComponent
  implements OnInit {

  /*修改*/
  /*置換className*/
  @Input() exProps: DemoFieldExProps;
  @Input() value: any;
  types: Array<UofxUserSetItemType> = [UofxUserSetItemType.DeptEmployee];
  corpId = Settings.UserInfo.corpId;

  form: UntypedFormGroup;
  constructor(
    private cdr: ChangeDetectorRef,
    private fb: UntypedFormBuilder,
    private tools: UofxFormTools,
    private ks: kjtiService,
    private dialogCtrl: UofxDialogController
  ) {
    super();
  }

  onInputModelChange() {

    //this.valueChanges.emit(this._getEmitValue());
  }

  _getEmitValue() {
   // return this.selfControl.value;
  }


  custData: FormArray;

  ngOnInit(): void {

    this.initForm();

    this.parentForm.statusChanges.subscribe((res) => {
      if (res === 'INVALID' && this.selfControl.dirty) {
        if (!this.form.dirty) {
          Object.keys(this.form.controls).forEach((key) => {
            this.tools.markFormControl(this.form.get(key));
          });
          this.form.markAsDirty();
        }
      }
    });

    this.form.valueChanges.subscribe((res) => {
      this.selfControl?.setValue(res);
      /*真正送出欄位值變更的函式*/
      console.log(res);
      this.valueChanges.emit(res);
    });
    this.cdr.detectChanges();
  }

  Open() {

  }


  C005Value: string;
  C009Value: string;

  GetC005Value() {
    this.getTargetFieldValue('C005').then(res => {
      this.C005Value = res;
    });
  }

  GetC009Value()
  {
    this.getTargetFieldValue('C009').then(res => {
      this.C009Value = res;
    });
  }

  initForm() {

    this.form = this.fb.group({
      sales: [this.value?.sales || '', Validators.required],
      companyName: [this.value?.companyName || '', Validators.required],
      address: [this.value?.address || '', Validators.required],
      phone: [this.value?.phone || '', [Validators.pattern(/^09\d{8}$/)]],
    });

    // this.form = this.fb.group({
    //   custData: this.fb.array([])
    // });


    // this.custData = this.form.get('custData') as FormArray;

    // this.value?.custData?.forEach((data: any) => {

    //   this.custData.push(this.fb.group({
    //     companyName: data.companyName,
    //     address: data.address,
    //     phone: data.phone
    //   }));
    // });



      if (this.selfControl) {
        // 在此便可設定自己的驗證器
        this.selfControl.setValidators(validateSelf(this.form));
        this.selfControl.updateValueAndValidity();
      }
    }



  /*判斷如果是儲存不用作驗證*/
  checkBeforeSubmit(): Promise < boolean > {
      return new Promise((resolve) => {
        const value = this.form.value;
        resolve(true);
      });
    }




}


/*外掛欄位自訂的證器*/
function validateSelf(form: UntypedFormGroup): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return form.valid ? null : { formInvalid: true };
  };
}


export interface customerInfo {
  companyName: string;
  address: string;
  phone: string;
  sales:string;
}

