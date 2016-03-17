import {combineReducers, Reducer} from '@ngrx/store';
import {DockActions} from './actions';
import {DevConfig, config} from '../config';

export const POSITIONS = ['left', 'top', 'right', 'bottom'];
export type PositionsType = 'left' | 'top' | 'right' | 'bottom';

function position(state: PositionsType = config.position, action) {
  return (action.type === DockActions.CHANGE_POSITION) ?
    POSITIONS[(POSITIONS.indexOf(state) + 1) % POSITIONS.length] :
    state;
}

function size(state: number = config.size, action) {
  return (action.type === DockActions.CHANGE_SIZE) ?
    action.size :
    state;
}

function visible(state: boolean = config.visible, action) {
  return (action.type === DockActions.TOGGLE_VISIBILITY) ?
    !state :
    state;
}

export interface DockState{
  position?: PositionsType;
  visible?: boolean;
  size?: number;
}

export const dockReducer = combineReducers({
  position,
  visible,
  size
});
