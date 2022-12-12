import * as dotenv from 'dotenv';
import { databaseConfig } from './config';

dotenv.config();
const { NODE_ENV } = process.env;

let config;

switch (NODE_ENV) {
  case 'development':
    config = databaseConfig.development;
    break;
  case 'production':
    config = databaseConfig.production;
    break;
  case 'test':
    config = databaseConfig.test;
    break;
  default:
    throw new Error('invalid database config variables');
}

export default config;
