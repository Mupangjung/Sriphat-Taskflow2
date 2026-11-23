import { app } from './app.js';
import { db } from './db.js';
import { config } from './config.js';
await db.$queryRawUnsafe('PRAGMA journal_mode = WAL');
await db.$executeRawUnsafe('PRAGMA foreign_keys = ON');
const server=app.listen(config.PORT,config.HOST,()=>console.log(`NurseFocus API: http://localhost:${config.PORT}`));
for(const signal of ['SIGINT','SIGTERM'])process.on(signal,()=>server.close(()=>{void db.$disconnect().then(()=>process.exit(0));}));
