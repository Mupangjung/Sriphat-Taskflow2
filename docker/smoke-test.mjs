// Run against the local Docker stack only. Creates and removes its own test user.
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { randomBytes, randomUUID } from 'node:crypto';
import { setTimeout } from 'node:timers/promises';
import { readFileSync } from 'node:fs';
import { parse } from 'dotenv';
const env = parse(readFileSync('.env.docker'));
const origin = env.APP_ORIGIN || 'http://localhost:8080';
const compose = ['compose', '--env-file', '.env.docker'];
const run = args => execFileSync('docker', [...compose, ...args], { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'] });
const email = `docker-smoke-${randomUUID()}@example.invalid`;
const password = randomBytes(24).toString('base64url');
const query = (code, args = []) => run(['exec', '-T', 'api', 'node', '--input-type=module', '-e', code, ...args]);
const userId = query(`import {PrismaClient} from '@prisma/client'; import bcrypt from 'bcrypt'; const db=new PrismaClient(); try { const user=await db.user.create({data:{email:process.argv[1],normalizedEmail:process.argv[1],displayName:'Temporary Docker smoke test',passwordHash:await bcrypt.hash(process.argv[2],12)}}); console.log(user.id); } finally { await db.$disconnect(); }`, [email, password]).trim();
try {
  for (const route of ['/', '/account', '/disease/cap-pneumonia']) {
    const r = await fetch(origin + route); assert.equal(r.status, 200); assert.match(await r.text(), /<div id="root"><\/div>/);
  }
  const c = await fetch(origin + '/api/v1/content').then(r => r.json());
  assert.equal(c.data.diseases.length, 11); assert.equal(c.data.focuses.length, 38);
  const notFound = await fetch(origin + '/api/v1/does-not-exist'); assert.equal(notFound.status, 404); assert.match(notFound.headers.get('content-type'), /json/);
  const login = async () => {
    const r = await fetch(origin + '/api/v1/auth/login', { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
    assert.equal(r.status, 200); assert.match(r.headers.get('set-cookie'), /HttpOnly/i);
    assert.equal(/; Secure/i.test(r.headers.get('set-cookie')), env.COOKIE_SECURE === 'true');
    return r.json();
  };
  const signed = await login();
  const saved = await fetch(origin + '/api/v1/me/favorites/diseases/cap-pneumonia', { method: 'PUT', headers: { Authorization: 'Bearer ' + signed.data.accessToken } }); assert.equal(saved.status, 200);
  // Recreate the API, rather than just restarting its process, to check the named volume.
  run(['up', '-d', '--no-deps', '--force-recreate', '--wait', 'api']);
  for (let i = 0; i < 20; i++) {
    if ((await fetch(origin + '/api/health')).ok) break;
    await setTimeout(1000);
  }
  const again = await login();
  const favorites = await fetch(origin + '/api/v1/me/favorites', { headers: { Authorization: 'Bearer ' + again.data.accessToken } }).then(r => r.json());
  assert(favorites.data.some(f => f.id === 'cap-pneumonia'));
  console.log('PASS: SPA routes, API proxy, 11 contexts/38 focuses, login cookies, and SQLite favorites after container recreation');
} finally {
  query(`import {PrismaClient} from '@prisma/client'; const db=new PrismaClient(); try { await db.user.delete({where:{id:process.argv[1]}}); } finally {await db.$disconnect();}`, [userId]);
}
