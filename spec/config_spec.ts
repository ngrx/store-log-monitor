declare var describe, it, expect, console, beforeEach;
require('es6-shim');
require('reflect-metadata');

import { devtoolsConfig, DevConfig } from '../src';
import { config } from '../src/monitors/config';

describe('Config', () => {
  let defaultConfig: DevConfig = {
    position: 'right',
    visible: true,
    size: 0.3
  };

  afterEach(() => {
    devtoolsConfig(defaultConfig);
  });

  it('should provide default position', () => {
    expect(config.position).toEqual(defaultConfig.position);
  });

  it('should provide default visibility', () => {
    expect(config.visible).toEqual(defaultConfig.visible);
  });

  it('should provide default size', () => {
    expect(config.size).toEqual(defaultConfig.size);
  });

  it('should update the default settings', () => {
    let updatedConfig: DevConfig = {
      position: 'bottom',
      visible: false,
      size: 0.5
    };

    devtoolsConfig(updatedConfig);

    expect(config.position).toEqual(updatedConfig.position);
    expect(config.visible).toEqual(updatedConfig.visible);
    expect(config.size).toEqual(updatedConfig.size);
  });
});
