import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DockMonitorModule } from './src/dock-monitor/index';
import { LogMonitorModule } from './src/log-monitor/index';
import { StoreLogMonitorComponent } from './src/store-log-monitor';


@NgModule({
  imports: [
    CommonModule,
    DockMonitorModule,
    LogMonitorModule
  ],
  declarations: [
    StoreLogMonitorComponent
  ],
  exports: [
    StoreLogMonitorComponent
  ]
})
export class StoreLogMonitorModule { }


export { useDockMonitor as useLogMonitor, DockState as LogMonitorState } from './src/dock-monitor/index';
