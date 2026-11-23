import { Router } from 'express';
import { z } from 'zod';
import { db } from './db.js';
import { authenticate } from './auth.js';
import { route, fail } from './http.js';
import { content } from './catalog.js';
export const favoritesRouter = Router();
favoritesRouter.use(authenticate);
export async function favorites(userId: string) {
  const [ds,fs] = await Promise.all([db.diseaseFavorite.findMany({ where: { userId, disease: { archivedAt: null } } }), db.focusFavorite.findMany({ where: { userId, context: { disease: { archivedAt: null }, focus: { archivedAt: null } } } })]);
  return [...ds.map(d=>({ type:'disease' as const,id:d.diseaseId,savedAt:d.savedAt.toISOString() })),...fs.map(f=>({ type:'focus' as const,id:f.focusId,diseaseId:f.diseaseId,savedAt:f.savedAt.toISOString() }))].sort((a,b)=>b.savedAt.localeCompare(a.savedAt));
}
const itemSchema = z.discriminatedUnion('type', [z.object({ type:z.literal('disease'),id:z.string().min(1).max(150),savedAt:z.string().datetime().optional() }).strict(), z.object({type:z.literal('focus'),id:z.string().min(1).max(150),diseaseId:z.string().min(1).max(150),savedAt:z.string().datetime().optional()}).strict()]);
async function validateItem(item:z.infer<typeof itemSchema>) {
  const d = await db.disease.findFirst({ where:{id:item.type==='disease'?item.id:item.diseaseId,archivedAt:null} });
  if (!d) fail(404,'NOT_FOUND','ไม่พบโรคหรือหัตถการ');
  if (item.type==='focus' && !await db.diseaseFocus.findFirst({where:{diseaseId:item.diseaseId,focusId:item.id,focus:{archivedAt:null}}})) fail(400,'INVALID_CONTEXT','Focus ไม่อยู่ในโรคที่ระบุ');
}
favoritesRouter.get('/',route(async(req,res)=> { const items=await favorites(req.auth!.userId); const c=await content();res.json({data:items,meta:{total:items.length},included:{diseases:c.diseases.filter(d=>items.some(i=>i.type==='disease'&&i.id===d.id)),focuses:c.focuses.filter(f=>items.some(i=>i.type==='focus'&&i.id===f.id))}}); }));
favoritesRouter.put('/diseases/:id',route(async(req,res)=>{await validateItem({type:'disease',id:req.params.id}); const key={userId:req.auth!.userId,diseaseId:req.params.id};await db.diseaseFavorite.upsert({where:{userId_diseaseId:key},update:{},create:key});res.json({data:await favorites(key.userId)});}));
favoritesRouter.put('/focuses/:id',route(async(req,res)=>{const b=z.object({diseaseId:z.string()}).strict().parse(req.body);await validateItem({type:'focus',id:req.params.id,...b});const key={userId:req.auth!.userId,focusId:req.params.id};await db.focusFavorite.upsert({where:{userId_focusId:key},update:{},create:{...key,...b}});res.json({data:await favorites(key.userId)});}));
favoritesRouter.delete('/diseases/:id',route(async(req,res)=>{await db.diseaseFavorite.deleteMany({where:{userId:req.auth!.userId,diseaseId:req.params.id}});res.status(204).end();}));
favoritesRouter.delete('/focuses/:id',route(async(req,res)=>{await db.focusFavorite.deleteMany({where:{userId:req.auth!.userId,focusId:req.params.id}});res.status(204).end();}));
favoritesRouter.delete('/',route(async(req,res)=>{const userId=req.auth!.userId;await db.$transaction([db.diseaseFavorite.deleteMany({where:{userId}}),db.focusFavorite.deleteMany({where:{userId}})]);res.status(204).end();}));
favoritesRouter.post('/import',route(async(req,res)=>{
  const {items}=z.object({items:z.array(itemSchema).max(500)}).strict().parse(req.body);
  // Entire import is rejected if an item is invalid; existing account favorites are retained.
  for(const item of items) await validateItem(item);
  const userId=req.auth!.userId;
  await db.$transaction(items.map(item=>item.type==='disease'?db.diseaseFavorite.upsert({where:{userId_diseaseId:{userId,diseaseId:item.id}},update:{},create:{userId,diseaseId:item.id}}):db.focusFavorite.upsert({where:{userId_focusId:{userId,focusId:item.id}},update:{},create:{userId,focusId:item.id,diseaseId:item.diseaseId}})));
  res.json({data:await favorites(userId)});
}));
