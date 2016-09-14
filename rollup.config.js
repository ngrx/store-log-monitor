export default {
  entry: './release/index.js',
  dest: './release/bundles/store-log-monitor.umd.js',
  format: 'umd',
  moduleName: 'ngrx.storeLogMonitor',
  globals: {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@ngrx/core/operator/select': 'ngrx.core',
    '@ngrx/core/compose': 'ngrx.core',
    '@ngrx/store': 'ngrx.store',
    '@ngrx/store-devtools': 'ngrx.storeDevtools',
    
    'rxjs/Observable': 'Rx',
    'rxjs/Subscriber': 'Rx',
    
    'rxjs/scheduler/queue': 'Rx.Scheduler',

    'rxjs/observable/merge': 'Rx.Observable',

    'rxjs/operator/filter': 'Rx.Observable.prototype',
    'rxjs/operator/map': 'Rx.Observable.prototype'
  }
}