import 'dotenv/config';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { db } from './db.js';
import { passwordSchema } from './auth.js';
const input=z.object({ADMIN_EMAIL:z.string().email(),ADMIN_PASSWORD:passwordSchema,ADMIN_NAME:z.string().min(1).default('Administrator')}).parse(process.env);
try {
 if(await db.user.count({where:{role:'ADMIN',isActive:true}}))throw new Error('An active administrator already exists. Use the authenticated user API.');
 await db.user.create({data:{email:input.ADMIN_EMAIL,normalizedEmail:input.ADMIN_EMAIL.toLowerCase(),displayName:input.ADMIN_NAME,passwordHash:await bcrypt.hash(input.ADMIN_PASSWORD,12),role:'ADMIN'}});
 console.log('Administrator created. Remove ADMIN_PASSWORD from your environment.');
}finally{await db.$disconnect();}
