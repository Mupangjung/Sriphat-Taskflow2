import { PrototypeAnalyticsData } from '../types/clinical';

export const MOCK_ANALYTICS: PrototypeAnalyticsData = {
  label: 'ข้อมูลจำลอง (Prototype Mock Data)',
  periodLabel: 'ช่วงเวลาจำลอง: 1–30 กันยายน 2568 (สำหรับประเมินรูปแบบหน้าจอเท่านั้น)',
  disclaimer:
    'ตัวเลขทั้งหมดในหน้านี้เป็นข้อมูลจำลองเพื่อประเมินความต้องการด้านเนื้อหาและการออกแบบ UI เท่านั้น ไม่ใช่ตัวชี้วัดคุณภาพบันทึกทางการพยาบาล และไม่ได้เชื่อมต่อกับเวชระเบียนหรือระบบติดตามการใช้งานจริง',
  summaryMetrics: {
    totalSearchesCount: 1420,
    compareOpensCount: 286,
    darCopiesCount: 514,
    unmatchedRatePercent: 11.4,
  },
  topSearchedDiseases: [
    {
      diseaseId: 'cap-pneumonia',
      nameTh: 'โรคปอดอักเสบชุมชน',
      abbr: 'CAP',
      icdCode: 'J18.9',
      searchCount: 412,
    },
    {
      diseaseId: 'adhf-heart-failure',
      nameTh: 'ภาวะหัวใจล้มเหลวเฉียบพลัน',
      abbr: 'ADHF / CHF',
      icdCode: 'I50.9',
      searchCount: 338,
    },
    {
      diseaseId: 'ischemic-stroke',
      nameTh: 'โรคหลอดเลือดสมองตีบหรืออุดตันเฉียบพลัน',
      abbr: 'CVA / Stroke',
      icdCode: 'I63.9',
      searchCount: 265,
    },
    {
      diseaseId: 'dka-diabetes',
      nameTh: 'ภาวะเลือดเป็นกรดจากคีโตนในผู้ป่วยเบาหวาน',
      abbr: 'DKA',
      icdCode: 'E10.1 / E11.1',
      searchCount: 194,
    },
    {
      diseaseId: 'aecopd',
      nameTh: 'โรคปอดอุดกั้นเรื้อรังกำเริบเฉียบพลัน',
      abbr: 'AECOPD',
      icdCode: 'J44.1',
      searchCount: 148,
    },
  ],
  topOpenedFocuses: [
    {
      focusId: 'cap-impaired-gas-exchange',
      diseaseId: 'cap-pneumonia',
      titleTh: 'การแลกเปลี่ยนก๊าซบกพร่อง',
      nandaCode: '00030',
      openCount: 310,
    },
    {
      focusId: 'adhf-excess-fluid-volume',
      diseaseId: 'adhf-heart-failure',
      titleTh: 'ปริมาณน้ำในร่างกายเกิน',
      nandaCode: '00026',
      openCount: 274,
    },
    {
      focusId: 'cap-ineffective-airway-clearance',
      diseaseId: 'cap-pneumonia',
      titleTh: 'การขับเสมหะไม่มีประสิทธิภาพ',
      nandaCode: '00031',
      openCount: 229,
    },
    {
      focusId: 'stroke-risk-cerebral-perfusion',
      diseaseId: 'ischemic-stroke',
      titleTh: 'ความเสี่ยงต่อการกำซาบเนื้อเยื่อสมองไม่มีประสิทธิภาพ',
      nandaCode: '00201',
      openCount: 185,
    },
    {
      focusId: 'dka-risk-unstable-glucose',
      diseaseId: 'dka-diabetes',
      titleTh: 'ความเสี่ยงต่อระดับน้ำตาลในเลือดไม่คงที่',
      nandaCode: '00179',
      openCount: 152,
    },
  ],
  unmatchedQueries: [
    {
      query: 'Sepsis / A41.9',
      count: 68,
      suggestedAction: 'เสนอคณะทำงานจัดทำเนื้อหา Sepsis & Septic Shock เป็นชุดถัดไป',
    },
    {
      query: 'STEMI / I21.9',
      count: 42,
      suggestedAction: 'อยู่ระหว่างรอหอผู้ป่วยหัวใจตรวจรับรองแนวทาง NANDA-I',
    },
    {
      query: 'UGIB / เลือดออกทางเดินอาหาร',
      count: 29,
      suggestedAction: 'รวบรวมความต้องการจากวอร์ดอายุรกรรมเพื่อเพิ่มในรอบทบทวนหน้า',
    },
    {
      query: 'AKI / ไตวายเฉียบพลัน',
      count: 23,
      suggestedAction: 'พิจารณาเพิ่มประเด็นสมดุลสารน้ำและเกลือแร่เฉพาะโรคไต',
    },
  ],
};

export const CLINICAL_GOVERNANCE_CHECKLIST = [
  {
    id: 'gov-1',
    title: 'ยืนยันโรคเริ่มต้น 3–5 โรคหลักของหอผู้ป่วย',
    detail: 'คัดเลือกโรคที่พบบ่อยในวอร์ดอายุรกรรม/ศัลยกรรม และกำหนดลำดับ Focus โดยผู้เชี่ยวชาญ',
    status: 'รอคณะทำงานยืนยัน',
  },
  {
    id: 'gov-2',
    title: 'ยืนยันฉบับ NANDA-I และคำแปลภาษาไทยที่ได้รับอนุญาต',
    detail: 'ตรวจสอบลิขสิทธิ์การใช้คำวินิจฉัย NANDA-I, NIC และ NOC สำหรับใช้งานในโรงพยาบาล',
    status: 'รอตรวจสอบสิทธิ์',
  },
  {
    id: 'gov-3',
    title: 'ตรวจสอบรูปแบบ Focus Charting (FAIE) ของโรงพยาบาล',
    detail: 'ยืนยันหัวข้อย่อย การระบุเวลา และข้อกำหนดการลงบันทึกของงานเวชระเบียน',
    status: 'สอดคล้องเบื้องต้น',
  },
  {
    id: 'gov-4',
    title: 'กำหนดผู้รับผิดชอบตรวจรับรองและรอบทบทวนเนื้อหา',
    detail: 'เช่น ทบทวนทุก 12 เดือน พร้อมแสดงสถานะ “ถึงรอบทบทวน” อัตโนมัติเมื่อครบกำหนด',
    status: 'กำหนดโครงสร้างแล้ว',
  },
];
