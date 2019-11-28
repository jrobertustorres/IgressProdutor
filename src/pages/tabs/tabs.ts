import { Events } from 'ionic-angular';
import { Component } from '@angular/core';
import { Constants } from '../../app/constants';

import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

//PAGES
import { EditarPerfilPage } from '../editar-perfil/editar-perfil';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  public idUsuarioLogado: string;

  tab1Root = HomePage;
  tab2Root = EditarPerfilPage;
  tab3Root = LoginPage;

  // public API_URL: string = '';

  constructor(public events: Events) {
  //   this.API_URL = localStorage.getItem(Constants.IP_CONEXAO);
  //   console.log(localStorage.getItem(Constants.IP_CONEXAO));

  //   if(localStorage.getItem(Constants.IP_CONEXAO) != null || localStorage.getItem(Constants.IP_CONEXAO) != undefined) {
  //     this.API_URL = 'http://'+JSON.stringify(localStorage.getItem(Constants.IP_CONEXAO))+':8190/';
  //   }

  }

  ngOnInit() {
    this.idUsuarioLogado = localStorage.getItem(Constants.ID_USUARIO);

    this.events.subscribe('usuarioLogadoEvent:change', (usuarioLogado) => {
      this.idUsuarioLogado = usuarioLogado;
    });
    
  }
}
