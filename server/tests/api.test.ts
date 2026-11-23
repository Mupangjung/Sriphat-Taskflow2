import { beforeAll, afterAll, describe, it, expect } from 'vitest';
import request from 'supertest';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { randomUUID } from 'node:crypto';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const directory=mkdtempSync(join(tmpdir(),'nursefocus-test-'));
process.env.DATABASE_URL='file:'+join(directory,'test.db');
process.env.JWT_SECRET='test-only-secret-with-at-least-32-characters';
process.env.APP_ORIGIN='http://localhost:3000';process.env.NODE_ENV='test';
writeFileSync(join(directory,'test.db'),'');
let app:typeof import('../src/app').app;
let db:typeof import('../src/db').db;
let seed:typeof import('../../prisma/seed').seed;
const password='Correct-Horse-Example-123';
let a:string,b:string,adminToken:string;
async function login(email:string){return request(app).post('/api/v1/auth/login').set('Origin',process.env.APP_ORIGIN!).send({email,password});}
beforeAll(async()=>{
 execFileSync(process.execPath,['node_modules/prisma/build/index.js','migrate','deploy'],{env:process.env,stdio:'pipe'});
 ({db}=await import('../src/db'));({app}=await import('../src/app'));({seed}=await import('../../prisma/seed'));
 await seed(db);
 for(const [email,role] of [['a@example.test','MEMBER'],['b@example.test','MEMBER'],['admin@example.test','ADMIN']])await db.user.create({data:{email,normalizedEmail:email,role,displayName:email,passwordHash:await bcrypt.hash(password,4)}});
 a=(await login('a@example.test')).body.data.accessToken;b=(await login('b@example.test')).body.data.accessToken;adminToken=(await login('admin@example.test')).body.data.accessToken;
});
afterAll(async()=>{await db?.$disconnect();rmSync(directory,{recursive:true,force:true});});
describe('migrations and content',()=>{
 it('seeds all sources idempotently, preserving pending review and nullable codes',async()=>{
  await seed(db);expect(await db.disease.count()).toBe(11);expect(await db.focusDiagnosis.count()).toBe(38);
  const r=await request(app).get('/api/v1/focuses/ref-lap-anxiety');expect(r.status).toBe(200);expect(r.body.data.reviewStatus).toBe('pending-review');expect(r.body.data.nandaCode).toBeNull();expect(r.body.data.references[0].pages).toBe('3–4');
 });
 it('enforces SQL check constraints and foreign keys',async()=>{
  await expect(db.$executeRawUnsafe('UPDATE "User" SET role = ? WHERE email = ?','OWNER','a@example.test')).rejects.toThrow();
  await expect(db.diseaseFavorite.create({data:{userId:'missing',diseaseId:'cap-pneumonia'}})).rejects.toThrow();
 });
 it('supports Thai, aliases, codes and ambiguous abbreviations',async()=>{
  for(const q of ['ปอดบวม','CAP','J18.9']){const r=await request(app).get('/api/v1/catalog').query({q});expect(r.status).toBe(200);expect(r.body.data.some((i:any)=>i.key==='disease-cap-pneumonia')).toBe(true);}
  const r=await request(app).get('/api/v1/abbreviations/CHF');expect(r.body.data.options.some((o:any)=>o.targetDiseaseId===null)).toBe(true);
  const u=await request(app).get('/api/v1/catalog?q=A41.9');expect(u.body.data.some((i:any)=>i.entityType==='unverified')).toBe(true);expect(u.body.meta.navigableCount).toBe(0);
 });
 it('uses AND filters, rejects foreign filters and returns stable per-disease order',async()=>{
  const r=await request(app).get('/api/v1/diseases/cap-pneumonia/focuses').query({assessmentFilterIds:'spo2-low,dyspnea'});
  expect(r.status).toBe(200);expect(r.body.data.length).toBeGreaterThan(0);expect(r.body.data.every((f:any)=>['spo2-low','dyspnea'].every(id=>f.assessmentFilterIds.includes(id)))).toBe(true);
  expect((await request(app).get('/api/v1/diseases/cap-pneumonia/focuses?assessmentFilterIds=unknown')).status).toBe(400);
  const copd=await request(app).get('/api/v1/diseases/aecopd/focuses');expect(copd.body.data).toHaveLength(5);expect(new Set(copd.body.data.map((f:any)=>f.expertOrder)).size).toBe(5);
 });
 it('rejects mismatched and identical comparison pairs',async()=>{
  for(const focusBId of ['cap-impaired-gas-exchange','adhf-excess-fluid-volume'])expect((await request(app).get('/api/v1/comparisons').query({diseaseId:'cap-pneumonia',focusAId:'cap-impaired-gas-exchange',focusBId})).status).toBe(400);
  expect((await request(app).get('/api/v1/comparisons').query({diseaseId:'cap-pneumonia',focusAId:'cap-impaired-gas-exchange',focusBId:'cap-ineffective-airway-clearance'})).status).toBe(200);
 });
});
describe('authentication and ownership',()=>{
 it('rejects invalid credentials, origin and expired JWT',async()=>{
  expect((await request(app).post('/api/v1/auth/login').set('Origin',process.env.APP_ORIGIN!).send({email:'a@example.test',password:'wrong'})).status).toBe(401);
  expect((await request(app).post('/api/v1/auth/login').set('Origin','https://other.example').send({email:'a@example.test',password})).status).toBe(403);
  const expired=jwt.sign({sid:'invalid'},process.env.JWT_SECRET!,{expiresIn:-1,issuer:'nursefocus',audience:'nursefocus-web',subject:'none'});
  expect((await request(app).get('/api/v1/auth/me').auth(expired,{type:'bearer'})).status).toBe(401);
 });
 it('rotates refresh tokens and revokes the family on reuse',async()=>{
  const first=await login('a@example.test');const cookie=first.headers['set-cookie'][0].split(';')[0];
  const rotated=await request(app).post('/api/v1/auth/refresh').set('Origin',process.env.APP_ORIGIN!).set('Cookie',cookie);expect(rotated.status).toBe(200);
  const replay=await request(app).post('/api/v1/auth/refresh').set('Origin',process.env.APP_ORIGIN!).set('Cookie',cookie);expect(replay.status).toBe(401);
  expect((await request(app).get('/api/v1/auth/me').auth(rotated.body.data.accessToken,{type:'bearer'})).status).toBe(401);
 });
 it('logout invalidates access tokens immediately',async()=>{
  const first=await login('b@example.test');await request(app).post('/api/v1/auth/logout').set('Origin',process.env.APP_ORIGIN!).set('Cookie',first.headers['set-cookie'][0].split(';')[0]);
  expect((await request(app).get('/api/v1/auth/me').auth(first.body.data.accessToken,{type:'bearer'})).status).toBe(401);
 });
 it('isolates users and makes favorite writes idempotent',async()=>{
  for(let n=0;n<2;n++)expect((await request(app).put('/api/v1/me/favorites/diseases/cap-pneumonia').auth(a,{type:'bearer'})).status).toBe(200);
  expect((await request(app).get('/api/v1/me/favorites').auth(a,{type:'bearer'})).body.data).toHaveLength(1);
  await request(app).delete('/api/v1/me/favorites/diseases/cap-pneumonia').auth(b,{type:'bearer'});
  expect((await request(app).get('/api/v1/me/favorites').auth(a,{type:'bearer'})).body.data).toHaveLength(1);
  expect((await request(app).get('/api/v1/me/favorites').auth(b,{type:'bearer'})).body.data).toHaveLength(0);
  expect((await request(app).put('/api/v1/me/favorites/focuses/cap-impaired-gas-exchange').auth(a,{type:'bearer'}).send({diseaseId:'aecopd'})).status).toBe(400);
 });
 it('imports without duplicates and clears both favorite types',async()=>{
  const items=[{type:'disease',id:'cap-pneumonia'},{type:'focus',id:'cap-impaired-gas-exchange',diseaseId:'cap-pneumonia'}];
  for(let n=0;n<2;n++)expect((await request(app).post('/api/v1/me/favorites/import').auth(a,{type:'bearer'}).send({items})).body.data).toHaveLength(2);
  expect((await request(app).post('/api/v1/me/favorites/import').auth(a,{type:'bearer'}).send({items:[{type:'disease',id:'missing'}]})).status).toBe(404);
  await request(app).delete('/api/v1/me/favorites').auth(a,{type:'bearer'});expect((await request(app).get('/api/v1/me/favorites').auth(a,{type:'bearer'})).body.data).toHaveLength(0);
 });
 it('restricts admin access and rejects overlong bcrypt input',async()=>{
  expect((await request(app).get('/api/v1/analytics').auth(a,{type:'bearer'})).status).toBe(403);
  expect((await request(app).post('/api/v1/admin/users').auth(adminToken,{type:'bearer'}).send({email:'new@example.test',displayName:'New',password:'ก'.repeat(25)})).status).toBe(400);
  const created=await request(app).post('/api/v1/admin/users').auth(adminToken,{type:'bearer'}).send({email:'new@example.test',displayName:'New',password});expect(created.status).toBe(201);expect(created.body.data.passwordHash).toBeUndefined();
  const session=await login('new@example.test');await request(app).patch('/api/v1/admin/users/'+created.body.data.id).auth(adminToken,{type:'bearer'}).send({isActive:false});
  expect((await request(app).get('/api/v1/auth/me').auth(session.body.data.accessToken,{type:'bearer'})).status).toBe(401);
 });
});
describe('analytics privacy and counts',()=>{
 it('starts at zero and uses an exclusive Bangkok end date',async()=>{
  const r=await request(app).get('/api/v1/analytics?from=2020-01-01&to=2020-01-02').auth(adminToken,{type:'bearer'});expect(r.body.data.summaryMetrics.unmatchedRatePercent).toBe(0);expect(r.body.data.periodLabel).toContain('2019-12-31T17:00:00.000Z');
 });
 it('deduplicates events and never persists free-text searches',async()=>{
  const event={eventId:randomUUID(),type:'search',query:'patient-private-value-12345'};
  for(let n=0;n<2;n++)expect((await request(app).post('/api/v1/events').send(event)).status).toBe(202);
  const stored=await db.usageEvent.findUniqueOrThrow({where:{eventId:event.eventId}});expect(stored.safeQueryLabel).toBeNull();expect(stored.queryFingerprint).toBeNull();expect(stored.resultCount).toBe(0);
  const r=await request(app).get('/api/v1/analytics').auth(adminToken,{type:'bearer'});expect(r.body.data.summaryMetrics.totalSearchesCount).toBe(1);expect(r.body.data.summaryMetrics.unmatchedRatePercent).toBe(100);expect(r.body.data.unmatchedQueries).toHaveLength(0);
 });
 it('counts successful copies separately from fallback',async()=>{
  for(const type of ['copy-success','copy-fallback'])await request(app).post('/api/v1/events').send({eventId:randomUUID(),type,focusId:'ref-lap-anxiety',diseaseId:'proc-endometriosis-laparoscopy'});
  const r=await request(app).get('/api/v1/analytics/summary').auth(adminToken,{type:'bearer'});expect(r.body.data.darCopiesCount).toBe(1);
 });
});
