/* ---------------------------------------------------------------------------------
   * @ description : This is the main startup server file to configure the application.
---------------------------------------------------------------------------------- */

import 'babel-polyfill';
import 'babel-core/register';
import configureDatabase from './db';
import configureServer from './server';
import configureMySQLDatabase from './mysqlDb';

// create DB connection.
//configureDatabase();

// create MySQL DB connection.
configureMySQLDatabase(res => {
  if (res) {
    // creating REST API server connection.
    configureServer();
  }
});
