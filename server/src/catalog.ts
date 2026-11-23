import { Router } from 'express';
import { Prisma } from '@prisma/client';
import { z } from 'zod';
import { db } from './db.js';
import { route, fail } from './http.js';
const order = { position: 'asc' as const };
const diseaseInclude = { terms: { orderBy: order }, codes: { orderBy: order }, considerations: { orderBy: order }, filters: { orderBy: order }, focuses: { where: { focus: { archivedAt: null } }, orderBy: { expertOrder: 'asc' as const } } } satisfies Prisma.DiseaseInclude;
const focusInclude = { diseases: { where: { disease: { archivedAt: null } }, orderBy: { contextOrder: 'asc' as const }, include: { filters: true } }, content: { orderBy: order }, differentials: { orderBy: order }, example: true, comparison: true, icnp: true, references: { orderBy: order }, nic: { orderBy: order }, noc: { orderBy: order, include: { indicators: { orderBy: order } } } } satisfies Prisma.FocusDiagnosisInclude;
function review(item: { reviewStatus: string; nextReviewDate: Date | null }) {
  if (item.reviewStatus === 'pending-review') return 'pending-review';
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Bangkok', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
  return item.nextReviewDate && item.nextReviewDate.toISOString().slice(0,10) <= today ? 'review-due' : item.reviewStatus;
}
const date = (d: Date | null) => d?.toISOString().slice(0,10) ?? 'รอหน่วยงานทบทวน';
export function diseaseDto(d: Prisma.DiseaseGetPayload<{ include: typeof diseaseInclude }>) {
  return { id: d.id, entityType: d.entityType, nameTh: d.nameTh, nameEn: d.nameEn, department: d.department, shortSummary: d.shortSummary, provenanceStatus: d.provenanceStatus, reviewStatus: review(d), reviewedDate: date(d.reviewedDate), nextReviewDate: date(d.nextReviewDate), reviewerUnit: d.reviewerUnit, isSampleLabel: d.isSampleLabel,
    abbreviations: d.terms.filter(t => t.kind === 'abbreviation').map(t => t.value), aliases: d.terms.filter(t => t.kind === 'alias').map(t => t.value), icdCode: d.codes.map(c => c.code).join(' / '), codeSystem: d.codes[0]?.systemLabel ?? '', codeEdition: d.codes[0]?.edition ?? '', keyConsiderations: d.considerations.map(c => c.text), assessmentFilters: d.filters.map(f => ({ id: f.key, label: f.label, category: f.category })), focusIds: d.focuses.map(f => f.focusId) };
}
export function focusDto(f: Prisma.FocusDiagnosisGetPayload<{ include: typeof focusInclude }>, diseaseId?: string) {
  const context = f.diseases.find(d => d.diseaseId === diseaseId) ?? f.diseases[0];
  const lines = (kind: string) => f.content.filter(c => c.kind === kind).map(c => c.text);
  return { id: f.id, diseaseIds: f.diseases.map(d => d.diseaseId), expertOrder: context?.expertOrder ?? 0, nandaCode: f.nandaCode, nandaEdition: f.nandaEdition, titleTh: f.titleTh, titleEn: f.titleEn, shortDescription: f.shortDescription, problemType: f.problemType, checkSummary: f.checkSummary, goalSummary: f.goalSummary, provenanceStatus: f.provenanceStatus, reviewStatus: review(f), reviewedDate: date(f.reviewedDate), nextReviewDate: date(f.nextReviewDate), assessmentFilterIds: context?.filters.map(a => a.filterKey) ?? [], supportingCues: lines('supportingCue'), riskFactors: lines('riskFactor'), dataGuidelines: lines('dataGuideline'), actionGuidelines: lines('actionGuideline'), responseGuidelines: lines('responseGuideline'), commonPitfalls: lines('commonPitfall'), differentialPoints: f.differentials, educationalExample: f.example, compareSummary: f.comparison, icnpNote: f.icnp, references: f.references, nicInterventions: f.nic, nocOutcomes: f.noc.map(n => ({ ...n, indicators: n.indicators.map(i => i.text) })) };
}
export async function content() {
  const [ds, fs, groups, codes, unverified] = await Promise.all([db.disease.findMany({ where: { archivedAt: null }, include: diseaseInclude, orderBy: { catalogOrder: 'asc' } }), db.focusDiagnosis.findMany({ where: { archivedAt: null }, include: focusInclude }), db.abbreviationGroup.findMany({ include: { options: { orderBy: order } } }), db.codeSystemReference.findMany({ orderBy: order }), db.unverifiedCode.findMany()]);
  return { diseases: ds.map(diseaseDto), focuses: fs.map(f => focusDto(f)), abbreviations: groups, codeSystems: codes, unverifiedCodes: unverified };
}
export const normalize = (s: string) => s.normalize('NFKC').trim().toLowerCase();
export async function catalogSearch(q: string, type = 'all') {
  const c = await content(); const query = normalize(q);
  const items = [
    ...c.diseases.map(d => ({ key: `disease-${d.id}`, entityType: d.entityType, typeLabel: d.entityType === 'disease' ? 'โรค' : 'หัตถการ', titleTh: d.nameTh, titleEn: d.nameEn, abbreviations: d.abbreviations, aliases: d.aliases, codeSystemLabel: d.codeSystem, codeValue: d.icdCode, summary: d.shortSummary, department: d.department, reviewStatus: d.reviewStatus, reviewedDate: d.reviewedDate, to: `/disease/${d.id}` })),
    ...c.focuses.map(f => ({ key: `focus-${f.id}`, entityType: 'nursing-diagnosis', typeLabel: 'ข้อวินิจฉัยทางการพยาบาล', titleTh: f.titleTh, titleEn: f.titleEn, abbreviations: c.diseases.find(d => d.id === f.diseaseIds[0])?.abbreviations ?? [], codeSystemLabel: f.nandaEdition, codeValue: f.nandaCode ? `NANDA-I ${f.nandaCode}` : 'Focus จากเอกสาร (ยังไม่เทียบรหัส)', summary: f.shortDescription, reviewStatus: f.reviewStatus, reviewedDate: f.reviewedDate, to: f.diseaseIds[0] ? `/disease/${f.diseaseIds[0]}/focus/${f.id}` : `/focus/${f.id}` })),
    ...c.codeSystems.map(s => ({ key: `codesystem-${s.dataset}`, entityType: 'code-system', typeLabel: 'ชุดข้อมูลมาตรฐาน', titleTh: s.dataset, titleEn: '', abbreviations: [], codeSystemLabel: s.dataset, codeValue: s.dataset, summary: s.content, to: null, officialLabel: s.officialLabel, officialUrl: s.officialUrl, linkedCatalogFilter: s.dataset === 'NANDA-I' ? 'nursing-diagnosis' : s.dataset === 'ICD-10' ? 'disease' : 'procedure' })),
    ...(query && type === 'all' ? c.unverifiedCodes.map(u => ({ key: `unverified-${u.id}`, entityType: 'unverified', typeLabel: 'ยังไม่มีแนวทางที่ตรวจรับรอง', titleTh: u.nameTh, titleEn: u.nameEn, abbreviations: [], codeSystemLabel: u.codeSystem, codeValue: u.code, summary: u.reasonNote, reasonNote: u.reasonNote, to: null })) : []),
  ];
  return items.filter(i => (type === 'all' || i.entityType === type) && (!query ? (type !== 'all' || ['disease','procedure'].includes(i.entityType)) : normalize([i.titleTh, i.titleEn, i.codeValue, i.codeSystemLabel, i.summary, ...i.abbreviations, ...('aliases' in i && Array.isArray(i.aliases) ? i.aliases : [])].join(' ')).includes(query)));
}
const searchSchema = z.object({ q: z.string().max(200).default(''), type: z.enum(['all','disease','procedure','nursing-diagnosis','code-system']).default('all'), page: z.coerce.number().int().min(1).default(1), pageSize: z.coerce.number().int().min(1).max(100).default(20) });
export const catalogRouter = Router();
// Snapshot is cached by the frontend provider; clinical content remains database-backed.
catalogRouter.get('/content', route(async (_req, res) => res.json({ data: await content() })));
catalogRouter.get('/catalog', route(async (req, res) => { const p = searchSchema.parse(req.query); const items = await catalogSearch(p.q, p.type); res.json({ data: items.slice((p.page-1)*p.pageSize,p.page*p.pageSize), meta: { page: p.page, pageSize: p.pageSize, total: items.length, navigableCount: items.filter(i => i.to).length } }); }));
catalogRouter.get('/search/suggestions', route(async (req, res) => { const { q } = searchSchema.parse(req.query); const limit = z.coerce.number().int().min(1).max(8).default(8).parse(req.query.limit); res.json({ data: q.trim() ? (await catalogSearch(q)).slice(0,limit) : [] }); }));
catalogRouter.get('/abbreviations/:abbr', route(async (req, res) => res.json({ data: await db.abbreviationGroup.findUnique({ where: { normalizedAbbr: normalize(req.params.abbr) }, include: { options: { orderBy: order } } }) })));
catalogRouter.get('/code-systems', route(async (_req, res) => res.json({ data: await db.codeSystemReference.findMany({ orderBy: order }) })));
catalogRouter.get('/diseases', route(async (_req, res) => res.json({ data: (await content()).diseases })));
catalogRouter.get('/diseases/:id', route(async (req, res) => { const d = await db.disease.findFirst({ where: { id: req.params.id, archivedAt: null }, include: diseaseInclude }); if (!d) fail(404,'NOT_FOUND','ไม่พบข้อมูล'); res.json({ data: diseaseDto(d!) }); }));
catalogRouter.get('/diseases/:id/focuses', route(async (req, res) => {
  const p = z.object({ problemType: z.enum(['all','actual','risk']).default('all'), assessmentFilterIds: z.string().max(2000).default('') }).parse(req.query);
  const d = await db.disease.findFirst({ where: { id: req.params.id, archivedAt: null }, include: diseaseInclude }); if (!d) fail(404,'NOT_FOUND','ไม่พบข้อมูล');
  const ids = [...new Set(p.assessmentFilterIds.split(',').filter(Boolean))]; if (ids.some(id => !d!.filters.some(f => f.key === id))) fail(400,'INVALID_FILTER','ตัวกรองไม่อยู่ในโรคที่เลือก');
  const fs = await db.focusDiagnosis.findMany({ where: { archivedAt: null, diseases: { some: { diseaseId: req.params.id } } }, include: focusInclude });
  const all = fs.map(f => focusDto(f,req.params.id)).sort((a,b) => a.expertOrder-b.expertOrder);
  res.json({ data: all.filter(f => (p.problemType === 'all' || f.problemType === p.problemType) && ids.every(id => f.assessmentFilterIds.includes(id))), meta: { total: all.length, counts: { all: all.length, actual: all.filter(f => f.problemType==='actual').length, risk: all.filter(f => f.problemType==='risk').length } } });
}));
catalogRouter.get('/focuses/:id', route(async (req, res) => { const diseaseId = z.string().optional().parse(req.query.diseaseId); const f = await db.focusDiagnosis.findFirst({ where: { id: req.params.id, archivedAt: null }, include: focusInclude }); if (!f || (diseaseId && !f.diseases.some(d => d.diseaseId === diseaseId))) fail(404,'NOT_FOUND','ไม่พบข้อมูลในบริบทนี้'); res.json({ data: focusDto(f!, diseaseId) }); }));
catalogRouter.get('/comparisons', route(async (req, res) => {
  const p = z.object({ diseaseId: z.string(), focusAId: z.string(), focusBId: z.string() }).parse(req.query);
  if (p.focusAId === p.focusBId) fail(400,'INVALID_COMPARISON','เลือกสองปัญหาที่ต่างกัน');
  const c = await content(); const pair = [p.focusAId,p.focusBId].map(id => c.focuses.find(f => f.id===id && f.diseaseIds.includes(p.diseaseId)));
  if (pair.some(f=>!f)) fail(400,'INVALID_COMPARISON','ปัญหาต้องอยู่ในโรคเดียวกัน'); res.json({ data: { focusA: pair[0], focusB: pair[1] } });
}));
