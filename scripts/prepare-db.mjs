import 'dotenv/config';
import { mkdirSync, openSync, closeSync } from 'node:fs';
import { resolve, dirname, isAbsolute } from 'node:path';
const url = process.env.DATABASE_URL;
if (!url?.startsWith('file:')) throw new Error('Set DATABASE_URL to a local SQLite file in .env');
const name = url.slice(5);
const path = isAbsolute(name) ? name : resolve('prisma', name);
mkdirSync(dirname(path), { recursive: true });
closeSync(openSync(path, 'a')); // Never truncates an existing database.
