/* ---------------------------------------------------------------------------------
   * @ description : This is the server configration file.
---------------------------------------------------------------------------------- */

import './utilities/global';
import Hapi from 'hapi';
import config from 'config';
import plugins from './plugins';
import logger from './utilities/logger';
import { failActionJoi } from './utilities/rest';
import { addVendors, addCategories, addSubCategories } from './utilities/methods';
import { getProductsFromSANMARAPI } from './utilities/Cron';

const app = config.get('app');

export default async () => {
  const server = new Hapi.Server({
    host: app.host,
    port: app.port,
    routes: {
      cors: {
        origin: ['*'],
        additionalHeaders: ['authorization'],
        additionalExposedHeaders: ['authorization']
      },
      validate: {
        failAction: failActionJoi
      }
    }
  });

  await server.register(plugins);
  //serving static images
  await server.route({
    path: '/images/{file*}',
    method: 'GET',
    handler: { directory: { path: 'assets', listing: true } }
  });

  try {
    await server.start();
    //add vendors
    // await addVendors();
    //Add categories on server start
    // await addCategories();
    //Add sub categories on server start
    //await addSubCategories();
    //await getProductsFromSANMARAPI;
  } catch (err) {
    logger.info(`Error while starting server: ${err.message}`);
  }

  logger.info(`+++ Server running at: ${server.info.uri}`);
};
