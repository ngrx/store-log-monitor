import { Component, Input } from '@angular/core';


@Component({
  selector: 'ngrx-store-log-monitor',
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
