import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/subject/BehaviorSubject';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/do';

import {Dispatcher, Middleware, Reducer} from '@ngrx/store';
import {ActionTypes} from '@ngrx/store/dist/store-backend';
import {liftAction, unliftState, liftReducerWith, WrappedState} from './instrument';

export class StoreDevtools {
  protected _reducer: Reducer<WrappedState>;
  protected _initialLiftedState: WrappedState;
  dispatcher$ = new Dispatcher<any>();
  state$: BehaviorSubject<WrappedState>;

  constructor(
    _reducer: Reducer<any>,
    protected _dispatcher: Dispatcher<any>,
    protected _initialState: any,
    protected _preMiddleware: Middleware = t => t,
    protected _postMiddleware: Middleware = t => t,
    protected _monitorReducer: any
  ) {
    this._reducer = liftReducerWith(_reducer, _initialState, _monitorReducer);
    this._initialLiftedState = this._reducer(undefined, { type: ActionTypes.INIT });
    this.state$ = new BehaviorSubject(this._initialLiftedState);
  }

  protected _init() {
    this.dispatch({ type: ActionTypes.INIT });
  }

  connect(nextCallbackFn: (state: any) => void) {
    this._dispatcher
      .let(this._preMiddleware)
      .map(liftAction)
      .merge(this.dispatcher$)
      .scan((state: WrappedState, action) => this._reducer(state, action), this._initialLiftedState)
      .do((liftedState: WrappedState) => this.state$.next(liftedState))
      .map(unliftState)
      .let(this._postMiddleware)
      .subscribe(nextCallbackFn);

    this._init();
  }

  replaceReducer(reducer: Reducer<any>) {
    this._reducer = liftReducerWith(reducer, this._initialState, this._monitorReducer);

    this._init();
  }

  dispatch(action){
    this.dispatcher$.next(action);
  }
}
