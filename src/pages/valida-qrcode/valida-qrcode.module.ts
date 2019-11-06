import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ValidaQrcodePage } from './valida-qrcode';

@NgModule({
  declarations: [
    ValidaQrcodePage,
  ],
  imports: [
    IonicPageModule.forChild(ValidaQrcodePage),
  ],
})
export class ValidaQrcodePageModule {}
