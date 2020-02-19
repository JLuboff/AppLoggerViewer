/* eslint-disable import/prefer-default-export */
import * as path from 'path';
import { config } from 'mssql';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '..', '.env') });
const isProd = process.env.NODE_ENV === 'production';
// ////////////////////////////////////////
// Config objects for sql, applogger, and
// smtp
// ///////////////////////////////////////
interface SQLConfig extends config {
  connectionString: string | undefined;
}
export const sqlConfig: SQLConfig = {
  user: process.env.SQLUSER,
  password: process.env.SQLPASS,
  server: process.env.DBSERVER!,
  database: process.env.DATABASE!,
  connectionString: isProd ? process.env.SQLCONNECTIONSTRING : undefined,
};
