import { Global, Module, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request as ExpressRequest } from 'express';
import { TenancyUtil } from './tenancy.utils';

import { CONNECTION } from '../../../constants/tenancy';

/**
 * Note that because of Scope Hierarchy, all injectors of this
 * provider will be request-scoped by default. Hence there is
 * no need for example to specify that a consuming tenant-level
 * service is itself request-scoped.
 * https://docs.nestjs.com/fundamentals/injection-scopes#scope-hierarchy
 */
const connectionFactory = {
  provide: CONNECTION,
  scope: Scope.REQUEST,
  useFactory: (request: ExpressRequest, tenancyUtil: TenancyUtil) => {
    const { tenantId } = request;

    if (tenantId) {
      return tenancyUtil.getTenantConnection(tenantId);
    }

    return null;
  },
  inject: [REQUEST, TenancyUtil],
};

@Global()
@Module({
  providers: [connectionFactory, TenancyUtil],
  exports: [CONNECTION, TenancyUtil],
})
export class TenancyModule {}
