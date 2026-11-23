import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { pathToFileURL } from 'node:url';
import { MOCK_DISEASES, AMBIGUOUS_ABBREVIATIONS, UNVERIFIED_CODES } from '../src/data/mockDiseases';
import { MOCK_FOCUSES } from '../src/data/mockFocuses';
import { CLINICAL_GOVERNANCE_CHECKLIST } from '../src/data/mockAnalytics';
import { STANDARD_CODE_SYSTEMS } from '../src/data/codeSystems';

export function parseThaiDate(value: string): Date | null {
  if (value.includes('ยังไม่ได้') || value.includes('รอหน่วยงาน')) return null;
  const months = ['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
  const [day, month, year] = value.trim().split(/\s+/);
  const index = months.indexOf(month);
  if (index < 0 || !Number(day) || !Number(year)) throw new Error(`Invalid source date: ${value}`);
  return new Date(Date.UTC(Number(year) - 543, index, Number(day)));
}
const positioned = <T extends object>(items: T[]) => items.map((item, position) => ({ ...item, position }));
export async function seed(db: PrismaClient) {
  // Validate before any writes; never silently discard an inconsistent source link.
  for (const f of MOCK_FOCUSES) for (const id of f.diseaseIds) {
    const d = MOCK_DISEASES.find(d => d.id === id);
    if (!d || f.assessmentFilterIds.some(key => !d.assessmentFilters.some(a => a.id === key))) throw new Error(`Invalid focus relationship: ${f.id}/${id}`);
  }
  for (const d of MOCK_DISEASES) for (const id of d.focusIds) if (!MOCK_FOCUSES.some(f => f.id === id && f.diseaseIds.includes(d.id))) throw new Error(`Invalid disease relationship ${d.id}/${id}`);
  await db.$transaction(async tx => {
    for (const [catalogOrder, d] of MOCK_DISEASES.entries()) {
      const { abbreviations, aliases, keyConsiderations, assessmentFilters, focusIds, icdCode, codeSystem, codeEdition, reviewedDate, nextReviewDate, ...fields } = d;
      await tx.disease.upsert({ where: { id: d.id }, update: {}, create: {
        ...fields, catalogOrder, reviewedDate: parseThaiDate(reviewedDate), nextReviewDate: parseThaiDate(nextReviewDate),
        terms: { create: [...positioned(abbreviations.map(value => ({ kind: 'abbreviation', value, normalizedValue: value.normalize('NFKC').toLowerCase() }))), ...positioned(aliases.map(value => ({ kind: 'alias', value, normalizedValue: value.normalize('NFKC').toLowerCase() })))] },
        codes: { create: positioned(icdCode.split(/\s*\/\s*/).map(code => ({ code, systemLabel: codeSystem, edition: codeEdition }))) },
        considerations: { create: positioned(keyConsiderations.map(text => ({ text }))) },
        filters: { create: positioned(assessmentFilters.map(({ id, ...a }) => ({ ...a, key: id }))) },
      } });
    }
    for (const f of MOCK_FOCUSES) {
      const { diseaseIds, expertOrder, assessmentFilterIds, supportingCues, riskFactors, dataGuidelines, actionGuidelines, responseGuidelines, commonPitfalls, differentialPoints, educationalExample, compareSummary, icnpNote, references, nicInterventions, nocOutcomes, reviewedDate, nextReviewDate, ...fields } = f;
      const sections = { supportingCue: supportingCues, riskFactor: riskFactors, dataGuideline: dataGuidelines, actionGuideline: actionGuidelines, responseGuideline: responseGuidelines, commonPitfall: commonPitfalls };
      await tx.focusDiagnosis.upsert({ where: { id: f.id }, update: {}, create: {
        ...fields, reviewedDate: parseThaiDate(reviewedDate), nextReviewDate: parseThaiDate(nextReviewDate),
        content: { create: Object.entries(sections).flatMap(([kind, items]) => positioned(items.map(text => ({ kind, text })))) },
        differentials: { create: positioned(differentialPoints) }, example: { create: educationalExample }, comparison: { create: compareSummary }, icnp: { create: icnpNote },
        references: { create: positioned(references) }, nic: { create: positioned(nicInterventions) },
        noc: { create: positioned(nocOutcomes.map(({ indicators, ...item }) => ({ ...item, indicators: { create: positioned(indicators.map(text => ({ text }))) } }))) },
      } });
      for (const [contextOrder, diseaseId] of diseaseIds.entries()) {
        await tx.diseaseFocus.upsert({ where: { diseaseId_focusId: { diseaseId, focusId: f.id } }, update: {}, create: { diseaseId, focusId: f.id, expertOrder: MOCK_FOCUSES.filter(item => item.diseaseIds.includes(diseaseId)).sort((a,b) => a.expertOrder-b.expertOrder).findIndex(item => item.id === f.id) + 1, contextOrder, filters: { create: assessmentFilterIds.map(filterKey => ({ filterKey })) } } });
      }
    }
    for (const group of AMBIGUOUS_ABBREVIATIONS) await tx.abbreviationGroup.upsert({ where: { normalizedAbbr: group.abbr.toLowerCase() }, update: {}, create: { abbr: group.abbr, normalizedAbbr: group.abbr.toLowerCase(), promptText: group.promptText, options: { create: positioned(group.options) } } });
    for (const item of UNVERIFIED_CODES) await tx.unverifiedCode.upsert({ where: { codeSystem_code_entityType: { codeSystem: item.codeSystem, code: item.code, entityType: item.entityType } }, update: {}, create: item });
    for (const [position, item] of STANDARD_CODE_SYSTEMS.entries()) await tx.codeSystemReference.upsert({ where: { dataset: item.dataset }, update: {}, create: { ...item, position } });
    for (const [position, item] of CLINICAL_GOVERNANCE_CHECKLIST.entries()) await tx.governanceChecklistItem.upsert({ where: { id: item.id }, update: {}, create: { ...item, position } });
  }, { timeout: 60000 });
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const db = new PrismaClient();
  try { await seed(db); console.log(`Seed complete: ${MOCK_DISEASES.length} contexts, ${MOCK_FOCUSES.length} focuses (existing records preserved)`); }
  finally { await db.$disconnect(); }
}
