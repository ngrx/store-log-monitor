import { PositionsType } from './dock-monitor/reducer';

export interface DevConfig {
  position?: PositionsType;
  visible?: boolean;
  size?: number;
}

export let config: DevConfig = {
  position: 'right',
  visible: true,
  size: 0.3
};

export const devtoolsConfig = (settings: DevConfig) => {
  Object.assign(config, settings);
  return [];
}
