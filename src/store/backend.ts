import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/subject/BehaviorSubject';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';

import {Dispatcher, Middleware, Reducer} from '@ngrx/store';
import {ActionTypes} from '@ngrx/store/dist/store-backend';
import {liftAction, unliftState, liftReducerWith, WrappedState} from './instrument';

export class StoreDevtools extends BehaviorSubject<WrappedState> {
  private _reducer: Reducer<WrappedState>;
  private _initialLiftedState: WrappedState;
  private _liftedDispatcher: Dispatcher<any>;
  private _initialState: any;
  private _preMiddleware: Middleware;
  private _postMiddleware: Middleware;
  private _monitorReducer: any;
  private _dispatcher: Dispatcher<any>;

  constructor(
    _reducer: Reducer<any>,
    _dispatcher: Dispatcher<any>,
    _initialState: any,
    _preMiddleware: Middleware,
    _postMiddleware: Middleware,
    _monitorReducer: any
  ) {
    const reducer = liftReducerWith(_reducer, _initialState, _monitorReducer);
    const initialLiftedState = reducer(undefined, { type: ActionTypes.INIT });

    super(initialLiftedState);

    this._reducer = reducer;
    this._initialLiftedState = initialLiftedState;
    this._liftedDispatcher = _dispatcher;
    this._preMiddleware = _preMiddleware;
    this._postMiddleware = _postMiddleware;
    this._monitorReducer = _monitorReducer;
    this._dispatcher = new Dispatcher<any>();
  }

  private _init() {
    this.dispatch({ type: ActionTypes.INIT });
  }

  connect(nextCallbackFn: (state: any) => void) {
    this._liftedDispatcher
      .let(this._preMiddleware)
      .map(liftAction)
      .merge(this._dispatcher)
      .scan((state: WrappedState, action) => this._reducer(state, action), this._initialLiftedState)
      .do((liftedState: WrappedState) => super.next(liftedState))
      .map(unliftState)
      .filter(state => state !== undefined)
      .let(this._postMiddleware)
      .subscribe(nextCallbackFn);

    this._init();
  }

  replaceReducer(reducer: Reducer<any>) {
    this._reducer = liftReducerWith(reducer, this._initialState, this._monitorReducer);

    this._init();
  }

  dispatch(action){
    this._dispatcher.next(action);
  }

  next(action: any){
    this._dispatcher.next(action);
  }
}
