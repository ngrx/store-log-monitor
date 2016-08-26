import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JsonTreeModule } from '../json-tree';
import { LogMonitorComponent } from './log-monitor';
import { LogMonitorButtonComponent } from './log-monitor-button';
import { LogMonitorEntryComponent } from './log-monitor-entry';


@NgModule({
  imports: [
    CommonModule,
    JsonTreeModule
  ],
  declarations: [
    LogMonitorComponent,
    LogMonitorButtonComponent,
    LogMonitorEntryComponent
  ],
  exports: [
    LogMonitorComponent
  ]
})
export class LogMonitorModule { }