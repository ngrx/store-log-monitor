# @ngrx/devtools

[![Join the chat at https://gitter.im/ngrx/store](https://badges.gitter.im/ngrx/store.svg)](https://gitter.im/ngrx/store?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Devtools for @ngrx projects.

## @ngrx/store Instrumentation
Devtools currently export experimental instrumentation tools for @ngrx/store. To use them,
import `instrumentStore` and use it when providing your @ngrx/store:

```ts
boostrap(App, [ provideStore(reducer), instrumentStore() ]);
```

Then use the `StoreDevtools` service and accompanying `StoreDevtoolActions` to interact with the lifted store:

```ts
import {StoreDevtools, StoreDevtoolActions} from '@ngrx/devtools';

@Component({ ... })
class Monitor{
	constructor(private devtools: StoreDevtools){
		this.devtools.state$.subscribe(liftedState => console.log(liftedState));
	}

	reset(){
		this.devtools.dispatch(StoreDevtoolActions.reset());
	}
}
```

The exported action types and resultant lifted state are currently identical to [redux-devtools](https://github.com/gaearon/redux-devtools).

## Contributing

Please read [contributing guidelines here](https://github.com/ngrx/devtools/blob/master/CONTRIBUTING.md).
