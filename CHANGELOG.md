<a name="3.0.1"></a>
## [3.0.1](https://github.com/ngrx/store-log-monitor/compare/v3.0.0...v3.0.1) (2016-09-01)


### Bug Fixes

* **deps:** Upgrade to latest Angular 2 RC and rxjs beta ([0595eba](https://github.com/ngrx/store-log-monitor/commit/0595eba))



<a name="3.0.0"></a>
# [3.0.0](https://github.com/ngrx/store-log-monitor/compare/v2.0.0-beta.1...v3.0.0) (2016-08-26)


### Chores

* Upgrade to Angular 2 RC.5 ([#3](https://github.com/ngrx/store-log-monitor/issues/3)) ([29656f3](https://github.com/ngrx/store-log-monitor/commit/29656f3))


### BREAKING CHANGES

* With the introduction of NgModules, setting up StoreLogMonitor has changed.

Before:

```ts
import { instrumentStore } from '@ngrx/store-devtools';
import { useLogMonitor, StoreLogMonitorComponent } from '@ngrx/store-log-monitor';

@Component({
  providers: [
    instrumentStore({ monitor: useLogMonitor() })
  ],
  directives: [
    StoreLogMonitorComponent
  ]
})
export class AppComponent { }
```

After:
```ts
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreLogMonitorModule, useLogMonitor } from '@ngrx/store-log-monitor';

@NgModule({
  imports: [
    StoreDevtoolsModule.instrumentStore({ monitor: useLogMonitor() }),
    StoreLogMonitorModule
  ]
})
export class AppModule { }
```



<a name="2.0.0-beta.1"></a>
# [2.0.0-beta.1](https://github.com/ngrx/store-log-monitor/compare/v1.3.2...v2.0.0-beta.1) (2016-07-02)



<a name="1.3.2"></a>
## [1.3.2](https://github.com/ngrx/store-log-monitor/compare/v1.3.0...v1.3.2) (2016-03-17)


### Bug Fixes

* **Commander:** Fixed event handling in the Commander component ([ba355fb](https://github.com/ngrx/store-log-monitor/commit/ba355fb))
* **DevtoolsConfig:** Use the PositionsType from the dock monitor to constrain the available positions ([f1a1563](https://github.com/ngrx/store-log-monitor/commit/f1a1563))
* **LogMonitor:** do not suppress init action ([78f46c0](https://github.com/ngrx/store-log-monitor/commit/78f46c0))
* **LogMonitorButton:** Fixed metadata generation bug with event handler ([b5f69a7](https://github.com/ngrx/store-log-monitor/commit/b5f69a7))
* **StoreDevtoolsTest:** Changed all calls to use devtool methods instead of raw action creators ([f99657d](https://github.com/ngrx/store-log-monitor/commit/f99657d))


### Features

* **devtools:** Added config function to set default position, visibility and size ([73cfefc](https://github.com/ngrx/store-log-monitor/commit/73cfefc))
* **Devtools:** Added unified Devtools component that wraps the DockMonitor and LogMonitor ([58497f5](https://github.com/ngrx/store-log-monitor/commit/58497f5))
* **DockMonitor:** Added dock monitor to wrap devtools. ([d10fb7a](https://github.com/ngrx/store-log-monitor/commit/d10fb7a))
* **instrumentStore:** Added shortcut to combineReducers if an object is passed in. Default to dock reducer ([344c7b5](https://github.com/ngrx/store-log-monitor/commit/344c7b5))
* **monitors:** Added customizable dock monitor commands via inputs ([5610e27](https://github.com/ngrx/store-log-monitor/commit/5610e27))



<a name="1.3.0"></a>
# [1.3.0](https://github.com/ngrx/store-log-monitor/compare/0f2c4ff...v1.3.0) (2016-03-09)


### Bug Fixes

* **Devtools:** Filtered out all undefined states ([0f2c4ff](https://github.com/ngrx/store-log-monitor/commit/0f2c4ff))
* **linter:** Corrected linting errors with store instrumentation ([1d99bbc](https://github.com/ngrx/store-log-monitor/commit/1d99bbc))
* **package.json:** Restore name to [@ngrx](https://github.com/ngrx)/devtools ([859491c](https://github.com/ngrx/store-log-monitor/commit/859491c))
* **StoreDevtools:** Fixed specs to correctly use liftedState instead of state ([769a046](https://github.com/ngrx/store-log-monitor/commit/769a046))
* **tsconfig:** Corrected paths for log monitor ([4d1e5d6](https://github.com/ngrx/store-log-monitor/commit/4d1e5d6))
* **tsconfig:** Include the correct scripts for the store devtools ([0419aba](https://github.com/ngrx/store-log-monitor/commit/0419aba))


### Features

* **LogMonitor:** Added initial implementation of a LogMonitor component ([ac6f24d](https://github.com/ngrx/store-log-monitor/commit/ac6f24d))
* **StoreDevtools:** Solidifed devtools API to be a complete service ([5f293f2](https://github.com/ngrx/store-log-monitor/commit/5f293f2))



