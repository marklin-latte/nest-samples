import { NextFunction, Request, Response } from 'express';

const TENANT_HEADER = 'x-tenant-id';

export function tenancyMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  const header = req.headers[TENANT_HEADER] as string;
  // 如果沒帶 tenant 會讓他去 public tenant，這之後會多加權限驗證
  req.tenantId = header?.toString() || 'public';
  next();
}
