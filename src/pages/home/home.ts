import { Component } from '@angular/core';
import { NavController, AlertController, Platform, LoadingController } from 'ionic-angular';
import { Constants } from '../../app/constants';
import { Device } from '@ionic-native/device';
import { DomSanitizer } from '@angular/platform-browser';

//ENTITYS
import { UsuarioEntity } from '../../model/usuario-entity';
import { VersaoAppEntity } from '../../model/versao-app-entity';
import { EventoListEntity } from '../../model/evento-list-entity';

//SERVICES
import { EventoService } from '../../providers/evento-service';
import { LoginService } from '../../providers/login-service';
import { VersaoAppService } from '../../providers/versao-app-service';

//PAGES
import { ValidaQrcodePage } from '../valida-qrcode/valida-qrcode';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // private loading = null;
  segment: string = "destaquesList"; // default button
  private versaoAppEntity: VersaoAppEntity;
  private eventoListEntity: EventoListEntity;
  private usuarioEntity: UsuarioEntity;
  private versao: any;
  private dadosUsuario: any;
  private dadosEvento: any;
  private dadosEventosProximos: any;
  private listEventosProximos: any;
  private idUsuarioLogado: string;
  public showLoading: boolean = true;  
  private errorConnection: boolean = false;

  constructor(public navCtrl: NavController,
    private versaoAppService: VersaoAppService,
              public platform: Platform,
              private loginService: LoginService,
              private eventoService: EventoService,
              private device: Device,
              public loadingCtrl: LoadingController,
              private sanitizer: DomSanitizer,
              public alertCtrl: AlertController) {
    this.usuarioEntity = new UsuarioEntity();
    this.versaoAppEntity = new VersaoAppEntity();
    this.eventoListEntity = new EventoListEntity();
  }
  
  ionViewWillEnter() {
    this.showLoading = true;
    this.idUsuarioLogado = localStorage.getItem(Constants.ID_USUARIO);
    this.getAtualizacaoStatus();
  }

  loadMore(infiniteScroll) {
    setTimeout(() => {
      this.findEventosForOrganizador(infiniteScroll);
    }, 500);
  }

  getAtualizacaoStatus() {
    try {

      // PARA TESTES NO BROWSER
      if (!this.platform.is('cordova')) {
        this.versaoAppEntity.versao = "0.0.1"; // so para testes
        this.versaoAppEntity.sistemaOperacional = "ANDROID"; // so para testes
      } else { // para uso no smartphone
        this.versaoAppEntity.versao = localStorage.getItem(Constants.VERSION_NUMBER);
        this.versaoAppEntity.sistemaOperacional = this.device.platform;

      }

      this.versaoAppService.versaoApp(this.versaoAppEntity)
      .then((versaoResult: VersaoAppEntity) => {
        this.versao = versaoResult;

        if(this.versao.descontinuado == true) {
          this.showAlertVersao(this.versao);
        } else {
          this.verificaIdUsuario();
        }

      }, (err) => {
        this.errorConnection = err.message ? err.message : 'Não foi possível conectar ao servidor';
        this.showLoading = false;
        this.errorConnection = null;
      });

    }catch (err){
      if(err instanceof RangeError){
      }
      console.log(err);
    }
  }

  verificaIdUsuario() {

    if(!this.idUsuarioLogado){
      this.findEventosForOrganizador(null);
    }
    else if(this.idUsuarioLogado) {
      this.findUsuarioLogado();
    }
  }

  findUsuarioLogado() {
    try {

      this.usuarioEntity.idUsuario = parseInt(localStorage.getItem(Constants.ID_USUARIO));
      this.loginService.loginByIdService(this.usuarioEntity)
      .then((loginResult: UsuarioEntity) => {
        this.dadosUsuario = loginResult;
        this.findEventosForOrganizador(null);
      }, (err) => {
        this.errorConnection = err.message ? err.message : 'Não foi possível conectar ao servidor';
        this.dadosEvento = [];
      });

    }catch (err){
      if(err instanceof RangeError){
      }
      console.log(err);
    }
  }

  findEventosForOrganizador(infiniteScroll: any) {
    try {
      // this.showLoading = true;
      if(this.dadosEvento) {
        this.eventoListEntity.limiteDados = this.eventoListEntity.limiteDados ? this.dadosEvento.length : null;
      }

      this.eventoService.findEventosForOrganizador()
      .then((eventoResult: EventoListEntity) => {
        this.dadosEvento = eventoResult;
        this.eventoListEntity.limiteDados = this.dadosEvento.length;

        if(infiniteScroll) {
          infiniteScroll.complete();
        }
        this.showLoading = false;
      }, (err) => {
        this.errorConnection = err.message ? err.message : 'Não foi possível conectar ao servidor';
        this.showLoading = false;
        this.dadosEvento = [];
      });

    }catch (err){
      if(err instanceof RangeError){
      }
      console.log(err);
    }
  }

  showAlertVersao(versao) {
    const alert = this.alertCtrl.create({
      title: "Atualização do aplicativo",
      subTitle: "A versão que você está usando foi descontinuada. É necessário atualizar para continuar usando o App.",
      buttons: [
        {
        text: 'OK',
          handler: () => {
            this.getPlatform(versao);
          }
      }]
    });
    alert.present();
  }

  getPlatform(versao) {
    if (this.platform.is('ios')) {
      window.open(versao.linkIos, '_system', 'location=yes');
      this.platform.exitApp();
    }

    if (this.platform.is('android')) {
      window.open(versao.linkAndroid, '_system', 'location=yes');
      this.platform.exitApp();
    }
  }

  openSearchEventoPage() {
    // this.navCtrl.push(ModalBuscaProdutosPage);
  }
  
  openValidaQrcodePage(dadosEvento) {
    this.navCtrl.push(ValidaQrcodePage, {
      dadosEvento: dadosEvento,
    })
  }

}
