export class Constants {

  // public API_URL: string = 'http://107.155.133.177:8190/igressMobileService/';
  public static API_URL: string = 'http://107.155.133.177:8190/igressMobileService/';
  // public API_URL: string = '';
  
  public static IP_CONEXAO = 'ip_conexao';
  public static ID_USUARIO = 'id_usuario';
  public static NOME_TELA = 'nome_tela';
  public static TOKEN_USUARIO = 'token_usuario';
  public static TOKEN_PUSH = 'token_push';
  public static QTD_ITENS_PEDIDO = 'qtd_itens_pedido';
  public static NOME_PESSOA = 'nome_pessoa';
  public static EMAIL_PESSOA = 'email_pessoa';
  public static UUID = 'uuid_usuario';
  public static VERSION_NUMBER = 'version_number';
  public static CIDADES_POR_ESTADO = 'cidades_por_estado';
  public static MODO_OFF_LINE = 'modo_off_line';
  public static PUBLIC_KEY = 'public_key';
  
  constructor() {
    // localStorage.setItem(Constants.IP_CONEXAO, this.API_URL);
    // if(localStorage.getItem(Constants.IP_CONEXAO) != null) {
    //   this.API_URL = 'http://'+JSON.stringify(localStorage.getItem(Constants.IP_CONEXAO))+':8190/';
    // } else {
    //   this.API_URL = 'http://107.155.133.177:8190/igressMobileService/';      
    // }

    console.log('ffffffffffffffffffffffffffff');
  }

}