import { Component, Input } from '@angular/core';

import { LogMonitorComponent } from './log-monitor/log-monitor';
import { DockMonitorComponent } from './dock-monitor/dock-monitor';

@Component({
  selector: 'ngrx-store-log-monitor',
  directives: [ LogMonitorComponent, DockMonitorComponent ],
  template: `
    <dock-monitor [toggleCommand]="toggleCommand" [positionCommand]="positionCommand">
      <log-monitor [expandEntries]="expandEntries"></log-monitor>
    </dock-monitor>
  `
})
export class StoreLogMonitorComponent {
  @Input() toggleCommand: string = 'ctrl-h';
  @Input() positionCommand: string = 'ctrl-m';
  @Input() expandEntries: boolean = false;
}
