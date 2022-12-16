import * as dotenv from 'dotenv';
import { production, development, test } from './config';

dotenv.config();
const { NODE_ENV } = process.env;

let config;

switch (NODE_ENV) {
  case 'development':
    config = development;
    break;
  case 'production':
    config = production;
    break;
  case 'test':
    config = test;
    break;
  default:
    throw new Error('invalid database config variables');
}

export default config;
