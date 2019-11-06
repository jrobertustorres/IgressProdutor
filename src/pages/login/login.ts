import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, Events } from 'ionic-angular';
import { FormBuilder,	FormGroup, Validators } from '@angular/forms';

//ENTITY
import { UsuarioEntity } from '../../model/usuario-entity';

//SERVICES
import { LoginService } from '../../providers/login-service';

//PAGES
import { RecuperarSenhaPage } from '../recuperar-senha/recuperar-senha';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm: FormGroup;
  // tabBarElement: any;
  private loading = null;
  private usuarioEntity: UsuarioEntity;
  public showLoading: boolean = false;
  public message: string;

  // private errorConnection: boolean = false;

  constructor(public navCtrl: NavController,
              private formBuilder: FormBuilder, 
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private loginService: LoginService,
              public events: Events,
              public navParams: NavParams) {
    this.usuarioEntity = new UsuarioEntity();
  }

  ngOnInit() {
    this.loginForm 	= this.formBuilder.group({
      'email': ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
      'senha': ['', Validators.required]
   });
  }

  ionViewWillEnter() {
    let elem = <HTMLElement>document.querySelector(".tabbar");
    elem.style.display = 'none';
  }
    
  ionViewWillLeave() {
    let elem = <HTMLElement>document.querySelector(".tabbar");
    elem.style.display = 'flex';
  }

  submeterLogin() {

    try {

      if (this.loginForm.valid) {
        this.loading = this.loadingCtrl.create({
          content: ''
        });
        this.loading.present();

        this.loginService.login(this.loginForm.value)
          .then((usuarioEntityResult: UsuarioEntity) => {
            this.navCtrl.setRoot(HomePage);
            this.loading.dismiss();
            // this.events.publish('showButtonEvent:change', true);
          }, (err) => {
            this.message = err.message ? err.message : 'Não foi possível conectar ao servidor';
            this.loading.dismiss();
            this.alertCtrl.create({
              subTitle: err.message,
              buttons: ['OK']
            }).present();
          });
      } else {
        Object.keys(this.loginForm.controls).forEach(campo => {
          const controle = this.loginForm.get(campo);
          controle.markAsTouched();
        })
      }
    }
    catch (err){
      if(err instanceof RangeError){
        console.log('out of range');
      }
      console.log(err);
    }
  }

  openRecuperarSenhaPage() {
    this.navCtrl.push(RecuperarSenhaPage);
  }

}
