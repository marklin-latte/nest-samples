import { getConnection } from 'typeorm';
import * as db from '../../src/database';
import * as testServer from './testServer';

export default async (): Promise<void> => {
  await db.init();
  await getConnection().synchronize(true);
  await testServer.start();
};