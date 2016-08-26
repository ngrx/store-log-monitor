import 'rxjs/add/operator/map';
import { Component, Input  } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { StoreDevtools } from '@ngrx/store-devtools';
import { LogEntryItem } from './log-entry-item';


@Component({
  selector: 'log-monitor',
  styles: [`
    :host {
      display: block;
      background-color: #2A2F3A;
      font-family: 'monaco', 'Consolas', 'Lucida Console', monospace;
      position: relative;
      overflow-y: hidden;
      width: 100%;
      height: 100%;
      min-width: 300px;
      direction: ltr;
    }

    .button-bar {
      text-align: center;
      border-bottom-width: 1px;
      border-bottom-style: solid;
      border-color: transparent;
      z-index: 1;
      display: flex;
      flex-direction: row;
      padding: 0 4px;
    }

    .elements {
      position: absolute;
      left: 0;
      right: 0;
      top: 38px;
      bottom: 0;
      overflow-x: hidden;
      overflow-y: auto;
    }
  `],
  template: `
    <div class="button-bar">
      <log-monitor-button (action)="handleReset()">
        Reset
      </log-monitor-button>

      <log-monitor-button (action)="handleRollback()">
        Revert
      </log-monitor-button>

      <log-monitor-button (action)="handleSweep()" [disabled]="canSweep$ | async">
        Sweep
      </log-monitor-button>

      <log-monitor-button (action)="handleCommit()" [disabled]="canCommit$ | async">
        Commit
      </log-monitor-button>
    </div>
    <div class="elements">
      <log-monitor-entry
        *ngFor="let item of (items$ | async); let i = index"
        [item]="item"
        [disabled]="i === 0"
        [expandEntries]="expandEntries"
        (toggle)="handleToggle($event.id)">
      </log-monitor-entry>
    </div>
  `
})
export class LogMonitorComponent {
  @Input() expandEntries: boolean = true;

  public items$: Observable<LogEntryItem[]>;
  public canRevert$: Observable<boolean>;
  public canSweep$: Observable<boolean>;
  public canCommit$: Observable<boolean>;

  constructor(private devtools: StoreDevtools) {
    this.canRevert$ = devtools.liftedState.map(s => !(s.computedStates.length > 1 ));
    this.canSweep$ = devtools.liftedState.map(s => !(s.skippedActionIds.length > 0));
    this.canCommit$ = devtools.liftedState.map(s => !(s.computedStates.length > 1));

    this.items$ = devtools.liftedState
      .map(({ actionsById, skippedActionIds, stagedActionIds, computedStates }) => {
        const actions = [];

        for (let i = 0; i < stagedActionIds.length; i++) {
          const actionId = stagedActionIds[i];
          const action = actionsById[actionId].action;
          const { state, error } = computedStates[i];
          let previousState;
          if (i > 0) {
            previousState = computedStates[i - 1].state;
          }

          actions.push({
            key: actionId,
            collapsed: skippedActionIds.indexOf(actionId) > -1,
            action,
            actionId,
            state,
            previousState,
            error
          });
        }

        return actions;
      });
  }

  handleToggle(id: number) {
    this.devtools.toggleAction(id);
  }

  handleReset() {
    this.devtools.reset();
  }

  handleRollback() {
    this.devtools.rollback();
  }

  handleSweep() {
    this.devtools.sweep();
  }

  handleCommit() {
    this.devtools.commit();
  }
}
