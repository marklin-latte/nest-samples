import configuration from '../../../config/configuration';

import { join } from 'path';

module.exports = {
  ...configuration().db,
  type: 'postgres',
  entities: [join(__dirname, '../../tenanted/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '../../../migrations/tenanted/*{.ts,.js}')],
};
