import { Router } from 'express';
import { z } from 'zod';
import { createHmac } from 'node:crypto';
import { db } from './db.js';
import { config } from './config.js';
import { authenticate, admin } from './auth.js';
import { route, fail } from './http.js';
import { catalogSearch, content, normalize } from './catalog.js';
const eventSchema=z.object({eventId:z.string().uuid(),type:z.enum(['search','disease-open','focus-open','comparison-open','copy-success','copy-fallback']),diseaseId:z.string().max(150).optional(),focusId:z.string().max(150).optional(),secondFocusId:z.string().max(150).optional(),searchRequestId:z.string().uuid().optional(),query:z.string().max(200).optional(),catalogType:z.enum(['all','disease','procedure','nursing-diagnosis','code-system']).default('all')}).strict();
export const eventsRouter=Router();
eventsRouter.post('/',route(async(req,res)=>{
 const b=eventSchema.parse(req.body);const c=await content();
 const focus=c.focuses.find(f=>f.id===b.focusId);const disease=c.diseases.find(d=>d.id===b.diseaseId);
 if(b.diseaseId&&!disease)fail(400,'INVALID_EVENT','ไม่พบโรค');
 if(b.focusId&&!focus)fail(400,'INVALID_EVENT','ไม่พบ Focus');
 if(focus&&b.diseaseId&&!focus.diseaseIds.includes(b.diseaseId))fail(400,'INVALID_EVENT','บริบทไม่ถูกต้อง');
 if(b.type==='disease-open'&&!disease)fail(400,'INVALID_EVENT','ต้องระบุโรค');
 if(['focus-open','copy-success','copy-fallback','comparison-open'].includes(b.type)&&!focus)fail(400,'INVALID_EVENT','ต้องระบุ Focus');
 if(b.type==='comparison-open'&&(!disease||b.focusId===b.secondFocusId||!c.focuses.some(f=>f.id===b.secondFocusId&&f.diseaseIds.includes(b.diseaseId!))))fail(400,'INVALID_EVENT','คู่เปรียบเทียบไม่ถูกต้อง');
 let resultCount:number|undefined;let queryFingerprint:string|undefined;let safeQueryLabel:string|undefined;
 if(b.type==='search') {
   if(!b.query?.trim())fail(400,'INVALID_EVENT','ต้องระบุคำค้น');
   const q=normalize(b.query!);resultCount=(await catalogSearch(q,b.catalogType)).filter(i=>i.to).length;
   // Only exact known catalog terms may be retained. Free text is counted, never persisted.
   const terms=[...c.diseases.flatMap(d=>[d.nameTh,d.nameEn,d.icdCode,...d.aliases,...d.abbreviations]),...c.focuses.flatMap(f=>[f.titleTh,f.titleEn,f.nandaCode??'']),...c.unverifiedCodes.flatMap(u=>[u.code,u.nameTh,u.nameEn])];
   if(terms.some(t=>normalize(t)===q)) {safeQueryLabel=q;queryFingerprint=createHmac('sha256',config.JWT_SECRET).update(q).digest('hex');}
 }
 await db.usageEvent.upsert({where:{eventId:b.eventId},update:{},create:{eventId:b.eventId,type:b.type,diseaseId:b.diseaseId,focusId:b.focusId,secondFocusId:b.secondFocusId,searchRequestId:b.searchRequestId,resultCount,queryFingerprint,safeQueryLabel}});
 res.status(202).json({data:{accepted:true}});
}));
export const analyticsRouter=Router();analyticsRouter.use(authenticate,admin);
function range(query:unknown){const p=z.object({from:z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),to:z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),limit:z.coerce.number().int().min(1).max(100).default(10)}).parse(query);const from=p.from?new Date(p.from+'T00:00:00+07:00'):new Date(Date.now()-30*86400000);const to=p.to?new Date(p.to+'T00:00:00+07:00'):new Date();if(!Number.isFinite(+from)||!Number.isFinite(+to)||from>=to)fail(400,'INVALID_RANGE','ช่วงวันที่ไม่ถูกต้อง');return{from,to,limit:p.limit};}
async function report(query:unknown){
 const r=range(query);const events=await db.usageEvent.findMany({where:{occurredAt:{gte:r.from,lt:r.to}}});const c=await content();
 const count=(type:string)=>events.filter(e=>e.type===type).length;const searches=count('search');
 const rank=(type:string,field:'diseaseId'|'focusId')=>{const counts=new Map<string,number>();for(const e of events.filter(e=>e.type===type)){const id=e[field];if(id)counts.set(id,(counts.get(id)??0)+1);}return [...counts].sort((a,b)=>b[1]-a[1]).slice(0,r.limit);};
 const demands=await db.contentDemand.findMany();const unmatched=new Map<string,number>();for(const e of events.filter(e=>e.type==='search'&&e.resultCount===0&&e.safeQueryLabel))unmatched.set(e.safeQueryLabel!,(unmatched.get(e.safeQueryLabel!)??0)+1);
 return{label:'สถิติการใช้งานจริง',periodLabel:`${r.from.toISOString()} – ${r.to.toISOString()} (ไม่รวมเวลาสิ้นสุด)`,disclaimer:'สถิติการใช้งานระบบ ไม่ใช่ตัวชี้วัดคุณภาพการพยาบาล ไม่เก็บคำค้นอิสระหรือข้อมูลผู้ป่วย',summaryMetrics:{totalSearchesCount:searches,compareOpensCount:count('comparison-open'),darCopiesCount:count('copy-success'),unmatchedRatePercent:searches?Math.round(events.filter(e=>e.type==='search'&&e.resultCount===0).length/searches*1000)/10:0},topSearchedDiseases:rank('disease-open','diseaseId').flatMap(([id,searchCount])=>{const d=c.diseases.find(d=>d.id===id);return d?[{diseaseId:id,nameTh:d.nameTh,abbr:d.abbreviations.join(' / '),icdCode:d.icdCode,searchCount}]:[];}),topOpenedFocuses:rank('focus-open','focusId').flatMap(([id,openCount])=>{const f=c.focuses.find(f=>f.id===id);return f?[{focusId:id,diseaseId:f.diseaseIds[0],titleTh:f.titleTh,nandaCode:f.nandaCode??'ยังไม่เทียบรหัส',openCount}]:[];}),unmatchedQueries:[...unmatched].sort((a,b)=>b[1]-a[1]).slice(0,r.limit).map(([query,count])=>({query,count,suggestedAction:demands.find(d=>d.safeQueryLabel===query)?.suggestedAction??'รอทีมเนื้อหาทบทวน'}))};
}
analyticsRouter.get('/',route(async(req,res)=>res.json({data:await report(req.query)})));
for(const [path,key] of [['summary','summaryMetrics'],['top-diseases','topSearchedDiseases'],['top-focuses','topOpenedFocuses'],['unmatched-queries','unmatchedQueries']] as const)analyticsRouter.get('/'+path,route(async(req,res)=>res.json({data:(await report(req.query))[key]})));
