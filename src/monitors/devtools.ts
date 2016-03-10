import {Component} from 'angular2/core';
import {LogMonitor} from './log-monitor/log-monitor';
import {DockMonitor} from './dock-monitor/dock-monitor';

@Component({
  selector: 'ngrx-devtools',
  directives: [ LogMonitor, DockMonitor ],
  template: `
    <dock-monitor>
      <log-monitor></log-monitor>
    </dock-monitor>
  `
})
export class Devtools{ }
