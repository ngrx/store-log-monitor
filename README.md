# @ngrx/store-log-monitor

[![Join the chat at https://gitter.im/ngrx/store](https://badges.gitter.im/ngrx/store.svg)](https://gitter.im/ngrx/store?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


Port of [redux-devtools-log-monitor](https://github.com/gaearon/redux-devtools-log-monitor) for Angular 2 and [@ngrx/store-devtools](https://github.com/ngrx/store-devtools)


### Setup

*Install @ngrx/store-log-monitor from npm*
```bash
npm install @ngrx/store-log-monitor --save
```

*Configure the monitor when instrumenting store*
```ts
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreLogMonitorModule, useLogMonitor } from '@ngrx/store-log-monitor';

@NgModule({
  imports: [
    StoreDevtoolsModule.instrumentStore({
      monitor: useLogMonitor({
        visible: true,
        position: 'right'
      })
    }),
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
