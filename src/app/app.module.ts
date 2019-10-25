import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { MaskUtil } from '../utilitarios/mask';
import { Device } from '@ionic-native/device';
import { EmailComposer } from '@ionic-native/email-composer';
// import { TabsService } from '.../shared/services/tabs.service';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';

//PAGES
import { LoginPage } from '../pages/login/login';
import { RecuperarSenhaPage } from '../pages/recuperar-senha/recuperar-senha';
import { HomePage } from '../pages/home/home';
import { EditarPerfilPage } from '../pages/editar-perfil/editar-perfil';

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


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    RecuperarSenhaPage,
    EditarPerfilPage,
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
    AboutPage,
    ContactPage,
    HomePage,
    LoginPage,
    RecuperarSenhaPage,
    EditarPerfilPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    MaskUtil,
    Device,
    EmailComposer,
    UsuarioEntity,
    IngressoListEntity,
    VersaoAppEntity,
    EventoListEntity,
    LoginService,
    UsuarioService,
    EventoService,
    VersaoAppService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
