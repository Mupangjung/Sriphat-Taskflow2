import type { Request, Response, NextFunction, RequestHandler } from 'express';
export class ApiError extends Error {
  constructor(public status: number, public code: string, message: string) { super(message); }
}
export const route = (fn: (req: Request, res: Response) => Promise<unknown>): RequestHandler =>
  (req, res, next: NextFunction) => { Promise.resolve(fn(req, res)).catch(next); };
export const fail = (status: number, code: string, message: string): never => { throw new ApiError(status, code, message); };
