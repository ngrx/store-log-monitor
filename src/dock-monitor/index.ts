import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommanderComponent } from './commander';
import { DockComponent } from './dock';
import { DockMonitorComponent } from './dock-monitor';
import { DockActions } from './actions';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CommanderComponent,
    DockComponent,
    DockMonitorComponent
  ],
  providers: [
    DockActions
  ],
  exports: [
    DockMonitorComponent
  ]
})
export class DockMonitorModule {

}

export { useDockMonitor, DockState } from './reducer';