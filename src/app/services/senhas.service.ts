import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SenhasService {
  public senhasGeral: number = 0;
  public senhasPrior: number = 0;
  public senhasExame: number = 0;
  public senhasTotal: number = 0;
  public inputNovaSenha: string = '';
  public senhasArray: { [key: string]: string[] } = {
    SG: [],
    SP: [],
    SE: [],
  } as { [key: string]: string[] };
  public senhasChamadas:string[] = [];
  public primeiroValor: string = '';

  somaGeral() {
    this.senhasGeral++;
    this.senhasTotal++;
  }
  somaPrior() {
    this.senhasPrior++;
    this.senhasTotal++;
  }
  somaExame() {
    this.senhasExame++;
    this.senhasTotal++;
  }

  constructor() {}

  novaSenha(tipoSenha: string = ''): void {
    if (tipoSenha == 'SG') {
      this.somaGeral();
      this.inputNovaSenha =
        new Date().getHours().toString().padStart(2, '0') +
        ':' +
        (new Date().getMinutes() + 1).toString().padStart(2, '0') +
        ' - ' +
        tipoSenha +
        (this.senhasArray['SG'].length + 1).toString().padStart(2, '0');

      this.senhasArray['SG'].push(this.inputNovaSenha);
    } else if (tipoSenha == 'SP') {
      this.somaPrior();
      this.inputNovaSenha =
        new Date().getHours().toString().padStart(2, '0') +
        ':' +
        (new Date().getMinutes() + 1).toString().padStart(2, '0') +
        ' - ' +
        tipoSenha +
        (this.senhasArray['SP'].length + 1).toString().padStart(2, '0');
      this.senhasArray['SP'].push(this.inputNovaSenha);
    } else if (tipoSenha == 'SE') {
      this.somaExame();
      this.inputNovaSenha =
        new Date().getHours().toString().padStart(2, '0') +
        ':' +
        (new Date().getMinutes() + 1).toString().padStart(2, '0') +
        ' - ' +
        tipoSenha +
        (this.senhasArray['SE'].length + 1).toString().padStart(2, '0');
      this.senhasArray['SE'].push(this.inputNovaSenha);
    }
    console.log(this.senhasArray);
  }

  chamarSenha() {
    if (this.senhasArray['SP'].length !== 0) {
      this.primeiroValor = this.senhasArray['SP'][0];
      this.senhasChamadas.push(this.primeiroValor)
      this.senhasArray['SP'].shift();
    } else if (this.senhasArray['SE'].length !== 0) {
      this.primeiroValor = this.senhasArray['SE'][0];
      this.senhasChamadas.push(this.primeiroValor)
      this.senhasArray['SE'].shift();
    } else if (this.senhasArray['SG'].length !== 0) {
      this.primeiroValor = this.senhasArray['SG'][0];
      this.senhasChamadas.push(this.primeiroValor)
      this.senhasArray['SG'].shift();
    }
  }
}
