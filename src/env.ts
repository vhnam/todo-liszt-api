import {defaultProps, getEnv, processValues} from './utils/env';

let env: Record<string, any> = {
  ...defaultProps,
  ...getEnv(),
  ...process.env,
};

process.env = env;

env = processValues(env);

export default env;
