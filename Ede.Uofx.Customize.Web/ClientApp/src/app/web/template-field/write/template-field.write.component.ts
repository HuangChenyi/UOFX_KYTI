/*
此為外掛欄位wtite mode的樣板，修改/置換的項事如下
修改import 擴充屬性(ExProps)的interface
修改selector和templateUrl路徑
修改classname
修改 @Input() exProps 的interface
*/

import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { BpmFwWriteComponent, UofxFormTools } from '@uofx/web-components/form';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

import { SelectdataComponent } from '../selectdata/selectdata.component';
import { TemplateFieldExProps } from '../props/template-field.props.component';
import { UofxDialogController } from '@uofx/web-components/dialog';
import { categorys } from 'src/app/model/UtilityModel';
import { kjtiService } from '@service/kjti-service';

/*修改*/
/*↑↑↑↑修改import 各模式的Component↑↑↑↑*/

/*修改*/
/*置換selector和templateUrl*/
@Component({
  selector: 'uofx-template-field-write-component',
  templateUrl: './template-field.write.component.html',
})

/*修改*/
/*置換className*/
export class TemplateFieldWriteComponent
  extends BpmFwWriteComponent
  implements OnInit
{

  /*修改*/
  /*置換className*/
  @Input() exProps: TemplateFieldExProps;
@Input() value: custInfo;

items: Array<categorys> = [];


  form: UntypedFormGroup;
  constructor(
    private cdr: ChangeDetectorRef,
    private fb: UntypedFormBuilder,
    private tools: UofxFormTools,
    private ks:kjtiService,
    private dialogCtrl: UofxDialogController
  ) {
    super();
  }



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
      this.valueChanges.emit(res);
    });
    this.cdr.detectChanges();
  }

  Open()
  {
    this.dialogCtrl.createFullScreen({
      component: SelectdataComponent,
      params: {
         /*開窗要帶的參數*/
      }
    }).afterClose.subscribe({
      next: res => {
      /*關閉視窗後處理的訂閱事件*/
      if (res) {  }
    }
    });
  }

  initForm() {

    this.ks.serverUrl=this.pluginSetting.entryHost;
    this.ks.getCategorys().subscribe((res)=>{
      console.log(res);

      this.items=res;
    });

    this.form = this.fb.group({
      companyName: [this.value?.companyName || '', Validators.required],
      address: [this.value?.address || '', Validators.required],
      phone: [this.value?.phone || '', Validators.required],
      category:this.value?.category
    });

    if (this.selfControl) {
      // 在此便可設定自己的驗證器
      this.selfControl.setValidators(validateSelf(this.form));
      this.selfControl.updateValueAndValidity();
    }
  }

  /*判斷如果是儲存不用作驗證*/
  checkBeforeSubmit(): Promise<boolean> {
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

export interface custInfo {
  companyName: string;
  address: string;
  phone: string;
  category:string;
}

