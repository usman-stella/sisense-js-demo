import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class SisenseService {

  sisenseServer = 'https://sisense-dev.stella-apps.com';
  sisenseJS = `${this.sisenseServer}/js/sisense.js`;
  dashboardID = '601aa3ca3c3d13002bd5559a';

  constructor() { }

  loadScript(callback: any = null) {
    const scriptSrc = document.querySelector(`script[src="${this.sisenseJS}"]`);
    if (scriptSrc) {
      callback();
      return;
    }
    const head = document.getElementsByTagName('head')[0];
    const script: any = document.createElement('script');
    script.type = 'text/javascript';
    script.src = this.sisenseJS;

    if (callback) {
      script.onreadystatechange = callback;
      script.onload = callback;
    }

    head.appendChild(script);
  }


  connectSisense(): Promise<any> {
    // @ts-ignore
    return Sisense.connect(this.sisenseServer, false);
  }

  connectDashboard(sisenseApp: any): Promise<any> {
    return sisenseApp.dashboards.load(this.dashboardID);
  }
}
