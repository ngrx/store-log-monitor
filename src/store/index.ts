import {provide, Provider, OpaqueToken} from 'angular2/core';
import * as store from '@ngrx/store';

import {StoreDevtools} from './backend';

const MONITOR_REDUCER = new OpaqueToken('@ngrx/devtools/store/monitor-reducer');

function instrumentStore(_monitorReducer: any = T => T) {
  return [
    provide(store.StoreBackend, {
      deps: [
        store.REDUCER,
        store.Dispatcher,
        store.INITIAL_STATE,
        store.RESOLVED_PRE_MIDDLEWARE,
        store.RESOLVED_POST_MIDDLEWARE,
        MONITOR_REDUCER
      ],
      useFactory(reducer, dispatcher, initialState, preMiddleware, postMiddleware, monitorReducer) {
        return new StoreDevtools(
          reducer,
          dispatcher,
          initialState,
          preMiddleware,
          postMiddleware,
          monitorReducer
        );
      }
    }),
    provide(StoreDevtools, { useExisting: store.StoreBackend }),
    provide(MONITOR_REDUCER, { useValue: _monitorReducer })
  ];
}

export { instrumentStore, StoreDevtools };
export { LiftedState, StoreDevtoolActions } from './instrument';
