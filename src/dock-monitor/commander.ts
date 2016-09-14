import { Component, Input, Output, Renderer, EventEmitter } from '@angular/core';
import { filter } from 'rxjs/operator/filter';
import { map } from 'rxjs/operator/map';
import { Observable } from 'rxjs/Observable';
import { KEYCODES } from './keycodes';


export interface ParsedCommand {
  name?: string;
  ctrl: boolean;
  meta: boolean;
  shift: boolean;
  alt: boolean;
  sequence?: string;
}

@Component({
  selector: 'ngrx-commander',
  template: '',
  styles: [':host{ display: none }'],
  host: {
    '(document:keydown)': 'keydown$.emit($event)'
  }
})
export class CommanderComponent {
  public keydown$ = new EventEmitter<KeyboardEvent>();
  private _ignoreTags = ['INPUT', 'SELECT', 'TEXTAREA'];

  @Input() shortcut: string;
  @Output() command: Observable<{ command: string }>;

  constructor() {
    this.keydown$ = new EventEmitter<KeyboardEvent>();

    const filtered$ = filter.call(this.keydown$, (e: KeyboardEvent) => {
      if (this._ignoreTags.indexOf((e.target as HTMLElement).tagName) !== -1) {
        return false;
      }

      if ((e.target as HTMLElement).isContentEditable) {
        return false;
      }

      const command = this.parseCommand(this.shortcut);

      if (!command) {
        return false;
      }

      const charCode = e.keyCode || e.which;
      const char = String.fromCharCode(charCode);
      return command.name.toUpperCase() === char.toUpperCase() &&
        command.alt === e.altKey &&
        command.ctrl === e.ctrlKey &&
        command.meta === e.metaKey &&
        command.shift === e.shiftKey;
    });

    this.command = map.call(filtered$, e => {
      e.preventDefault();

      return { command: this.shortcut };
    });
  }

  parseCommand(s: string): ParsedCommand {
    const keyString = s.trim().toLowerCase();

    if ( !/^(ctrl-|shift-|alt-|meta-){0,4}\w+$/.test(keyString) ) {
      throw new Error('The string to parse needs to be of the format "c", "ctrl-c", "shift-ctrl-c".');
    }

    const parts = keyString.split('-');
    const key: ParsedCommand = {
      ctrl: false,
      meta: false,
      shift: false,
      alt: false
    };

    let c;

    key.name = parts.pop();

    while ((c = parts.pop())) {
      key[c] = true;
    }

    if (key.ctrl) {
      key.sequence = KEYCODES.ctrl[key.name] || key.name;
    }
    else {
      key.sequence = KEYCODES.nomod[key.name] || key.name;
    }

    if (key.shift && key.sequence && key.sequence.length === 1) {
      key.sequence = key.sequence.toUpperCase();
    }

    return key;
  }
}
