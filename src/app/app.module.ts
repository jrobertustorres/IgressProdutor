import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { MaskUtil } from '../utilitarios/mask';
import { Device } from '@ionic-native/device';
import { EmailComposer } from '@ionic-native/email-composer';
import { AppVersion } from '@ionic-native/app-version';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { NativeAudio } from '@ionic-native/native-audio';
// import { TabsService } from '.../shared/services/tabs.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';

//PAGES
import { LoginPage } from '../pages/login/login';
import { RecuperarSenhaPage } from '../pages/recuperar-senha/recuperar-senha';
import { HomePage } from '../pages/home/home';
import { EditarPerfilPage } from '../pages/editar-perfil/editar-perfil';
import { ValidaQrcodePage } from '../pages/valida-qrcode/valida-qrcode';

//ENTITIES
import { UsuarioEntity } from '../model/usuario-entity';
import { IngressoListEntity } from '../model/ingresso-list-entity';
import { VersaoAppEntity } from '../model/versao-app-entity';
import { EventoListEntity } from '../model/evento-list-entity';

//SERVICES
import { LoginService } from '../providers/login-service';
import { UsuarioService } from '../providers/usuario-service';
import { EventoService } from '../providers/evento-service';
import { VersaoAppService } from '../providers/versao-app-service';
import { ValidaIngressoService } from '../providers/valida-ingresso-service';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RecuperarSenhaPage,
    EditarPerfilPage,
    ValidaQrcodePage,
    TabsPage
  ],
  imports: [
    HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
    },
    ),
    // IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RecuperarSenhaPage,
    EditarPerfilPage,
    ValidaQrcodePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    MaskUtil,
    Device,
    EmailComposer,
    AppVersion,
    BarcodeScanner,
    NativeAudio,
    UsuarioEntity,
    IngressoListEntity,
    VersaoAppEntity,
    EventoListEntity,
    LoginService,
    UsuarioService,
    EventoService,
    VersaoAppService,
    ValidaIngressoService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
