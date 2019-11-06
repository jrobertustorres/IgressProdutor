import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Constants } from '../app/constants';
import { Device } from '@ionic-native/device';
import { AppVersion } from '@ionic-native/app-version';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(
              platform: Platform, 
              statusBar: StatusBar, 
              private device: Device,
              private appVersion: AppVersion,
              splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // this.checkNetwork();
      // abaixo verificamos se a intenet cair depois que o cliente já entrou no app
      // this.network.onDisconnect().subscribe(() => {
        // this.checkNetwork();
      // });
      if (platform.is('cordova')) {
        localStorage.setItem(Constants.UUID, this.device.uuid);
        this.appVersion.getVersionNumber().then((version) => {
          localStorage.setItem(Constants.VERSION_NUMBER, version);
        })
      }
      // para testes no browser
      else {
        localStorage.setItem(Constants.VERSION_NUMBER, '0.0.1');
      }
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
