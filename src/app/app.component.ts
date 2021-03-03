import { Component, OnInit } from '@angular/core';
import { SisenseService } from './sisense.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  
  sisenseApp: any;
  sisenseDashboard: any;
  loadingStatus = 'Fixes';
  widgets = [
    {widget_id: '602285e43c3d13002bd555f2', eid: 'widget_1'},
    {widget_id: '60225cb13c3d13002bd555dd', eid: 'widget_2'},
    {widget_id: '60225aed3c3d13002bd555db', eid: 'widget_3'},
    {widget_id: '60225ef43c3d13002bd555df', eid: 'widget_4'},
    {widget_id: '60225f673c3d13002bd555e1', eid: 'widget_5'},
    {widget_id: '602262cc3c3d13002bd555e5', eid: 'widget_6'},
    {widget_id: '6022638f3c3d13002bd555e8', eid: 'widget_7'}
  ];
  activeWidgetID: any;
  

  constructor(
    private ss: SisenseService
  ) { 
  }

  ngOnInit() {
    this.loadingStatus = 'Loading Script';
    this.ss.loadScript(this.initiateSisense.bind(this));
  }

  reportChanged(val: any) {
    this.activeWidgetID = val;
  }

  async initiateSisense() {
    try {
      this.loadingStatus = 'Loading Sisense'
      this.sisenseApp = await this.ss.connectSisense();
    } catch (e) {
      console.log('Could not connect to sisense', e);
    }
    try {
      this.loadingStatus = 'Loading Dashboard';
      this.sisenseDashboard = await this.ss.connectDashboard(this.sisenseApp);
    } catch (e) {
      console.log('Could not connect to sisense', e);
    }
    this.loadingStatus = 'Loaded!';
    this.widgets.forEach(w => {
      this.sisenseDashboard.widgets.get(w.widget_id).container = document.getElementById(w.eid);
    });
    this.sisenseDashboard.refresh();
    this.activeWidgetID = this.widgets[0].widget_id;
  }

  // Tasks:
    // 1. What is the correct way to toggle between the widgets?
    // 2. How do we apply filters on wigets in SisenseJS?
}
