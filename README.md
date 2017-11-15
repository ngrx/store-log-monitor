# @ngrx/store-log-monitor

[![Join the chat at https://gitter.im/ngrx/store](https://badges.gitter.im/ngrx/store.svg)](https://gitter.im/ngrx/store?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


Port of [redux-devtools-log-monitor](https://github.com/gaearon/redux-devtools-log-monitor) for Angular 2 and [@ngrx/store-devtools](https://github.com/ngrx/store-devtools)


### Setup

*Install @ngrx/store-log-monitor from npm*
```bash
npm install @ngrx/store-log-monitor --save
npm install @ngrx/store-log-devtools --save
```

*Configure the monitor when instrumenting store*
```ts
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreLogMonitorModule, useLogMonitor } from '@ngrx/store-log-monitor';

export function instrumentOptions() {
  return {
    monitor: useLogMonitor({ visible: true, position: 'right' })
  };
}

@NgModule({
  imports: [
    StoreDevtoolsModule.instrument({
            maxAge: 25 //  Retains last 25 states
        }),
    StoreDevtoolsModule.instrument(instrumentOptions),
    StoreLogMonitorModule
  ]
})
export class AppModule { }
```

*Use the StoreLogMonitor component in your app*

```ts
@Component({
  selector: 'app',
  template: `
    <ngrx-store-log-monitor toggleCommand="ctrl-h" positionCommand="ctrl-m"></ngrx-store-log-monitor>
  `
})
export class AppComponent { }
```

### Run

Run your app and the log monitor bar should display inside your app. You can hide/show the monitor by pressing **ctrl-h** keys and change its position by pressing **ctrl-m** keys.
 
