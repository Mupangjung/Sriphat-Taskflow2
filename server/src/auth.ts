import { Router } from 'express';
import type { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createHash, randomBytes, randomUUID } from 'node:crypto';
import { z } from 'zod';
import { db } from './db.js';
import { config } from './config.js';
import { route, fail } from './http.js';

declare global { namespace Express { interface Request { auth?: { userId: string; sessionId: string; role: string }; } } }
export const passwordSchema = z.string().min(12).refine(v => Buffer.byteLength(v, 'utf8') <= 72, 'รหัสผ่านต้องไม่เกิน 72 bytes');
const emailSchema = z.string().trim().email().max(254);
export const publicUser = (u: { id: string; email: string; displayName: string; role: string }) => ({ id: u.id, email: u.email, displayName: u.displayName, role: u.role });
const hash = (v: string) => createHash('sha256').update(v).digest('hex');
const cookieOptions = { httpOnly: true, secure: config.COOKIE_SECURE ? config.COOKIE_SECURE === 'true' : config.NODE_ENV === 'production', sameSite: 'lax' as const, path: '/api/v1/auth' };
function access(userId: string, sessionId: string) {
  return jwt.sign({ sid: sessionId }, config.JWT_SECRET, { algorithm: 'HS256', subject: userId, issuer: 'nursefocus', audience: 'nursefocus-web', expiresIn: '15m', jwtid: randomUUID() });
}
const tokenData = () => { const token = randomBytes(48).toString('base64url'); return { token, tokenHash: hash(token), expiresAt: new Date(Date.now() + 7 * 86400000) }; };
export const authenticate: RequestHandler = (req, res, next) => {
  void (async () => {
    const value = req.headers.authorization;
    if (!value?.startsWith('Bearer ')) fail(401, 'UNAUTHENTICATED', 'กรุณาเข้าสู่ระบบ');
    let claims: jwt.JwtPayload;
    try { claims = jwt.verify(value!.slice(7), config.JWT_SECRET, { algorithms: ['HS256'], issuer: 'nursefocus', audience: 'nursefocus-web' }) as jwt.JwtPayload; }
    catch { return fail(401, 'UNAUTHENTICATED', 'เซสชันหมดอายุ'); }
    if (typeof claims.sub !== 'string' || typeof claims.sid !== 'string') fail(401, 'UNAUTHENTICATED', 'เซสชันไม่ถูกต้อง');
    const session = await db.refreshSession.findUnique({ where: { id: claims.sid }, include: { user: true } });
    if (!session || session.userId !== claims.sub || session.revokedAt || session.expiresAt <= new Date() || !session.user.isActive) fail(401, 'UNAUTHENTICATED', 'เซสชันหมดอายุ');
    req.auth = { userId: session!.userId, sessionId: session!.id, role: session!.user.role };
    next();
  })().catch(next);
};
export const admin: RequestHandler = (req, _res, next) => { if (req.auth?.role !== 'ADMIN') return next(new Error('FORBIDDEN')); next(); };
export const originGuard: RequestHandler = (req, _res, next) => {
  if (req.headers.origin !== config.APP_ORIGIN) { try { fail(403, 'INVALID_ORIGIN', 'ต้นทางคำขอไม่ถูกต้อง'); } catch (e) { next(e); } return; }
  next();
};
export const authRouter = Router();
authRouter.post('/login', originGuard, route(async (req, res) => {
  const body = z.object({ email: emailSchema, password: z.string().min(1).refine(v => Buffer.byteLength(v, 'utf8') <= 72) }).strict().parse(req.body);
  const user = await db.user.findUnique({ where: { normalizedEmail: body.email.toLowerCase() } });
  // Always compare against a valid hash to reduce account enumeration through timing.
  const valid = await bcrypt.compare(body.password, user?.passwordHash ?? '$2b$12$C6UzMDM.H6dfI/f/IKcEe.3x5rEw7M8mXtQZ0lS8h5mC5b4b4vF5K');
  if (!user?.isActive || !valid) fail(401, 'INVALID_CREDENTIALS', 'อีเมลหรือรหัสผ่านไม่ถูกต้อง');
  const data = tokenData();
  const session = await db.refreshSession.create({ data: { userId: user!.id, familyId: randomUUID(), tokenHash: data.tokenHash, expiresAt: data.expiresAt } });
  res.cookie('refresh', data.token, { ...cookieOptions, expires: data.expiresAt });
  res.json({ data: { user: publicUser(user!), accessToken: access(user!.id, session.id) } });
}));
authRouter.post('/refresh', originGuard, route(async (req, res) => {
  const token = z.string().min(20).max(256).safeParse(req.cookies.refresh);
  if (!token.success) fail(401, 'UNAUTHENTICATED', 'กรุณาเข้าสู่ระบบ');
  const old = await db.refreshSession.findUnique({ where: { tokenHash: hash(token.data!) }, include: { user: true } });
  if (!old || old.expiresAt <= new Date() || !old.user.isActive) fail(401, 'UNAUTHENTICATED', 'เซสชันหมดอายุ');
  if (old!.revokedAt) {
    await db.refreshSession.updateMany({ where: { familyId: old!.familyId }, data: { revokedAt: new Date() } });
    res.clearCookie('refresh', cookieOptions);
    fail(401, 'TOKEN_REUSE', 'กรุณาเข้าสู่ระบบใหม่');
  }
  const data = tokenData();
  const session = await db.$transaction(async tx => {
    const claimed = await tx.refreshSession.updateMany({ where: { id: old!.id, revokedAt: null }, data: { revokedAt: new Date() } });
    if (claimed.count !== 1) fail(401, 'TOKEN_REUSE', 'กรุณาเข้าสู่ระบบใหม่');
    const created = await tx.refreshSession.create({ data: { userId: old!.userId, familyId: old!.familyId, tokenHash: data.tokenHash, expiresAt: data.expiresAt } });
    await tx.refreshSession.update({ where: { id: old!.id }, data: { replacedById: created.id } });
    return created;
  }).catch(async error => {
    if (error instanceof Error && 'code' in error && error.code === 'TOKEN_REUSE') await db.refreshSession.updateMany({ where: { familyId: old!.familyId }, data: { revokedAt: new Date() } });
    throw error;
  });
  res.cookie('refresh', data.token, { ...cookieOptions, expires: data.expiresAt });
  res.json({ data: { user: publicUser(old!.user), accessToken: access(old!.userId, session.id) } });
}));
authRouter.post('/logout', originGuard, route(async (req, res) => {
  if (typeof req.cookies.refresh === 'string') {
    const session = await db.refreshSession.findUnique({ where: { tokenHash: hash(req.cookies.refresh) } });
    if (session) await db.refreshSession.updateMany({ where: { familyId: session.familyId }, data: { revokedAt: new Date() } });
  }
  res.clearCookie('refresh', cookieOptions).status(204).end();
}));
authRouter.get('/me', authenticate, route(async (req, res) => res.json({ data: publicUser((await db.user.findUniqueOrThrow({ where: { id: req.auth!.userId } }))) })));
authRouter.put('/password', authenticate, route(async (req, res) => {
  const body = z.object({ oldPassword: z.string().max(256), password: passwordSchema }).strict().parse(req.body);
  const user = await db.user.findUniqueOrThrow({ where: { id: req.auth!.userId } });
  if (!await bcrypt.compare(body.oldPassword, user.passwordHash)) fail(401, 'INVALID_CREDENTIALS', 'รหัสผ่านเดิมไม่ถูกต้อง');
  const passwordHash = await bcrypt.hash(body.password, 12);
  await db.$transaction([db.user.update({ where: { id: user.id }, data: { passwordHash } }), db.refreshSession.updateMany({ where: { userId: user.id }, data: { revokedAt: new Date() } })]);
  res.clearCookie('refresh', cookieOptions).status(204).end();
}));
export const usersRouter = Router();
usersRouter.use(authenticate, admin);
usersRouter.post('/', route(async (req, res) => {
  const b = z.object({ email: emailSchema, displayName: z.string().trim().min(1).max(100), password: passwordSchema, role: z.enum(['MEMBER','ADMIN']).default('MEMBER') }).strict().parse(req.body);
  const user = await db.user.create({ data: { email: b.email, normalizedEmail: b.email.toLowerCase(), displayName: b.displayName, role: b.role, passwordHash: await bcrypt.hash(b.password, 12) } });
  res.status(201).json({ data: publicUser(user) });
}));
usersRouter.patch('/:id', route(async (req, res) => {
  const b = z.object({ displayName: z.string().trim().min(1).max(100).optional(), role: z.enum(['MEMBER','ADMIN']).optional(), isActive: z.boolean().optional() }).strict().parse(req.body);
  if (req.params.id === req.auth!.userId && (b.isActive === false || b.role === 'MEMBER')) fail(409, 'SELF_LOCKOUT', 'ไม่สามารถปิดสิทธิ์ผู้ดูแลของตนเอง');
  const user = await db.$transaction(async tx => {
    const u = await tx.user.update({ where: { id: req.params.id }, data: b });
    if (b.isActive === false || b.role) await tx.refreshSession.updateMany({ where: { userId: u.id }, data: { revokedAt: new Date() } });
    return u;
  });
  res.json({ data: publicUser(user) });
}));
