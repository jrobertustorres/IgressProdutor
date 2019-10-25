import { Component } from '@angular/core';
import { Constants } from '../../app/constants';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

//PAGES
import { EditarPerfilPage } from '../editar-perfil/editar-perfil';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  public idUsuarioLogado: string;

  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;
  tab4Root = EditarPerfilPage;

  constructor() {
  }

  ngOnInit() {
    // localStorage.removeItem(Constants.ID_USUARIO);
    this.idUsuarioLogado = localStorage.getItem(Constants.ID_USUARIO);
    console.log(this.idUsuarioLogado);
  }
}
