import express from 'express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { randomUUID } from 'node:crypto';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { db } from './db.js';
import { config } from './config.js';
import { authRouter, usersRouter, authenticate, admin } from './auth.js';
import { catalogRouter } from './catalog.js';
import { favoritesRouter } from './favorites.js';
import { eventsRouter, analyticsRouter } from './analytics.js';
import { ApiError, route } from './http.js';
export const app=express();
app.disable('x-powered-by');app.use(helmet());app.use(express.json({limit:'64kb'}));app.use(cookieParser());
app.use((_req,res,next)=>{res.locals.requestId=randomUUID();res.setHeader('X-Request-Id',res.locals.requestId);res.setHeader('Cache-Control','no-store');next();});
const limit=(max:number)=>rateLimit({windowMs:60000,max,standardHeaders:'draft-7',legacyHeaders:false,skip:()=>config.NODE_ENV==='test',handler:(_req,res)=>res.status(429).json({error:{code:'RATE_LIMIT',message:'คำขอมากเกินไป กรุณาลองใหม่',requestId:res.locals.requestId}})});
app.use('/api',limit(300));
app.get('/api/health',route(async(_req,res)=>{await db.$queryRaw`SELECT 1`;res.json({data:{status:'ok'}});}));
app.use('/api/v1/auth',limit(20),authRouter);
app.use('/api/v1/admin/users',usersRouter);
app.use('/api/v1/me/favorites',favoritesRouter);
app.use('/api/v1/events',limit(90),eventsRouter);
app.use('/api/v1/analytics',analyticsRouter);
app.get('/api/v1/governance-checklist',authenticate,admin,route(async(_req,res)=>res.json({data:await db.governanceChecklistItem.findMany({orderBy:{position:'asc'}})})));
app.use('/api/v1',catalogRouter);
app.use((_req,_res,next)=>next(new ApiError(404,'NOT_FOUND','ไม่พบ endpoint')));
app.use((error:unknown,_req:express.Request,res:express.Response,_next:express.NextFunction)=>{
 let status=500,code='INTERNAL_ERROR',message='ระบบขัดข้อง กรุณาลองใหม่';
 if(error instanceof ApiError)({status,code,message}=error);
 else if(error instanceof ZodError){status=400;code='VALIDATION_ERROR';message='ข้อมูลคำขอไม่ถูกต้อง';}
 else if(error instanceof Error&&error.message==='FORBIDDEN'){status=403;code='FORBIDDEN';message='ไม่มีสิทธิ์เข้าถึง';}
 else if(error instanceof Prisma.PrismaClientKnownRequestError){if(error.code==='P2002'){status=409;code='CONFLICT';message='ข้อมูลซ้ำ';}else if(error.code==='P2025'){status=404;code='NOT_FOUND';message='ไม่พบข้อมูล';}else if(error.code==='P2003'){status=400;code='INVALID_REFERENCE';message='ข้อมูลอ้างอิงไม่ถูกต้อง';}}
 else if(error instanceof SyntaxError){status=400;code='INVALID_JSON';message='JSON ไม่ถูกต้อง';}
 if(status===500)console.error('API error',res.locals.requestId,error instanceof Error?error.name:'Unknown');
 res.status(status).json({error:{code,message,requestId:res.locals.requestId}});
});
