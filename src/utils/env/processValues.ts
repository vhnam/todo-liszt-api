import {clone, toArray} from 'lodash';

import tryJSON from '../tryJSON';
import getEnvironmentValueByType from './getEnvironmentValueByType';

const acceptedEnvTypes = ['string', 'number', 'array'];

const processValues = (env: Record<string, any>): Record<string, any> => {
  env = clone(env);

  for (const [key, value] of Object.entries(env)) {
    if (
      typeof value === 'string' &&
      acceptedEnvTypes.some((envType) => value.includes(`${envType}:`))
    ) {
      env[key] = getEnvironmentValueByType(value);
      continue;
    }

    if (value === 'true') {
      env[key] = true;
      continue;
    }

    if (value === 'false') {
      env[key] = false;
      continue;
    }

    if (value === 'null') {
      env[key] = null;
      continue;
    }

    if (
      String(value).startsWith('0') === false &&
      isNaN(value) === false &&
      value.length > 0 &&
      value <= Number.MAX_SAFE_INTEGER
    ) {
      env[key] = Number(value);
      continue;
    }

    if (String(value).includes(',')) {
      env[key] = toArray(value);
    }

    env[key] = tryJSON(value);
  }

  return env;
};

export default processValues;
