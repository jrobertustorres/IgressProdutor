import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { NativeAudio } from '@ionic-native/native-audio';

//ENTITYS
import { EventoListEntity } from '../../model/evento-list-entity';
import { IngressoListEntity } from '../../model/ingresso-list-entity';

//SERVICES
import { ValidaIngressoService } from '../../providers/valida-ingresso-service';

@IonicPage()
@Component({
  selector: 'page-valida-qrcode',
  templateUrl: 'valida-qrcode.html',
})
export class ValidaQrcodePage {
  private loading = null;
  private dadosEvento: EventoListEntity;
  private ingressoListEntity: IngressoListEntity;
  
  constructor(public navCtrl: NavController, 
              public loadingCtrl: LoadingController,
              public alertCtrl: AlertController,
              private validaIngressoService: ValidaIngressoService,
              private sanitizer: DomSanitizer,
              private barcodeScanner: BarcodeScanner,
              private nativeAudio: NativeAudio,
              public navParams: NavParams) {
      this.dadosEvento = navParams.get("dadosEvento");
      this.ingressoListEntity = new IngressoListEntity();

      this.nativeAudio.preloadSimple('beep', 'assets/audio/beep.mp3').then((onSuccess) => {
      }, (onError) => {
      });

  }

  private _htmlProperty: string = "<p style=\"text-align: center;\"><span name=\"alarm\" style=\"display:inline-block;font-family:Ionicons; font-size: 60px; color: red;\" class=\"icon icon-md ion-md-information-circle\"></span> </p>";

  public htmlProperty() {
    return this.sanitizer.bypassSecurityTrustHtml(this._htmlProperty);
  }

  ionViewWillEnter() {
    let elem = <HTMLElement>document.querySelector(".tabbar");
    elem.style.display = 'none';
  }
    
  ionViewWillLeave() {
    let elem = <HTMLElement>document.querySelector(".tabbar");
    elem.style.display = 'flex';
  }

  lerQrcode() {
    this.nativeAudio.play('beep').then((onSuccess) => {
      this.barcodeScanner.scan().then(barcodeData => {
        this.validaIngresso(barcodeData.text);
       }).catch(err => {
           console.log('Error', err);
       });
    }, (onError) => {
    });
  }

  validaIngresso(tokenIngresso: string) {
    try {
      this.loading = this.loadingCtrl.create({
        content: "",
      });
      this.loading.present();

      this.ingressoListEntity.idEvento = this.dadosEvento.idEvento;
      this.ingressoListEntity.tokenIngresso = tokenIngresso;

      this.validaIngressoService.validaIngresso(this.ingressoListEntity)
      .then((validacaoResult: IngressoListEntity) => {
        this.loading.dismiss();
        this.presentAlert();
      }, (err) => {
        this.loading.dismiss();
        this.alertCtrl.create({
          message: <any> this.htmlProperty(),
          subTitle: err.message ? err.message : 'Não foi possível conectar ao servidor',
          buttons: ['OK'],
        }).present();
      });
    }catch (err){
      this.loading.dismiss();
      if(err instanceof RangeError){
      }
      console.log(err);
    }

  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      // title: 'Ok',
      subTitle: 'Ingresso validado com sucesso',
      buttons: ['OK']
    });
    alert.present();
  }

}
