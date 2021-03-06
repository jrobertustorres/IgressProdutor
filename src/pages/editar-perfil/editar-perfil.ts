import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { Constants } from '../../app/constants';
import { Device } from '@ionic-native/device';
import { EmailComposer } from '@ionic-native/email-composer';

//PAGES
import { LoginPage } from '../login/login';
// import { MeusDadosPage } from '../meus-dados/meus-dados';
// import { MinhaSenhaPage } from '../minha-senha/minha-senha';
// import { CadastroCartaoPage } from '../cadastro-cartao/cadastro-cartao';

@IonicPage()
@Component({
  selector: 'page-editar-perfil',
  templateUrl: 'editar-perfil.html',
})
export class EditarPerfilPage {
  public idUsuarioLogado: string;
  public nomeUsuarioLogado: string;
  public emailUsuario: string;
  public versaoApp: string;

  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController,
              public events: Events,
              private device: Device,
              private emailComposer: EmailComposer,
              public navParams: NavParams) {
  }

  ngOnInit() {
    console.log(localStorage.getItem(Constants.ID_USUARIO));
    this.versaoApp = localStorage.getItem(Constants.VERSION_NUMBER);

    this.events.subscribe('atualizaNomeEvent:change', (nomePessoa) => {
      let names = nomePessoa.split(" ");
      if(names[1]) {
        this.nomeUsuarioLogado = names[0] +' '+ names[1];
      } else {
        this.nomeUsuarioLogado = names[0];
      }
      localStorage.setItem(Constants.NOME_PESSOA, this.nomeUsuarioLogado);
    });
    this.idUsuarioLogado = localStorage.getItem(Constants.ID_USUARIO);
    this.nomeUsuarioLogado = localStorage.getItem(Constants.NOME_PESSOA);
    this.emailUsuario = localStorage.getItem(Constants.EMAIL_PESSOA);
    
  }

  sendEmailBug() {
    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {
      }
     });
     
     let email = {
       to: 'diretoria@logiic.com.br',
       cco: ['jose@logiic.com.br', 'bruno@logiic.com.br'],
       subject: 'Problema encontrado no app.',
       body: '<p><h1>Ol??! Descreva abaixo o problema encontrado e logo analizaremos.</h1></p>' +
       '<h1>Informa????es para suporte</h1>'+
       '<h1>Pet Pr??tico v'+ localStorage.getItem(Constants.VERSION_NUMBER) +'</h1>' +
       '<h1>'+ this.device.model +'</h1>' +
       '<h1>'+ this.device.platform +' '+ this.device.version +'</h1>' +
       '<h1>----------------------</h1>',
       isHtml: true
     };

     this.emailComposer.open(email);
  }

  openTermos(){
    window.open('http://www.petpratico.com.br/termos-de-uso-1_0.html', '_system', 'location=yes');
  }

  openPolitica(){
    window.open('http://www.petpratico.com.br/politica-de-privacidade-1_0.html', '_system', 'location=yes');
  }

  openPoliticaRevenda(){
    window.open('http://www.petpratico.com.br/politica-de-privacidade-1_0.html', '_system', 'location=yes');
  }

  logOut() {
    let alert = this.alertCtrl.create({
      subTitle: 'Deseja realmente sair?',
      buttons: [
        {
          text: 'Ficar',
          role: 'cancel'
        },
        {
          text: 'Sair',
          handler: () => {
            localStorage.removeItem(Constants.ID_USUARIO);
            localStorage.removeItem(Constants.TOKEN_USUARIO);
            localStorage.removeItem(Constants.NOME_PESSOA);
            this.events.publish('usuarioLogadoEvent:change', localStorage.getItem(Constants.ID_USUARIO));
            this.navCtrl.setRoot(LoginPage);
          }
        }
      ]
    });
    alert.present();
  }

}
