export type ClinicalEntityType = 'disease' | 'procedure' | 'nursing-diagnosis';

export type ReviewStatus = 'verified' | 'review-due';

export type FocusProblemType = 'actual' | 'risk';

export type ProvenanceStatus =
  | 'แนวทางที่หน่วยงานทบทวน'
  | 'การเชื่อมโยงจากเอกสารอ้างอิง';

export interface AssessmentFilterOption {
  id: string;
  label: string;
  category: 'อาการสำคัญ' | 'สัญญาณชีพ/ผลตรวจ' | 'ความเสี่ยง/หัตถการ';
}

export interface ClinicalReference {
  title: string;
  source: string;
  edition: string;
  year: string;
}

export interface NicInterventionItem {
  code: string;
  labelEn: string;
  labelTh: string;
  edition: string;
  guidelineNote: string;
}

export interface NocOutcomeItem {
  code: string;
  labelEn: string;
  labelTh: string;
  edition: string;
  indicators: string[];
}

export interface FocusDiagnosis {
  id: string;
  diseaseIds: string[];
  expertOrder: number;
  nandaCode: string;
  nandaEdition: string;
  titleTh: string;
  titleEn: string;
  shortDescription: string;
  problemType: FocusProblemType;
  assessmentFilterIds: string[];
  /** For 'actual' diagnoses: Defining characteristics */
  supportingCues: string[];
  /** For 'risk' diagnoses: Risk factors separated explicitly per PRD Sec 11 */
  riskFactors: string[];
  /** Short summary shown on Disease Overview card */
  checkSummary: string;
  /** Differential nursing reasoning against similar diagnoses */
  differentialPoints: {
    similarDiagnosis: string;
    howToDistinguish: string;
  }[];
  /** D — Data: Assessment cues to collect and record */
  dataGuidelines: string[];
  /** Expected goals & NOC linkage (optional expandable support) */
  goalSummary: string;
  nocOutcomes: NocOutcomeItem[];
  /** A — Action: Guidelines (NOT assertions of completed care) + NIC linkage */
  actionGuidelines: string[];
  nicInterventions: NicInterventionItem[];
  /** R — Response: Post-care evaluation cues with time prompt */
  responseGuidelines: string[];
  /** Common documentation omissions on IPD wards */
  commonPitfalls: string[];
  /** Hypothetical educational example clearly labeled */
  educationalExample: {
    contextNote: string;
    focusLabel: string;
    dataText: string;
    actionText: string;
    responseText: string;
  };
  /** Compare view concise fields */
  compareSummary: {
    definition: string;
    supporting: string;
    distinction: string;
    dataFocus: string;
    responseFocus: string;
  };
  /** ICNP next-phase separation note */
  icnpNote: {
    statusLabel: string;
    termExample: string;
    disclaimer: string;
  };
  provenanceStatus: ProvenanceStatus;
  reviewStatus: ReviewStatus;
  reviewedDate: string;
  nextReviewDate: string;
  references: ClinicalReference[];
}

export interface DiseaseItem {
  id: string;
  entityType: 'disease' | 'procedure';
  nameTh: string;
  nameEn: string;
  abbreviations: string[];
  aliases: string[];
  icdCode: string;
  codeSystem: string;
  codeEdition: string;
  department: string;
  shortSummary: string;
  keyConsiderations: string[];
  assessmentFilters: AssessmentFilterOption[];
  focusIds: string[];
  provenanceStatus: ProvenanceStatus;
  reviewStatus: ReviewStatus;
  reviewedDate: string;
  nextReviewDate: string;
  reviewerUnit: string;
  isSampleLabel: string;
}

export interface AmbiguousAbbreviationOption {
  labelTh: string;
  labelEn: string;
  codeLabel: string;
  targetDiseaseId: string | null;
  statusNote?: string;
}

export interface AmbiguousAbbreviationGroup {
  abbr: string;
  promptText: string;
  options: AmbiguousAbbreviationOption[];
}

export interface UnverifiedCodeEntry {
  code: string;
  codeSystem: string;
  nameTh: string;
  nameEn: string;
  entityType: ClinicalEntityType;
  reasonNote: string;
}

export type FavoriteItem =
  | {
      type: 'disease';
      id: string;
      savedAt: string;
    }
  | {
      type: 'focus';
      id: string;
      diseaseId: string;
      savedAt: string;
    };

export interface PrototypeAnalyticsData {
  label: string;
  periodLabel: string;
  disclaimer: string;
  summaryMetrics: {
    compareOpensCount: number;
    darCopiesCount: number;
    totalSearchesCount: number;
    unmatchedRatePercent: number;
  };
  topSearchedDiseases: {
    diseaseId: string;
    nameTh: string;
    abbr: string;
    icdCode: string;
    searchCount: number;
  }[];
  topOpenedFocuses: {
    focusId: string;
    diseaseId: string;
    titleTh: string;
    nandaCode: string;
    openCount: number;
  }[];
  unmatchedQueries: {
    query: string;
    count: number;
    suggestedAction: string;
  }[];
}
