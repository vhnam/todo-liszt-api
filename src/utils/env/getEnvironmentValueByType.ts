import {toArray, toNumber} from 'lodash';

import tryJSON from '../tryJSON';

const getVariableType = (variable: string) => {
  return variable.split(':').slice(0, -1)[0];
};

const getEnvVariableValue = (variableValue: string, variableType: string) => {
  return variableValue.split(`${variableType}:`)[1];
};

const getEnvironmentValueByType = (envVariableString: string) => {
  const variableType = getVariableType(envVariableString);
  const envVariableValue = getEnvVariableValue(envVariableString, variableType);

  switch (variableType) {
    case 'number':
      return toNumber(envVariableValue);
    case 'array':
      return toArray(envVariableValue);
    case 'string':
      return envVariableValue;
    case 'json':
      return tryJSON(envVariableValue);
  }
};

export default getEnvironmentValueByType;
