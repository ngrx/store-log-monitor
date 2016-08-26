import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DockMonitorModule } from './dock-monitor';
import { LogMonitorModule } from './log-monitor';
import { StoreLogMonitorComponent } from './store-log-monitor';


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


export { useDockMonitor as useLogMonitor, DockState as LogMonitorState } from './dock-monitor';
