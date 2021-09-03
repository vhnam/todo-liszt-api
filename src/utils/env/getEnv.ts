import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

import defaultProps from './defaultProps';

const getEnv = () => {
  const configPath = path.resolve(
    process.env.CONFIG_PATH || defaultProps.CONFIG_PATH,
  );

  return dotenv.parse(fs.readFileSync(configPath, {encoding: 'utf8'}));
};

export default getEnv;
