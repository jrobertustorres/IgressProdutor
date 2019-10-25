import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Constants } from '../app/constants';

@Injectable()
export class EventoService {

  private headers = new Headers({ 'Content-Type': 'application/json' });
  private options = new RequestOptions({ headers: this.headers, method: "post" });

  constructor(public _http: Http) {
  }

  public findEventosForOrganizador() {
    try {
      let token = localStorage.getItem(Constants.TOKEN_USUARIO) != null ? localStorage.getItem(Constants.TOKEN_USUARIO) : '';
      return new Promise((resolve, reject) => {
          this._http.post(Constants.API_URL + 'findEventosForOrganizador/'
          + token, this.options)
          .map(res=>res.json())
          .subscribe(data => {
            resolve(data);
          }, (err) => {
            reject(err.json());
          });
      });

    } catch (e){
      if(e instanceof RangeError){
        console.log('out of range');
      }
    }
  }

  public findEventoDetalheByIdEvento(eventoDetalheEntity) {
    try {
      let token = localStorage.getItem(Constants.TOKEN_USUARIO) != null ? localStorage.getItem(Constants.TOKEN_USUARIO) : '';
      return new Promise((resolve, reject) => {
          this._http.post(Constants.API_URL + 'findEventoDetalheByIdEvento/'
          + token, JSON.stringify(eventoDetalheEntity), this.options)
          .map(res=>res.json())
          .subscribe(data => {
            resolve(data);
          }, (err) => {
            reject(err.json());
          });
      });

    } catch (e){
      if(e instanceof RangeError){
        console.log('out of range');
      }
    }
  }
  
  public findIngressoDetalheByIdEvento(eventoDetalheEntity) {
    try {
      return new Promise((resolve, reject) => {
          this._http.post(Constants.API_URL + 'findIngressoDetalheByIdEvento/'
          + localStorage.getItem(Constants.TOKEN_USUARIO), JSON.stringify(eventoDetalheEntity), this.options)
          .map(res=>res.json())
          .subscribe(data => {
            resolve(data);
          }, (err) => {
            reject(err.json());
          });
      });

    } catch (e){
      if(e instanceof RangeError){
        console.log('out of range');
      }
    }
  }

  public findIngressoDetalheRevendaByIdEvento(eventoDetalheEntity) {
    try {
      return new Promise((resolve, reject) => {
          this._http.post(Constants.API_URL + 'findIngressoDetalheRevendaByIdEvento/'
          + localStorage.getItem(Constants.TOKEN_USUARIO), JSON.stringify(eventoDetalheEntity), this.options)
          .map(res=>res.json())
          .subscribe(data => {
            resolve(data);
          }, (err) => {
            reject(err.json());
          });
      });

    } catch (e){
      if(e instanceof RangeError){
        console.log('out of range');
      }
    }
  }

}