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
  public senhasArrayCopia: { [key: string]: string[] } = {
    SG: [],
    SP: [],
    SE: [],
  } as { [key: string]: string[] };
  public senhasChamadas: string[] = [];
  public primeiroValor: string = '';
  public contadorSP: number = 0;
  public contadorSE: number = 0;
  public contadorSG: number = 0;

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
      let index = 0;
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
    if (
      this.senhasArray['SP'].length !== 0 &&
      this.senhasArray['SP'].length !== this.contadorSP
    ) {
      this.senhasArrayCopia['SP'][0] = this.senhasArray['SP'][this.contadorSP];
      this.senhasChamadas.push(this.senhasArrayCopia['SP'][0]);
      console.log(this.senhasArrayCopia);
      this.contadorSP++;
      console.log(this.senhasChamadas);
    } else if (
      this.senhasArray['SE'].length !== 0 &&
      this.senhasArray['SE'].length !== this.contadorSE
    ) {
      this.senhasArrayCopia['SE'][0] = this.senhasArray['SE'][this.contadorSE];
      this.senhasChamadas.push(this.senhasArrayCopia['SE'][0]);
      console.log(this.senhasArrayCopia);
      this.contadorSE++;
      console.log(this.senhasChamadas);
    } else if (
      this.senhasArray['SG'].length !== 0 &&
      this.senhasArray['SG'].length !== this.contadorSG
    ) {
      this.senhasArrayCopia['SG'][0] = this.senhasArray['SG'][this.contadorSG];
      this.senhasChamadas.push(this.senhasArrayCopia['SG'][0]);
      console.log(this.senhasArrayCopia);
      this.contadorSG++;
      console.log(this.senhasChamadas);
    }
  }
}
