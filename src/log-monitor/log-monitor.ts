import { Component, Input, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operator/map';
import { StoreDevtools } from '@ngrx/store-devtools';
import { select } from '@ngrx/core/operator/select';
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
    <div class="elements" #scrollContainer>
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
export class LogMonitorComponent implements AfterViewChecked {
  @ViewChild('scrollContainer') private scrollContainer: ElementRef;
  @Input() expandEntries: boolean = true;

  public items$: Observable<LogEntryItem[]>;
  public canRevert$: Observable<boolean>;
  public canSweep$: Observable<boolean>;
  public canCommit$: Observable<boolean>;
  private _scrollDown: boolean = false;
  private _previousActions: any = [];

  constructor(private devtools: StoreDevtools) {
    this.canRevert$ = select.call(devtools.liftedState, s => !(s.computedStates.length > 1));
    this.canSweep$ = select.call(devtools.liftedState, s => !(s.skippedActionIds.length > 0));
    this.canCommit$ = select.call(devtools.liftedState, s => !(s.computedStates.length > 1));

    this.items$ = map.call(devtools.liftedState, ({ actionsById, skippedActionIds, stagedActionIds, computedStates }) => {
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

      // check if there are new items in the list so we can scroll down      
      this._scrollDown = actions.length - this._previousActions.length > 0;
      this._previousActions = actions;

      return actions;
    });
  }

  ngAfterViewChecked() {
    if (this._scrollDown) {
      this.scrollToBottom();
      this._scrollDown = false;
    }
  }

  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
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
