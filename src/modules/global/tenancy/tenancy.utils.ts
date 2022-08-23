import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Injectable } from '@nestjs/common';

import * as tenantsOrmconfig from './tenants-orm.config';

const connectionMap: Map<string, DataSource> = new Map();

@Injectable()
export class TenancyUtil {
  async getTenantConnection(tenantId: string): Promise<DataSource> {
    const connectionName = `tenant_${tenantId}`;
    return this.getCollectionBySchema(connectionName);
  }

  async executeTenantMigration(tenantId: string): Promise<any> {
    const schemaName = `tenant_${tenantId}`;
    const connection: DataSource = await this.getTenantConnection(tenantId);

    try {
      await connection.query(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`);
      await connection.runMigrations();
    } catch (error) {
      console.log(error);
    } finally {
      await connection.destroy();
    }
  }

  private async getCollectionBySchema(schemaName: string): Promise<DataSource> {
    if (connectionMap.has(schemaName)) {
      return connectionMap.get(schemaName);
    }

    const tenantDataSource = new DataSource({
      ...(tenantsOrmconfig as PostgresConnectionOptions),
      schema: schemaName,
    });

    await tenantDataSource.initialize();
    connectionMap.set(schemaName, tenantDataSource);

    return tenantDataSource;
  }
}
