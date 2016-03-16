export interface DevConfig {
  position?: string;
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
