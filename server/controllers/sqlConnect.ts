import sql from 'mssql';
import chalk from 'chalk';
import { sqlConfig } from '../configs/configs';
// ////////////////////////////////////////
// Creates connection pool for mssql which
// is than exported
// ///////////////////////////////////////
const success = chalk.greenBright.bgWhiteBright;
const pool = new sql.ConnectionPool(
  sqlConfig.connectionString !== undefined
  && sqlConfig.connectionString.trim() !== ''
    ? (process.env.SQLCONNECTIONSTRING as any)
    : sqlConfig,
);
const poolConnected = pool.connect();
const initializeDBConnection = async (): Promise<void> => {
  try {
    await poolConnected;
    // eslint-disable-next-line no-console
    console.log(success('DCORPOB: Global Connection connected with no errors'));
  } catch (err) {
    err.function = err.function
      ? ['sqlConnect()', ...err.function]
      : ['sqlConnect()'];
    throw err;
  }
};
initializeDBConnection();

export = pool;
