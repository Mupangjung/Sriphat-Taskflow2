export interface CodeSystemReferenceRow {
  dataset: string;
  content: string;
  officialLabel: string;
  officialUrl: string;
}

export const STANDARD_CODE_SYSTEMS: CodeSystemReferenceRow[] = [
  {
    dataset: 'NANDA-I',
    content: 'ข้อวินิจฉัยทางการพยาบาล',
    officialLabel: 'NANDA: หนังสือและการจัดหมวด',
    officialUrl: 'https://nanda.org/nanda-book/',
  },
  {
    dataset: 'ICD-10',
    content: 'โรค อาการ และภาวะสุขภาพ ไม่ใช่รายการข้อวินิจฉัยทางการพยาบาล',
    officialLabel: 'WHO: ICD-10 Browser',
    officialUrl: 'https://icd.who.int/browse10/2019/en',
  },
  {
    dataset: 'ICD-9-CM',
    content: 'มีทั้งรหัสวินิจฉัยและรหัสหัตถการ โดยต้องแยกหมวด',
    officialLabel: 'CMS: รายการรหัสและชื่อเต็ม',
    officialUrl:
      'https://www.cms.gov/medicare/coding-billing/icd-10-codes/icd-9-cm-diagnosis-procedure-codes-abbreviated-and-full-code-titles',
  },
];
