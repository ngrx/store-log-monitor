import { combineReducers, ActionReducer } from '@ngrx/store';
import { DockActions } from './actions';


export const POSITIONS = ['left', 'top', 'right', 'bottom'];
export type PositionsType = 'left' | 'top' | 'right' | 'bottom';

export interface DockState {
  position?: PositionsType;
  visible?: boolean;
  size?: number;
}

export function useDockMonitor(_options: DockState = {}): ActionReducer<DockState> {
  const options: DockState = Object.assign({
    position: 'right',
    visible: true,
    size: 0.3
  }, _options);

  function position(state: PositionsType = options.position, action) {
    return (action.type === DockActions.CHANGE_POSITION) ?
      POSITIONS[(POSITIONS.indexOf(state) + 1) % POSITIONS.length] :
      state;
  }

  function size(state: number = options.size, action) {
    return (action.type === DockActions.CHANGE_SIZE) ?
      action.size :
      state;
  }

  function visible(state: boolean = options.visible, action) {
    return (action.type === DockActions.TOGGLE_VISIBILITY) ?
      !state :
      state;
  }

  return combineReducers({
    position,
    visible,
    size
  });
}
