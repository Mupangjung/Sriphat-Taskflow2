import { DOCUMENT_FOCUSES } from './documentDiagnoses';
import { FocusDiagnosis } from '../types/clinical';

export const MOCK_FOCUSES: FocusDiagnosis[] = [
  // ================= CAP =================
  {
    id: 'cap-impaired-gas-exchange',
    diseaseIds: ['cap-pneumonia'],
    expertOrder: 1,
    nandaCode: '00030',
    nandaEdition: 'NANDA-I 2021–2023 (ฉบับภาษาไทยเพื่อการทดสอบ)',
    titleTh: 'การแลกเปลี่ยนก๊าซบกพร่อง',
    titleEn: 'Impaired Gas Exchange',
    shortDescription:
      'ภาวะที่มีออกซิเจนหรือคาร์บอนไดออกไซด์ผ่านเยื่อหุ้มถุงลมและหลอดเลือดฝอยปอดได้ไม่สมดุลจากสารคัดหลั่งหรือการอักเสบในถุงลม',
    problemType: 'actual',
    assessmentFilterIds: ['spo2-low', 'dyspnea'],
    supportingCues: [
      'ระดับความอิ่มตัวของออกซิเจนปลายนิ้ว (SpO₂) ต่ำกว่าเกณฑ์เป้าหมายของผู้ป่วย (เช่น < 94% ในผู้ที่ไม่มีภาวะคาร์บอนไดออกไซด์คั่งเรื้อรัง)',
      'ผลก๊าซในหลอดเลือดแดง (ABG) พบ PaO₂ ลดลง หรือ PaCO₂ ผิดปกติ',
      'หายใจหอบเหนื่อย กระสับกระส่าย สับสน หรือมีอาการเขียวคล้ำบริเวณริมฝีปาก/ปลายนิ้ว',
      'ฟังเสียงปอดพบ Fine crackles หรือ Bronchial breath sounds บริเวณรอยโรค',
    ],
    riskFactors: [],
    checkSummary: 'ตรวจค่า SpO₂, ลักษณะการหายใจ, อาการซึม/กระสับกระส่าย และผล ABG (ถ้ามี)',
    differentialPoints: [
      {
        similarDiagnosis: 'การขับเสมหะไม่มีประสิทธิภาพ (00031)',
        howToDistinguish:
          'Impaired Gas Exchange เน้นความบกพร่องระดับถุงลมและค่าออกซิเจน/ก๊าซในเลือด (SpO₂, ABG, สับสน) ส่วน Ineffective Airway Clearance เน้นเสมหะคั่งค้าง เสียงเสมหะ (Rhonchi/Coarse crackles) และการไอขับออกไม่ได้',
      },
      {
        similarDiagnosis: 'รูปแบบการหายใจไม่มีประสิทธิภาพ (00032)',
        howToDistinguish:
          'Ineffective Breathing Pattern เน้นความผิดปกติของอัตรา จังหวะ ความลึก และการใช้กล้ามเนื้อช่วยหายใจ แม้ค่า SpO₂ อาจยังอยู่ในเกณฑ์ในช่วงแรก',
      },
    ],
    dataGuidelines: [
      'บันทึกอัตราการหายใจ ลักษณะการใช้กล้ามเนื้อช่วยหายใจ หรือปีกจมูกบาน',
      'ระบุค่า SpO₂ พร้อมระบุว่าวัดขณะหายใจอากาศปกติ (Room air) หรือได้รับออกซิเจนชนิดใด/อัตราเท่าใด',
      'บันทึกระดับความรู้สึกตัว (เช่น ตื่นดี สับสน กระสับกระส่าย) และสีผิว/เยื่อบุ',
      'บันทึกผล ABG หรือภาพถ่ายรังสีทรวงอกเฉพาะที่มีรายงานผลจริงในเวชระเบียน',
    ],
    goalSummary:
      'ผู้ป่วยมีการแลกเปลี่ยนก๊าซเพียงพอ ค่า SpO₂ อยู่ในเกณฑ์เป้าหมายของแผนการรักษา และไม่พบอาการแสดงของภาวะพร่องออกซิเจนเพิ่มขึ้น',
    nocOutcomes: [
      {
        code: '0402',
        labelEn: 'Respiratory Status: Gas Exchange',
        labelTh: 'ภาวะการหายใจ: การแลกเปลี่ยนก๊าซ',
        edition: 'NOC 6th Edition',
        indicators: [
          'ค่าความอิ่มตัวของออกซิเจน (SpO₂) ตามเกณฑ์ที่แพทย์กำหนด',
          'ความสมดุลของระดับความรู้สึกตัว ไม่สับสนหรือกระสับกระส่ายจากภาวะพร่องออกซิเจน',
          'ภาวะเขียวคล้ำ (Cyanosis) ลดลงหรือไม่มี',
        ],
      },
    ],
    actionGuidelines: [
      'พิจารณาจัดท่านอนศีรษะสูง (Semi-Fowler’s หรือ High-Fowler’s 30–45 องศา) เพื่อเพิ่มการขยายตัวของทรวงอก',
      'ดูแลให้ออกซิเจนบำบัดตามแผนการรักษา และตรวจสอบความถูกต้องของอุปกรณ์และอัตราการไหล',
      'ประเมินสัญญาณชีพ ค่า SpO₂ และอาการทางระบบประสาทตามความถี่ที่เหมาะสมกับความรุนแรง',
      'ประสานงานรายงานแพทย์ทันทีเมื่อค่า SpO₂ ลดลงต่อเนื่องหรือมีอาการหายใจล้มเหลว',
    ],
    nicInterventions: [
      {
        code: '3320',
        labelEn: 'Oxygen Therapy',
        labelTh: 'การบำบัดด้วยออกซิเจน',
        edition: 'NIC 7th Edition',
        guidelineNote: 'ใช้เป็นแนวทางประกอบการเขียน Intervention โดยบันทึกเฉพาะชนิดอุปกรณ์และอัตราที่ผู้ป่วยได้รับจริง',
      },
      {
        code: '3350',
        labelEn: 'Respiratory Monitoring',
        labelTh: 'การเฝ้าระวังระบบทางเดินหายใจ',
        edition: 'NIC 7th Edition',
        guidelineNote: 'ติดตามอัตรา จังหวะ ความลึก เสียงปอด และค่า SpO₂ อย่างเป็นระบบ',
      },
    ],
    responseGuidelines: [
      'บันทึกค่า SpO₂, อัตราการหายใจ และลักษณะการหายใจหลังจัดท่าหรือปรับออกซิเจน พร้อมระบุเวลาประเมินจริง [__ : __ น.]',
      'ประเมินว่าริมฝีปาก/ปลายนิ้ว และอาการกระสับกระส่ายเปลี่ยนแปลงอย่างไรโดยอ้างอิงข้อมูลที่สังเกตได้จริง',
      'หลีกเลี่ยงการเขียนเพียงคำว่า “อาการดีขึ้น” โดยไม่มีตัวเลขหรือลักษณะทางคลินิกประกอบ',
    ],
    commonPitfalls: [
      'บันทึกค่า SpO₂ โดยไม่ระบุว่าผู้ป่วยกำลังได้รับออกซิเจนชนิดใดและกี่ลิตรต่อนาที',
      'เขียนรวมปัญหาเสมหะคั่งค้างกับการแลกเปลี่ยนก๊าซโดยไม่แยกข้อมูล A (Assessment) ให้ตรงประเด็น',
      'ไม่ระบุเวลาที่ประเมินซ้ำในส่วน E (Evaluation) หลังให้การพยาบาล',
    ],
    educationalExample: {
      contextNote: 'ตัวอย่างกรณีศึกษาสมมติเพื่อการเรียนรู้ — ห้ามคัดลอกค่าตัวเลขไปใช้กับผู้ป่วยจริง',
      focusLabel: 'Impaired Gas Exchange (การแลกเปลี่ยนก๊าซบกพร่อง)',
      dataText:
        'เวลา 09.00 น. ผู้ป่วยหายใจหอบเหนื่อย RR 28 ครั้ง/นาที ใช้กล้ามเนื้อคอช่วยหายใจ SpO₂ 89% (Room air) ริมฝีปากซีดคล้ำเล็กน้อย กระสับกระส่าย ฟังปอดได้ยิน Fine crackles ที่ชายปอดขวา',
      actionText:
        'เวลา 09.05 น. จัดท่านอนศีรษะสูง 45 องศา ดูแลให้ออกซิเจนทาง Nasal cannula 3 LPM ตามแผนการรักษา แนะนำการหายใจเข้าลึกช้า และเฝ้าระวังสัญญาณชีพใกล้ชิด',
      responseText:
        'เวลา 09.30 น. หลังได้รับออกซิเจน 25 นาที ผู้ป่วยหายใจช้าลง RR 22 ครั้ง/นาที SpO₂ เพิ่มเป็น 95% (O₂ cannula 3 LPM) สีริมฝีปากชมพูขึ้น ลดอาการกระสับกระส่าย',
    },
    compareSummary: {
      definition: 'ความบกพร่องของการแลกเปลี่ยน O₂ และ CO₂ ที่ระดับถุงลมปอดและหลอดเลือดฝอย',
      supporting: 'SpO₂ ต่ำ, ผล ABG ผิดปกติ, หอบเหนื่อย, สับสน/กระสับกระส่าย, เขียวคล้ำ',
      distinction: 'ชี้วัดด้วยระดับออกซิเจนในเลือดและการกำซาบก๊าซ ไม่ใช่เพียงปริมาณเสมหะ',
      dataFocus: 'ค่า SpO₂ พร้อมระบุชนิด/อัตราออกซิเจน, ABG, ลักษณะการหายใจ, ระดับความรู้สึกตัว',
      responseFocus: 'ค่า SpO₂ และ RR หลังจัดท่า/ให้ออกซิเจน พร้อมเวลาประเมินจริง',
    },
    icnpNote: {
      statusLabel: 'ฟังก์ชันระยะถัดไป (ยังไม่เปิดใช้งานเทียบเคียงอัตโนมัติ)',
      termExample: 'ICNP Axis/Term: Impaired Gas Exchange (10001177) — อยู่ระหว่างจัดทำตารางเทียบมาตรฐาน',
      disclaimer: 'ไม่ถือว่าคำจาก NANDA-I และ ICNP มีความหมายเท่ากันโดยอัตโนมัติจนกว่าจะมีเอกสารเชื่อมโยงที่ตรวจรับรองแล้ว',
    },
    provenanceStatus: 'แนวทางที่หน่วยงานทบทวน',
    reviewStatus: 'verified',
    reviewedDate: '15 ส.ค. 2568',
    nextReviewDate: '15 ส.ค. 2569',
    references: [
      {
        title: 'NANDA International Nursing Diagnoses: Definitions and Classification',
        source: 'Herdman, T. H., Kamitsuru, S., & Lopes, C. T.',
        edition: '12th Edition (2021–2023)',
        year: '2021',
      },
      {
        title: 'แนวทางการดูแลผู้ป่วยโรคปอดอักเสบชุมชน หอผู้ป่วยอายุรกรรม',
        source: 'กลุ่มงานการพยาบาลผู้ป่วยใน (เอกสารทดสอบ)',
        edition: 'ฉบับปรับปรุง 2568',
        year: '2568',
      },
    ],
  },
  {
    id: 'cap-ineffective-airway-clearance',
    diseaseIds: ['cap-pneumonia'],
    expertOrder: 2,
    nandaCode: '00031',
    nandaEdition: 'NANDA-I 2021–2023 (ฉบับภาษาไทยเพื่อการทดสอบ)',
    titleTh: 'การขับเสมหะไม่มีประสิทธิภาพ',
    titleEn: 'Ineffective Airway Clearance',
    shortDescription:
      'ภาวะที่ผู้ป่วยไม่สามารถไอหรือขจัดสิ่งคัดหลั่งและสิ่งอุดกั้นออกจากทางเดินหายใจเพื่อให้ทางเดินหายใจโล่งได้',
    problemType: 'actual',
    assessmentFilterIds: ['sputum', 'dyspnea'],
    supportingCues: [
      'ไอไม่มีแรงหรือไอไม่เป็นผล (Ineffective cough) ทำให้มีเสมหะคั่งค้าง',
      'ฟังปอดพบเสียงผิดปกติของเสมหะ เช่น Rhonchi หรือ Coarse crackles',
      'มีเสมหะปริมาณมาก เหนียวข้น สีเหลือง/เขียว หรือต้องดูดเสมหะบ่อย',
      'หายใจเสียงดังครืดคราดหรือผู้ป่วยแจ้งว่ารู้สึกมีเสมหะติดคอ',
    ],
    riskFactors: [],
    checkSummary: 'ประเมินเสียงเสมหะ (Rhonchi/Coarse crackles), กำลังในการไอ, สีและปริมาณเสมหะ',
    differentialPoints: [
      {
        similarDiagnosis: 'การแลกเปลี่ยนก๊าซบกพร่อง (00030)',
        howToDistinguish:
          'ใช้ Ineffective Airway Clearance เมื่อปัญหาหลักคือสิ่งคัดหลั่งอุดกั้นทางเดินหายใจและกลไกการไอขับออกบกพร่อง ซึ่งมักดีขึ้นหลังการดูดเสมหะหรือฝึกไออย่างมีประสิทธิภาพ',
      },
    ],
    dataGuidelines: [
      'บันทึกลักษณะเสียงปอดที่พบ (เช่น Rhonchi, Coarse crackles) และตำแหน่งซ้าย/ขวา',
      'บรรยายลักษณะเสมหะ: ปริมาณ ความเหนียวข้น สี และกลิ่น',
      'ประเมินความสามารถในการไอขับเสมหะด้วยตนเองและปริมาณน้ำที่ผู้ป่วยได้รับ',
    ],
    goalSummary: 'ทางเดินหายใจโล่งขึ้น เสียงเสมหะลดลง และผู้ป่วยสามารถขับเสมหะออกได้สะดวกขึ้น',
    nocOutcomes: [
      {
        code: '0410',
        labelEn: 'Respiratory Status: Airway Patency',
        labelTh: 'ภาวะการหายใจ: ความโล่งของทางเดินหายใจ',
        edition: 'NOC 6th Edition',
        indicators: [
          'อัตราและจังหวะการหายใจสม่ำเสมอขึ้น',
          'ความสามารถในการขับเสมหะออกได้เอง',
          'เสียงหายใจผิดปกติ (Adventitious breath sounds) ลดลง',
        ],
      },
    ],
    actionGuidelines: [
      'กระตุ้นและสอนการไออย่างมีประสิทธิภาพ (Effective coughing) ร่วมกับจัดท่านอนศีรษะสูง',
      'ดูแลให้ได้รับน้ำอย่างเพียงพอตามแผนการรักษา (หากไม่มีข้อห้ามจำกัดน้ำ) เพื่อช่วยให้เสมหะอ่อนตัว',
      'ดูแลพ่นยาขยายหลอดลมหรือยาละลายเสมหะตามแผนการรักษา และพิจารณาเคาะปอด/ดูดเสมหะตามข้อบ่งชี้',
    ],
    nicInterventions: [
      {
        code: '3140',
        labelEn: 'Airway Management',
        labelTh: 'การจัดการทางเดินหายใจให้โล่ง',
        edition: 'NIC 7th Edition',
        guidelineNote: 'เลือกบันทึกเฉพาะหัตถการที่ปฏิบัติจริง เช่น สอนไอ พ่นยา หรือดูดเสมหะ',
      },
      {
        code: '3250',
        labelEn: 'Cough Enhancement',
        labelTh: 'การส่งเสริมประสิทธิภาพการไอ',
        edition: 'NIC 7th Edition',
        guidelineNote: 'สอนเทคนิค Deep breathing & huff/effective cough',
      },
    ],
    responseGuidelines: [
      'บันทึกปริมาณ สี ความเหนียวของเสมหะที่ขับออกหรือดูดได้จริง พร้อมเวลา [__ : __ น.]',
      'บันทึกเสียงปอดซ้ำหลังจัดการทางเดินหายใจ (เช่น เสียง Rhonchi ลดลงหรือไม่) และค่า SpO₂ ที่วัดได้จริง',
    ],
    commonPitfalls: [
      'เขียนว่า “ดูดเสมหะได้จำนวนมาก” โดยไม่ระบุลักษณะ สี และเสียงปอดก่อน–หลัง',
      'แนะนำให้ดื่มน้ำมาก ๆ ในผู้ป่วยที่มีโรคร่วมจำกัดน้ำ (เช่น หัวใจล้มเหลวหรือไตวาย)',
    ],
    educationalExample: {
      contextNote: 'ตัวอย่างกรณีศึกษาสมมติเพื่อการเรียนรู้ — ห้ามคัดลอกค่าตัวเลขไปใช้กับผู้ป่วยจริง',
      focusLabel: 'Ineffective Airway Clearance (การขับเสมหะไม่มีประสิทธิภาพ)',
      dataText:
        'เวลา 10.00 น. ผู้ป่วยไอมีเสียงครืดคราด ขับเสมหะไม่ออก ฟังปอดได้ยินเสียง Rhonchi ทั้งสองข้าง RR 26 ครั้ง/นาที SpO₂ 92% (Room air)',
      actionText:
        'เวลา 10.10 น. ดูแลพ่นยาขยายหลอดลมตามแผนการรักษา จัดท่านอนศีรษะสูง 45 องศา สอนการหายใจลึกและไออย่างมีประสิทธิภาพ พร้อมดูแลให้จิบน้ำอุ่น',
      responseText:
        'เวลา 10.40 น. ผู้ป่วยไอขับเสมหะสีเหลืองข้นออกได้ประมาณ 10 mL ฟังปอดเสียง Rhonchi ลดลง RR 22 ครั้ง/นาที SpO₂ 96% (Room air)',
    },
    compareSummary: {
      definition: 'ไม่สามารถขจัดเสมหะหรือสิ่งอุดกั้นออกจากทางเดินหายใจได้เพียงพอ',
      supporting: 'เสียง Rhonchi/Coarse crackles, เสมหะเหนียวข้น, ไอไม่มีแรง',
      distinction: 'มุ่งเน้นความโล่งของท่อทางเดินหายใจและการระบายเสมหะ',
      dataFocus: 'เสียงเสมหะในปอด, ลักษณะ/สีเสมหะ, ประสิทธิภาพการไอ',
      responseFocus: 'ปริมาณเสมหะที่ขับได้, เสียงปอดหลังจัดการทางเดินหายใจ',
    },
    icnpNote: {
      statusLabel: 'ฟังก์ชันระยะถัดไป (ยังไม่เปิดใช้งานเทียบเคียงอัตโนมัติ)',
      termExample: 'ICNP Term: Ineffective Airway Clearance — รอการทบทวนความสัมพันธ์',
      disclaimer: 'แยกชื่อระบบรหัสอย่างชัดเจนและยังไม่ใช้แทน NANDA-I',
    },
    provenanceStatus: 'แนวทางที่หน่วยงานทบทวน',
    reviewStatus: 'verified',
    reviewedDate: '15 ส.ค. 2568',
    nextReviewDate: '15 ส.ค. 2569',
    references: [
      {
        title: 'NANDA International Nursing Diagnoses: Definitions and Classification',
        source: 'Herdman, T. H., Kamitsuru, S., & Lopes, C. T.',
        edition: '12th Edition (2021–2023)',
        year: '2021',
      },
    ],
  },
  {
    id: 'cap-ineffective-breathing-pattern',
    diseaseIds: ['cap-pneumonia', 'aecopd'],
    expertOrder: 3,
    nandaCode: '00032',
    nandaEdition: 'NANDA-I 2021–2023 (ฉบับภาษาไทยเพื่อการทดสอบ)',
    titleTh: 'รูปแบบการหายใจไม่มีประสิทธิภาพ',
    titleEn: 'Ineffective Breathing Pattern',
    shortDescription:
      'ลักษณะการหายใจเข้าและ/หรือหายใจออกที่ไม่ช่วยให้เกิดการระบายอากาศ (Ventilation) อย่างเพียงพอ',
    problemType: 'actual',
    assessmentFilterIds: ['dyspnea'],
    supportingCues: [
      'อัตราการหายใจเร็วหรือช้าผิดปกติ (เช่น RR > 24 ครั้ง/นาที)',
      'หายใจตื้น หรือใช้กล้ามเนื้อช่วยหายใจ (Accessory muscle use) ปีกจมูกบาน',
      'หายใจห่อปาก (Pursed-lip breathing) หรืออกขยายตัวไม่สมมาตร',
      'ผู้ป่วยบอกว่ารู้สึกเหนื่อย หายใจไม่ทัน (Dyspnea)',
    ],
    riskFactors: [],
    checkSummary: 'ประเมิน RR, ความลึก-จังหวะการหายใจ, การใช้กล้ามเนื้อช่วยหายใจ และความเหนื่อยล้า',
    differentialPoints: [
      {
        similarDiagnosis: 'การแลกเปลี่ยนก๊าซบกพร่อง (00030)',
        howToDistinguish:
          'Breathing Pattern ดูกลไกการเคลื่อนไหวของทรวงอก อัตรา จังหวะ และแรงที่ใช้หายใจ ขณะที่ Gas Exchange ดูผลลัพธ์ของการซึมผ่านก๊าซ (SpO₂ / PaO₂ / PaCO₂)',
      },
    ],
    dataGuidelines: [
      'บันทึกอัตราการหายใจ (RR) จังหวะ ความลึก และความสมมาตรของทรวงอก',
      'ระบุอาการแสดงของความเหนื่อยล้า เช่น การใช้กล้ามเนื้อคอ/หน้าท้อง หรือท่านั่งโน้มตัวไปข้างหน้า',
      'บันทึกคะแนนอาการเหนื่อย (หากหน่วยงานใช้ Dyspnea scale) ตามคำบอกเล่าของผู้ป่วย',
    ],
    goalSummary: 'ผู้ป่วยมีรูปแบบการหายใจสม่ำเสมอ อัตราการหายใจอยู่ในช่วงเป้าหมาย และลดการใช้กล้ามเนื้อช่วยหายใจ',
    nocOutcomes: [
      {
        code: '0415',
        labelEn: 'Respiratory Status',
        labelTh: 'ภาวะการหายใจโดยรวม',
        edition: 'NOC 6th Edition',
        indicators: [
          'อัตราการหายใจอยู่ในช่วงที่เหมาะสมกับพยาธิสภาพ',
          'ความลึกและจังหวะการหายใจสม่ำเสมอ',
          'การใช้กล้ามเนื้อช่วยหายใจลดลง',
        ],
      },
    ],
    actionGuidelines: [
      'จัดท่านอนศีรษะสูงหรือท่านั่งฟุบโต๊ะ (Tripod position) ตามความสุขสบายของผู้ป่วยเพื่อช่วยการระบายอากาศ',
      'แนะนำเทคนิคการหายใจช้าลึก หรือ Pursed-lip breathing ในผู้ป่วย COPD ตามความเหมาะสม',
      'ลดกิจกรรมที่เพิ่มความต้องการใช้ออกซิเจน และจัดช่วงเวลาพักระหว่างหัตถการ',
    ],
    nicInterventions: [
      {
        code: '3390',
        labelEn: 'Ventilation Assistance',
        labelTh: 'การช่วยเหลือการระบายอากาศ',
        edition: 'NIC 7th Edition',
        guidelineNote: 'จัดท่า ฝึกควบคุมจังหวะหายใจ และประสานงานเมื่อต้องใช้อุปกรณ์ช่วยหายใจแรงดันบวก',
      },
    ],
    responseGuidelines: [
      'บันทึกอัตราการหายใจ ลักษณะการใช้กล้ามเนื้อช่วยหายใจ และความรู้สึกเหนื่อยของผู้ป่วยหลังจัดท่า/พัก พร้อมเวลา [__ : __ น.]',
    ],
    commonPitfalls: [
      'นับอัตราการหายใจไม่เต็ม 1 นาที หรือไม่สังเกตลักษณะการหายใจตื้น/หอบร่วมด้วย',
      'ลืมประเมินความเหนื่อยล้าในผู้ป่วย COPD ที่อาจหายใจช้าลงเมื่อใกล้เกิดภาวะหายใจล้มเหลว',
    ],
    educationalExample: {
      contextNote: 'ตัวอย่างกรณีศึกษาสมมติเพื่อการเรียนรู้ — ห้ามคัดลอกค่าตัวเลขไปใช้กับผู้ป่วยจริง',
      focusLabel: 'Ineffective Breathing Pattern (รูปแบบการหายใจไม่มีประสิทธิภาพ)',
      dataText:
        'เวลา 14.00 น. ผู้ป่วยบ่นเหนื่อยหอบ RR 28 ครั้ง/นาที หายใจตื้น ใช้กล้ามเนื้อหน้าท้องช่วยหายใจ หายใจแบบห่อปาก SpO₂ 90% (O₂ cannula 2 LPM)',
      actionText:
        'เวลา 14.05 น. จัดท่านั่งศีรษะสูง 60 องศา แนะนำการหายใจเข้าทางจมูกและผ่อนลมหายใจออกทางปากช้า ๆ (Pursed-lip breathing) ลดกิจกรรมบนเตียง และดูแลพ่นยาตามแผนการรักษา',
      responseText:
        'เวลา 14.35 น. ผู้ป่วยหายใจจังหวะสม่ำเสมอขึ้น RR 22 ครั้ง/นาที ลดการใช้กล้ามเนื้อหน้าท้อง SpO₂ 92% (O₂ cannula 2 LPM) แจ้งว่าอาการเหนื่อยทุเลาลง',
    },
    compareSummary: {
      definition: 'กลไกการหายใจเข้า–ออกมีอัตรา จังหวะ หรือความลึกไม่เพียงพอต่อการระบายอากาศ',
      supporting: 'RR เร็ว/ตื้น, ใช้กล้ามเนื้อช่วยหายใจ, หายใจห่อปาก, นั่งโน้มตัว',
      distinction: 'เน้นกลศาสตร์และจังหวะการหายใจของทรวงอก/กล้ามเนื้อหายใจ',
      dataFocus: 'RR, จังหวะ, ความลึก, การใช้กล้ามเนื้อช่วยหายใจ',
      responseFocus: 'RR และแรงที่ใช้หายใจหลังจัดท่า/ฝึกควบคุมจังหวะหายใจ',
    },
    icnpNote: {
      statusLabel: 'ฟังก์ชันระยะถัดไป',
      termExample: 'ICNP Term: Impaired Breathing — แยกชุดคำศัพท์จาก NANDA-I',
      disclaimer: 'ใช้เป็นข้อมูลอ้างอิงระยะถัดไปเท่านั้น',
    },
    provenanceStatus: 'แนวทางที่หน่วยงานทบทวน',
    reviewStatus: 'verified',
    reviewedDate: '15 ส.ค. 2568',
    nextReviewDate: '15 ส.ค. 2569',
    references: [
      {
        title: 'NANDA International Nursing Diagnoses: Definitions and Classification',
        source: 'Herdman, T. H., Kamitsuru, S., & Lopes, C. T.',
        edition: '12th Edition (2021–2023)',
        year: '2021',
      },
    ],
  },
  {
    id: 'cap-hyperthermia',
    diseaseIds: ['cap-pneumonia'],
    expertOrder: 4,
    nandaCode: '00007',
    nandaEdition: 'NANDA-I 2021–2023 (ฉบับภาษาไทยเพื่อการทดสอบ)',
    titleTh: 'อุณหภูมิร่างกายสูงกว่าปกติ (ภาวะไข้)',
    titleEn: 'Hyperthermia',
    shortDescription:
      'ภาวะที่อุณหภูมิแกนกลางร่างกายสูงกว่าเกณฑ์ปกติเนื่องจากกระบวนการอักเสบติดเชื้อและการระบายความร้อนไม่สมดุล',
    problemType: 'actual',
    assessmentFilterIds: ['fever'],
    supportingCues: [
      'อุณหภูมิร่างกาย ≥ 38.0 °C',
      'ผิวหนังแดง ร้อน ชีพจรเต้นเร็ว อัตราการหายใจเร็วขึ้นตามไข้',
      'ผู้ป่วยมีอาการหนาวสั่น ปวดเมื่อย หรืออ่อนเพลีย',
    ],
    riskFactors: [],
    checkSummary: 'วัด BT, PR, อาการหนาวสั่น, ความชุ่มชื้นของผิว และปริมาณน้ำที่ดื่มได้',
    differentialPoints: [
      {
        similarDiagnosis: 'ความเสี่ยงต่อภาวะติดเชื้อลุกลาม (00004 / Sepsis)',
        howToDistinguish:
          'Hyperthermia มุ่งเน้นการจัดการอุณหภูมิสูงและความสุขสบาย ส่วน Risk for Infection/Sepsis เน้นการเฝ้าระวังการลุกลามของการติดเชื้อและภาวะช็อก',
      },
    ],
    dataGuidelines: [
      'ระบุค่าอุณหภูมิร่างกาย พร้อมช่องทางที่วัด (เช่น Oral/Axillary/Tympanic)',
      'บันทึกชีพจร อัตราการหายใจ อาการหนาวสั่น หรือเหงื่อออก',
      'ระบุประวัติการได้รับยาลดไข้ครั้งล่าสุดก่อนประเมิน',
    ],
    goalSummary: 'อุณหภูมิร่างกายลดลงอยู่ในเกณฑ์ปลอดภัย ไม่เกิดภาวะขาดน้ำหรือชักจากไข้สูง',
    nocOutcomes: [
      {
        code: '0800',
        labelEn: 'Thermoregulation',
        labelTh: 'การควบคุมอุณหภูมิร่างกาย',
        edition: 'NOC 6th Edition',
        indicators: [
          'อุณหภูมิร่างกายลดลงเข้าสู่ช่วงปกติ',
          'อัตราชีพจรและการหายใจไม่เร็วเกินเกณฑ์จากไข้',
        ],
      },
    ],
    actionGuidelines: [
      'เช็ดตัวลดไข้ด้วยน้ำอุณหภูมิห้องหรือน้ำอุ่นเล็กน้อย (Tepid sponge) เมื่อไม่มีอาการหนาวสั่น',
      'ดูแลให้ได้รับยาลดไข้และยาปฏิชีวนะตามแผนการรักษา',
      'สวมเสื้อผ้าที่ระบายอากาศได้ดี และกระตุ้นให้ดื่มน้ำสะอาดถ้าไม่มีข้อห้าม',
    ],
    nicInterventions: [
      {
        code: '3740',
        labelEn: 'Fever Treatment',
        labelTh: 'การจัดการภาวะไข้',
        edition: 'NIC 7th Edition',
        guidelineNote: 'บันทึกวิธีการลดไข้จริง เช่น เช็ดตัว หรือให้ยาลดไข้พร้อมขนาดยา',
      },
    ],
    responseGuidelines: [
      'วัดและบันทึกอุณหภูมิร่างกายซ้ำหลังเช็ดตัวหรือให้ยาลดไข้ 30–60 นาที พร้อมระบุเวลาจริง [__ : __ น.]',
      'ประเมินอาการหนาวสั่น เหงื่อออก และความสุขสบายหลังการลดไข้',
    ],
    commonPitfalls: [
      'ให้ยาลดไข้หรือเช็ดตัวแล้วไม่ได้บันทึกอุณหภูมิซ้ำในส่วน E (Evaluation)',
      'เช็ดตัวลดไข้ขณะที่ผู้ป่วยกำลังหนาวสั่นโดยไม่ห่มผ้าคลุมให้เหมาะสม',
    ],
    educationalExample: {
      contextNote: 'ตัวอย่างกรณีศึกษาสมมติเพื่อการเรียนรู้ — ห้ามคัดลอกค่าตัวเลขไปใช้กับผู้ป่วยจริง',
      focusLabel: 'Hyperthermia (อุณหภูมิร่างกายสูงกว่าปกติ)',
      dataText: 'เวลา 13.00 น. BT 38.8 °C (Tympanic) PR 104 ครั้ง/นาที ผิวหนังร้อน หน้าแดง ไม่มีอาการหนาวสั่น',
      actionText:
        'เวลา 13.05 น. เช็ดตัวลดไข้ด้วยน้ำธรรมดา 15 นาที และดูแลให้ Paracetamol 500 mg 1 เม็ด รับประทานตามแผนการรักษา พร้อมจัดเสื้อผ้าโปร่งสบาย',
      responseText: 'เวลา 14.00 น. BT ลดลงเป็น 37.6 °C PR 90 ครั้ง/นาที ผู้ป่วยรู้สึกสบายตัวขึ้น ไม่มีอาการหนาวสั่น',
    },
    compareSummary: {
      definition: 'อุณหภูมิแกนกลางร่างกายสูงกว่าช่วงปกติจากการตอบสนองต่อการอักเสบติดเชื้อ',
      supporting: 'BT ≥ 38.0 °C, ผิวร้อนแดง, ชีพจรเร็ว, หนาวสั่น',
      distinction: 'ใช้ข้อมูลอุณหภูมิและอาการแสดงจากไข้เป็นหลัก',
      dataFocus: 'BT พร้อมช่องทางวัด, PR, อาการหนาวสั่น',
      responseFocus: 'BT และ PR ซ้ำหลังลดไข้ 30–60 นาที',
    },
    icnpNote: {
      statusLabel: 'ฟังก์ชันระยะถัดไป',
      termExample: 'ICNP Term: Fever (10007916) — ยังไม่เปิดใช้งานเทียบเคียง',
      disclaimer: 'แสดงเพื่อแยกชื่อระบบมาตรฐานเท่านั้น',
    },
    provenanceStatus: 'แนวทางที่หน่วยงานทบทวน',
    reviewStatus: 'verified',
    reviewedDate: '15 ส.ค. 2568',
    nextReviewDate: '15 ส.ค. 2569',
    references: [
      {
        title: 'NANDA International Nursing Diagnoses: Definitions and Classification',
        source: 'Herdman, T. H., Kamitsuru, S., & Lopes, C. T.',
        edition: '12th Edition (2021–2023)',
        year: '2021',
      },
    ],
  },
  {
    id: 'cap-risk-for-infection-progression',
    diseaseIds: ['cap-pneumonia'],
    expertOrder: 5,
    nandaCode: '00205 / 00004',
    nandaEdition: 'NANDA-I 2021–2023 (ฉบับภาษาไทยเพื่อการทดสอบ)',
    titleTh: 'ความเสี่ยงต่อภาวะติดเชื้อลุกลาม / ภาวะช็อกจากการติดเชื้อ',
    titleEn: 'Risk for Shock / Risk for Infection Progression',
    shortDescription:
      'ผู้ป่วยปอดอักเสบมีความเสี่ยงต่อการเกิดภาวะติดเชื้อในกระแสเลือด (Sepsis) และความดันโลหิตตกจากภาวะช็อก',
    problemType: 'risk',
    assessmentFilterIds: ['sepsis-risk', 'fever'],
    supportingCues: [],
    riskFactors: [
      'มีการติดเชื้อในเนื้อปอดร่วมกับอายุมาก หรือมีโรคประจำตัวเรื้อรัง (เบาหวาน โรคไต ภูมิคุ้มกันบกพร่อง)',
      'ค่าเม็ดเลือดขาว (WBC) สูงหรือต่ำผิดปกติ หรือค่า Lactate สูง',
      'มีสายสวนทางหลอดเลือดดำหรือสายสวนปัสสาวะร่วมด้วย',
    ],
    checkSummary: 'เฝ้าระวังสัญญาณเตือน Sepsis (qSOFA / SOS score), BP, ปริมาณปัสสาวะ, ระดับความรู้สึกตัว',
    differentialPoints: [
      {
        similarDiagnosis: 'อุณหภูมิร่างกายสูงกว่าปกติ (00007)',
        howToDistinguish:
          'ข้อวินิจฉัยนี้เป็น “ความเสี่ยง (Risk)” ไม่มี Defining characteristics แต่ระบุ “ปัจจัยเสี่ยง” เพื่อเฝ้าระวังภาวะแทรกซ้อนรุนแรงอย่างเป็นระบบ',
      },
    ],
    dataGuidelines: [
      'บันทึกปัจจัยเสี่ยงเฉพาะรายที่มีจริง (เช่น อายุ, โรคร่วม, ผลตรวจเลือดที่รายงานแล้ว)',
      'บันทึกค่าสัญญาณชีพตั้งต้น (BP, MAP, PR, RR, BT), ระดับความรู้สึกตัว และปริมาณปัสสาวะ',
      'บันทึกคะแนนเตือนภัยล่วงหน้า (เช่น SOS / NEWS score) หากหน่วยงานใช้จริง',
    ],
    goalSummary: 'ไม่เกิดภาวะติดเชื้อลุกลามหรือภาวะช็อก และสามารถตรวจพบสัญญาณเตือนได้ทันท่วงที',
    nocOutcomes: [
      {
        code: '0703',
        labelEn: 'Infection Severity',
        labelTh: 'ระดับความรุนแรงของการติดเชื้อ',
        edition: 'NOC 6th Edition',
        indicators: [
          'ความดันโลหิตและ MAP อยู่ในเกณฑ์ปกติ',
          'ปริมาณปัสสาวะ ≥ 0.5 mL/kg/hr',
        ],
      },
    ],
    actionGuidelines: [
      'ติดตามสัญญาณชีพและอาการเปลี่ยนแปลงทางระบบประสาทตามรอบที่กำหนด',
      'ดูแลให้ยาปฏิชีวนะทางหลอดเลือดดำตรงเวลาและสังเกตอาการแพ้ยา',
      'ปฏิบัติตามหลัก Aseptic technique ในการดูแลสายน้ำเกลือและสายสวนต่าง ๆ',
    ],
    nicInterventions: [
      {
        code: '6550',
        labelEn: 'Infection Protection',
        labelTh: 'การป้องกันการติดเชื้อและเฝ้าระวังภาวะแทรกซ้อน',
        edition: 'NIC 7th Edition',
        guidelineNote: 'เน้นการเฝ้าระวังเชิงป้องกันและบันทึกเฉพาะสิ่งที่ปฏิบัติจริง',
      },
    ],
    responseGuidelines: [
      'บันทึกผลการเฝ้าระวังสัญญาณชีพ, ปริมาณปัสสาวะ, และอาการซึม/สับสนหลังให้ยาหรือครบช่วงเวลาสังเกต [__ : __ น.]',
    ],
    commonPitfalls: [
      'เขียนข้อวินิจฉัยความเสี่ยงโดยอ้างอาการที่ยังไม่เกิดขึ้นจริงเป็นข้อมูล A (Assessment)',
      'ให้ยาปฏิชีวนะล่าช้ากว่าเวลาที่กำหนดในผู้ป่วยที่เสี่ยง Sepsis',
    ],
    educationalExample: {
      contextNote: 'ตัวอย่างกรณีศึกษาสมมติเพื่อการเรียนรู้ — ห้ามคัดลอกค่าตัวเลขไปใช้กับผู้ป่วยจริง',
      focusLabel: 'Risk for Shock / Infection Progression (ความเสี่ยงต่อภาวะติดเชื้อลุกลาม)',
      dataText:
        'เวลา 08.00 น. ผู้ป่วยอายุ 72 ปี เป็นปอดอักเสบร่วมกับเบาหวาน WBC 16,400 cells/mm³ สัญญาณชีพแรกรับ BP 112/70 mmHg, PR 98 ครั้ง/นาที, RR 22 ครั้ง/นาที, BT 38.2 °C ตื่นดี ปัสสาวะออก 40 mL/hr',
      actionText:
        'เวลา 08.15 น. ดูแลให้ยาปฏิชีวนะทางหลอดเลือดดำตามแผนการรักษาตรงเวลา เฝ้าระวังสัญญาณชีพและบันทึก I/O ทุก 4 ชั่วโมง และดูแลความสะอาดสายน้ำเกลือตามหลักปลอดเชื้อ',
      responseText:
        'เวลา 12.00 น. สัญญาณชีพคงที่ BP 118/74 mmHg, PR 88 ครั้ง/นาที, BT 37.5 °C ปัสสาวะออก 180 mL ใน 4 ชั่วโมง ตื่นรู้ตัวดี ไม่พบอาการแสดงภาวะช็อก',
    },
    compareSummary: {
      definition: 'ภาวะเสี่ยงต่อการลุกลามของการติดเชื้อสู่กระแสเลือดและภาวะความดันตก',
      supporting: 'ปัจจัยเสี่ยง: อายุมาก, โรคร่วม, WBC ผิดปกติ, คาอุปกรณ์ทางการแพทย์',
      distinction: 'เป็นข้อวินิจฉัยกลุ่มความเสี่ยง (Risk) ใช้เฝ้าระวังก่อนเกิดภาวะช็อก',
      dataFocus: 'ปัจจัยเสี่ยงเฉพาะราย, BP/MAP, ปัสสาวะ, SOS/qSOFA',
      responseFocus: 'ผลติดตามความดันโลหิต ปัสสาวะ และระดับความรู้สึกตัวตามรอบเวลา',
    },
    icnpNote: {
      statusLabel: 'ฟังก์ชันระยะถัดไป',
      termExample: 'ICNP Term: Risk for Infection — แยกระบบรหัสชัดเจน',
      disclaimer: 'ยังไม่เชื่อมโยงอัตโนมัติในรุ่น MVP',
    },
    provenanceStatus: 'แนวทางที่หน่วยงานทบทวน',
    reviewStatus: 'verified',
    reviewedDate: '15 ส.ค. 2568',
    nextReviewDate: '15 ส.ค. 2569',
    references: [
      {
        title: 'NANDA International Nursing Diagnoses: Definitions and Classification',
        source: 'Herdman, T. H., Kamitsuru, S., & Lopes, C. T.',
        edition: '12th Edition (2021–2023)',
        year: '2021',
      },
    ],
  },

  // ================= ADHF =================
  {
    id: 'adhf-excess-fluid-volume',
    diseaseIds: ['adhf-heart-failure'],
    expertOrder: 1,
    nandaCode: '00026',
    nandaEdition: 'NANDA-I 2021–2023 (ฉบับภาษาไทยเพื่อการทดสอบ)',
    titleTh: 'ปริมาณน้ำในร่างกายเกิน',
    titleEn: 'Excess Fluid Volume',
    shortDescription:
      'ภาวะที่มีการคั่งของสารน้ำไอโซโทนิกในร่างกายเพิ่มขึ้นจากความสามารถในการสูบฉีดเลือดของหัวใจลดลง',
    problemType: 'actual',
    assessmentFilterIds: ['edema-fluid', 'orthopnea'],
    supportingCues: [
      'ขาหรือข้อเท้าบวมกดบุ๋ม (Pitting edema) หรือน้ำหนักตัวเพิ่มขึ้นเร็วผิดปกติ',
      'สมดุลสารน้ำเข้า–ออก (Intake/Output) เกินดุลชัดเจน',
      'ฟังเสียงปอดพบ Fine crackles สองข้าง นอนราบไม่ได้ (Orthopnea)',
      'หลอดเลือดดำที่คอโป่งพอง (Jugular vein distension)',
    ],
    riskFactors: [],
    checkSummary: 'ตรวจสอบระดับอาการบวมกดบุ๋ม, น้ำหนักตัวรายวัน, เสียงปอด (Crackles) และ I/O',
    differentialPoints: [
      {
        similarDiagnosis: 'ปริมาณเลือดออกจากหัวใจต่อนาทีลดลง (00029)',
        howToDistinguish:
          'Excess Fluid Volume เน้นอาการคั่งน้ำ (บวม, Crackles, น้ำหนักเพิ่ม, I/O เกินดุล) ขณะที่ Decreased Cardiac Output เน้นการกำซาบเนื้อเยื่อลดลง (BP ต่ำ, ปลายมือเท้าเย็น, ชีพจรเบาเร็ว, ปัสสาวะออกน้อย)',
      },
    ],
    dataGuidelines: [
      'บันทึกระดับอาการบวมกดบุ๋ม (เช่น Pitting edema 2+ ที่หน้าแข้งทั้งสองข้าง) และน้ำหนักตัวเทียบวันก่อนหน้า',
      'บันทึกอาการนอนราบไม่ได้ (จำนวนหมอนที่ต้องหนุน) และเสียงปอด (Crackles)',
      'บันทึกยอด Intake และ Output จริง รวมถึงปริมาณน้ำที่ผู้ป่วยดื่ม',
    ],
    goalSummary: 'ภาวะคั่งน้ำลดลง ปัสสาวะออกเพียงพอหลังได้รับยาขับปัสสาวะ และหายใจนอนราบได้สะดวกขึ้น',
    nocOutcomes: [
      {
        code: '0601',
        labelEn: 'Fluid Balance',
        labelTh: 'ความสมดุลของสารน้ำ',
        edition: 'NOC 6th Edition',
        indicators: [
          'สมดุลสารน้ำ I/O ไม่คั่งค้างเพิ่ม',
          'น้ำหนักตัวคงที่หรือลดลงตามเป้าหมายการขับน้ำ',
          'อาการบวมและเสียง Crackles ในปอดลดลง',
        ],
      },
    ],
    actionGuidelines: [
      'ดูแลให้ยาขับปัสสาวะ (เช่น Furosemide) ตามแผนการรักษา และติดตามปริมาณปัสสาวะหลังให้ยา',
      'จัดท่านอนศีรษะสูงเพื่อลดอาการแน่นหน้าอกและช่วยให้หายใจสะดวก',
      'ดูแลจำกัดปริมาณน้ำดื่มและโซเดียมตามแผนการรักษา พร้อมให้คำแนะนำแก่ผู้ป่วยและญาติ',
      'ชั่งน้ำหนักตัวผู้ป่วยทุกวันเวลาเดียวกันก่อนรับประทานอาหารเช้า',
    ],
    nicInterventions: [
      {
        code: '4120',
        labelEn: 'Fluid Management',
        labelTh: 'การจัดการสมดุลสารน้ำ',
        edition: 'NIC 7th Edition',
        guidelineNote: 'บันทึกปริมาณน้ำที่จำกัดจริง น้ำหนักตัว และ I/O อย่างถูกต้อง',
      },
    ],
    responseGuidelines: [
      'บันทึกปริมาณปัสสาวะที่ออกหลังให้ยาขับปัสสาวะ (เช่น ภายใน 1–4 ชั่วโมง) พร้อมเวลา [__ : __ น.]',
      'ประเมินอาการหอบเหนื่อยขณะนอน, เสียง Crackles และระดับอาการบวมเปรียบเทียบกับก่อนให้การพยาบาล',
    ],
    commonPitfalls: [
      'บันทึกยาขับปัสสาวะในส่วน I (Intervention) แต่ไม่ติดตามปริมาณปัสสาวะและค่า BP หลังให้ยาในส่วน E (Evaluation)',
      'ไม่ระบุปริมาณน้ำที่จำกัดจริงต่อวันในคำแนะนำแก่ผู้ป่วย',
    ],
    educationalExample: {
      contextNote: 'ตัวอย่างกรณีศึกษาสมมติเพื่อการเรียนรู้ — ห้ามคัดลอกค่าตัวเลขไปใช้กับผู้ป่วยจริง',
      focusLabel: 'Excess Fluid Volume (ปริมาณน้ำในร่างกายเกิน)',
      dataText:
        'เวลา 08.00 น. ผู้ป่วยบวมกดบุ๋ม 2+ ที่ขาทั้งสองข้าง นอนราบไม่ได้ต้องหนุนหมอน 3 ใบ ฟังปอดมี Fine crackles ชายปอดทั้งสองข้าง SpO₂ 93% (O₂ cannula 2 LPM) น้ำหนักตัวเพิ่มขึ้น 1.5 กก. จากเมื่อวาน',
      actionText:
        'เวลา 08.30 น. ดูแลให้ Furosemide 40 mg ทางหลอดเลือดดำตามแผนการรักษา จัดท่านอนศีรษะสูง 45 องศา แนะนำจำกัดน้ำดื่มไม่เกิน 1,000 mL/วัน และบันทึก I/O อย่างละเอียด',
      responseText:
        'เวลา 11.30 น. ปัสสาวะออก 650 mL ใน 3 ชั่วโมง ผู้ป่วยหายใจสะดวกขึ้น นอนศีรษะสูง 30 องศาได้ไม่เหนื่อย ฟังปอด Crackles ลดลง SpO₂ 96% (O₂ cannula 2 LPM)',
    },
    compareSummary: {
      definition: 'ภาวะที่มีการคั่งของสารน้ำในหลอดเลือดและเนื้อเยื่อมากเกินความต้องการของร่างกาย',
      supporting: 'บวมกดบุ๋ม, น้ำหนักเพิ่มเร็ว, I/O เกินดุล, Crackles, นอนราบไม่ได้',
      distinction: 'โฟกัสที่การคั่งน้ำและการขับปัสสาวะ (Fluid overload)',
      dataFocus: 'ระดับบวม, น้ำหนักตัวรายวัน, เสียง Crackles, I/O',
      responseFocus: 'ปริมาณปัสสาวะหลังยาขับปัสสาวะและอาการหอบ/Crackles ซ้ำ',
    },
    icnpNote: {
      statusLabel: 'ฟังก์ชันระยะถัดไป',
      termExample: 'ICNP Term: Fluid Volume Excess — รอการเทียบเคียงมาตรฐาน',
      disclaimer: 'ไม่นำมาใช้แทน NANDA-I ในบันทึกปัจจุบัน',
    },
    provenanceStatus: 'แนวทางที่หน่วยงานทบทวน',
    reviewStatus: 'verified',
    reviewedDate: '02 ก.ย. 2568',
    nextReviewDate: '02 ก.ย. 2569',
    references: [
      {
        title: 'NANDA International Nursing Diagnoses: Definitions and Classification',
        source: 'Herdman, T. H., Kamitsuru, S., & Lopes, C. T.',
        edition: '12th Edition (2021–2023)',
        year: '2021',
      },
    ],
  },
  {
    id: 'adhf-decreased-cardiac-output',
    diseaseIds: ['adhf-heart-failure'],
    expertOrder: 2,
    nandaCode: '00029',
    nandaEdition: 'NANDA-I 2021–2023 (ฉบับภาษาไทยเพื่อการทดสอบ)',
    titleTh: 'ปริมาณเลือดออกจากหัวใจต่อนาทีลดลง',
    titleEn: 'Decreased Cardiac Output',
    shortDescription:
      'ปริมาณเลือดที่หัวใจบีบส่งออกไปเลี้ยงร่างกายไม่เพียงพอต่อความต้องการเมแทบอลิซึมของเนื้อเยื่อ',
    problemType: 'actual',
    assessmentFilterIds: ['low-perfusion', 'orthopnea'],
    supportingCues: [
      'ความดันโลหิตต่ำ หรือชีพจรเบาเร็ว ไม่สม่ำเสมอ',
      'ปลายมือปลายเท้าเย็น ชื้น หรือ Capillary refill > 3 วินาที',
      'ปัสสาวะออกน้อยกว่า 30 mL/hr (< 0.5 mL/kg/hr)',
      'อ่อนเพลียมาก มึนงง หรือซึมลงจากเลือดไปเลี้ยงสมองลดลง',
    ],
    riskFactors: [],
    checkSummary: 'ตรวจ BP/MAP, ชีพจร, Capillary refill, อุณหภูมิปลายมือเท้า และปริมาณปัสสาวะต่อชั่วโมง',
    differentialPoints: [
      {
        similarDiagnosis: 'ปริมาณน้ำในร่างกายเกิน (00026)',
        howToDistinguish:
          'Decreased Cardiac Output มุ่งเน้นการประเมินการกำซาบเลือดไปเลี้ยงอวัยวะ (Perfusion: BP, ชีพจร, ปัสสาวะ, ปลายมือเท้าเย็น) จึงต้องระวังก่อนให้ยาขับปัสสาวะหรือยาขยายหลอดเลือด',
      },
    ],
    dataGuidelines: [
      'บันทึก BP, MAP, PR (ระบุความแรงและความสม่ำเสมอ) และคลื่นไฟฟ้าหัวใจ (ถ้าติดตามอยู่)',
      'บันทึกการกำซาบส่วนปลาย: อุณหภูมิผิวหนัง, สีเล็บ, Capillary refill time',
      'บันทึกปริมาณปัสสาวะรายชั่วโมงและอาการเวียนศีรษะ/ซึม',
    ],
    goalSummary: 'ความดันโลหิตและการกำซาบเลือดส่วนปลายเพียงพอ ปัสสาวะออก ≥ 30 mL/hr และไม่มีหัวใจเต้นผิดจังหวะรุนแรง',
    nocOutcomes: [
      {
        code: '0400',
        labelEn: 'Cardiac Pump Effectiveness',
        labelTh: 'ประสิทธิภาพการสูบฉีดเลือดของหัวใจ',
        edition: 'NOC 6th Edition',
        indicators: [
          'ความดันโลหิต Systolic/MAP อยู่ในเกณฑ์เป้าหมาย',
          'ปริมาณปัสสาวะเพียงพอ',
          'ปลายมือปลายเท้าอุ่น สีผิวปกติ',
        ],
      },
    ],
    actionGuidelines: [
      'ติดตามสัญญาณชีพอย่างใกล้ชิด โดยเฉพาะก่อนและหลังให้ยาที่มีผลต่อความดันโลหิตหรืออัตราการเต้นหัวใจ',
      'จัดให้ผู้ป่วยพักผ่อนบนเตียง (Bed rest) เพื่อลดภาระการทำงานของหัวใจ',
      'ดูแลให้ยาช่วยเพิ่มแรงบีบหัวใจหรือยาขยายหลอดเลือดตามแผนการรักษาอย่างระมัดระวัง',
      'รายงานแพทย์ทันทีหาก BP ตก ซึมลง หรือปัสสาวะออกน้อยลงต่อเนื่อง',
    ],
    nicInterventions: [
      {
        code: '4040',
        labelEn: 'Cardiac Care',
        labelTh: 'การดูแลระบบหัวใจและการไหลเวียน',
        edition: 'NIC 7th Edition',
        guidelineNote: 'เฝ้าระวังสัญญาณชีพ อาการเจ็บแน่นหน้าอก และการกำซาบส่วนปลาย',
      },
    ],
    responseGuidelines: [
      'บันทึก BP, PR, Capillary refill และปริมาณปัสสาวะหลังให้การพยาบาลหรือปรับยา พร้อมเวลา [__ : __ น.]',
    ],
    commonPitfalls: [
      'ให้ยาขับปัสสาวะหรือยาขยายหลอดเลือดโดยไม่ได้ตรวจ BP ก่อนให้',
      'ไม่เชื่อมโยงข้อมูลปัสสาวะออกน้อยกับภาวะ Cardiac output ลดลง',
    ],
    educationalExample: {
      contextNote: 'ตัวอย่างกรณีศึกษาสมมติเพื่อการเรียนรู้ — ห้ามคัดลอกค่าตัวเลขไปใช้กับผู้ป่วยจริง',
      focusLabel: 'Decreased Cardiac Output (ปริมาณเลือดออกจากหัวใจต่อนาทีลดลง)',
      dataText:
        'เวลา 14.00 น. ผู้ป่วยอ่อนเพลียมาก เวียนศีรษะ BP 88/58 mmHg, PR 112 ครั้ง/นาที เบาเร็ว ปลายมือเท้าเย็น Capillary refill 4 วินาที ปัสสาวะออก 20 mL ใน 1 ชั่วโมงที่ผ่านมา',
      actionText:
        'เวลา 14.05 น. จัดให้นอนพักบนเตียง รายงานแพทย์ทราบเพื่อประเมินแผนการรักษา งดการลุกเดิน ดูแลให้ออกซิเจนและติดตามสัญญาณชีพ/EKG monitor ทุก 15 นาที',
      responseText:
        'เวลา 15.00 น. หลังปรับยาตามแผนการรักษา BP 102/66 mmHg, PR 96 ครั้ง/นาที ปลายมือเท้าอุ่นขึ้น Capillary refill 2 วินาที ปัสสาวะออก 45 mL/hr',
    },
    compareSummary: {
      definition: 'หัวใจสูบฉีดเลือดไปเลี้ยงเนื้อเยื่อและอวัยวะสำคัญไม่เพียงพอ',
      supporting: 'BP ต่ำ, ชีพจรเบาเร็ว, ปลายมือเท้าเย็น, Capillary refill ช้า, ปัสสาวะน้อย',
      distinction: 'เน้นการกำซาบเลือด (Perfusion) มากกว่าอาการบวมคั่งน้ำ',
      dataFocus: 'BP/MAP, PR, Capillary refill, ปัสสาวะรายชั่วโมง',
      responseFocus: 'ค่า BP, การกำซาบส่วนปลาย และปัสสาวะหลังปรับยา/ให้การพยาบาล',
    },
    icnpNote: {
      statusLabel: 'ฟังก์ชันระยะถัดไป',
      termExample: 'ICNP Term: Decreased Cardiac Output — แยกมาตรฐานรหัสชัดเจน',
      disclaimer: 'ยังไม่เชื่อมโยงอัตโนมัติในรุ่น MVP',
    },
    provenanceStatus: 'แนวทางที่หน่วยงานทบทวน',
    reviewStatus: 'verified',
    reviewedDate: '02 ก.ย. 2568',
    nextReviewDate: '02 ก.ย. 2569',
    references: [
      {
        title: 'NANDA International Nursing Diagnoses: Definitions and Classification',
        source: 'Herdman, T. H., Kamitsuru, S., & Lopes, C. T.',
        edition: '12th Edition (2021–2023)',
        year: '2021',
      },
    ],
  },
  {
    id: 'adhf-impaired-gas-exchange',
    diseaseIds: ['adhf-heart-failure'],
    expertOrder: 3,
    nandaCode: '00030',
    nandaEdition: 'NANDA-I 2021–2023 (ฉบับภาษาไทยเพื่อการทดสอบ)',
    titleTh: 'การแลกเปลี่ยนก๊าซบกพร่องจากน้ำคั่งในถุงลมปอด',
    titleEn: 'Impaired Gas Exchange (Pulmonary Congestion)',
    shortDescription:
      'ความบกพร่องของการซึมผ่านออกซิเจนในถุงลมเนื่องจากมีน้ำคั่งในเนื้อเยื่อปอดและถุงลมจากหัวใจห้องล่างซ้ายล้มเหลว',
    problemType: 'actual',
    assessmentFilterIds: ['orthopnea'],
    supportingCues: [
      'ค่า SpO₂ < 94% หรือลดลงขณะนอนราบ',
      'หายใจหอบเหนื่อย นอนราบไม่ได้ (Orthopnea) หรือสะดุ้งตื่นกลางดึกจากหอบ (PND)',
      'ฟังปอดพบ Fine crackles ระดับกลางถึงยอดปอด',
    ],
    riskFactors: [],
    checkSummary: 'ติดตาม SpO₂, ลักษณะการหายใจขณะนอน/นั่ง และระดับเสียง Crackles ในปอด',
    differentialPoints: [
      {
        similarDiagnosis: 'ปริมาณน้ำในร่างกายเกิน (00026)',
        howToDistinguish:
          'ใช้ข้อวินิจฉัยนี้เมื่ออาการเด่นคือภาวะพร่องออกซิเจนและหายใจลำบากเฉียบพลันจากน้ำท่วมปอด ต้องติดตาม SpO₂ และการให้ออกซิเจนเป็นหลัก',
      },
    ],
    dataGuidelines: [
      'บันทึกค่า SpO₂ พร้อมชนิดและอัตราออกซิเจนที่ใช้จริง',
      'บันทึกอัตราการหายใจ, อาการ Orthopnea, และระดับความสูงของเสียง Crackles ที่ฟังได้',
    ],
    goalSummary: 'การแลกเปลี่ยนก๊าซดีขึ้น ค่า SpO₂ อยู่ในเกณฑ์เป้าหมาย และลดอาการหอบขณะพัก',
    nocOutcomes: [
      {
        code: '0402',
        labelEn: 'Respiratory Status: Gas Exchange',
        labelTh: 'ภาวะการหายใจ: การแลกเปลี่ยนก๊าซ',
        edition: 'NOC 6th Edition',
        indicators: ['SpO₂ อยู่ในเกณฑ์เป้าหมาย', 'ลดอาการหอบเหนื่อยขณะพัก'],
      },
    ],
    actionGuidelines: [
      'จัดท่านั่งห้อยขาหรือศีรษะสูง (High-Fowler’s) เพื่อลดเลือดดำไหลกลับเข้าสู่หัวใจและปอด',
      'ดูแลให้ออกซิเจนตามแผนการรักษา และเตรียมความพร้อมหากต้องใช้เครื่องช่วยหายใจชนิดไม่ใส่ท่อ (NIV)',
    ],
    nicInterventions: [
      {
        code: '3320',
        labelEn: 'Oxygen Therapy',
        labelTh: 'การบำบัดด้วยออกซิเจน',
        edition: 'NIC 7th Edition',
        guidelineNote: 'บันทึกชนิดอุปกรณ์และอัตราออกซิเจนที่ผู้ป่วยได้รับจริง',
      },
    ],
    responseGuidelines: [
      'บันทึกค่า SpO₂, RR และความสามารถในการนอนพักหลังจัดท่าและให้ออกซิเจน [__ : __ น.]',
    ],
    commonPitfalls: [
      'ไม่บันทึกค่า SpO₂ ซ้ำหลังผู้ป่วยเปลี่ยนจากท่านั่งเป็นท่านอน',
    ],
    educationalExample: {
      contextNote: 'ตัวอย่างกรณีศึกษาสมมติเพื่อการเรียนรู้ — ห้ามคัดลอกค่าตัวเลขไปใช้กับผู้ป่วยจริง',
      focusLabel: 'Impaired Gas Exchange (การแลกเปลี่ยนก๊าซบกพร่อง)',
      dataText: 'เวลา 21.00 น. ผู้ป่วยหอบเหนื่อย นอนราบไม่ได้ RR 30 ครั้ง/นาที SpO₂ 88% (Room air) ฟังปอดได้ยิน Crackles ถึงกลางปอดทั้งสองข้าง',
      actionText: 'เวลา 21.05 น. จัดท่านั่งศีรษะสูง 60 องศาห้อยขาข้างเตียง ดูแลให้ O₂ mask with bag 8 LPM ตามแผนการรักษา และรายงานแพทย์',
      responseText: 'เวลา 21.30 น. SpO₂ เพิ่มเป็น 95% (O₂ mask with bag 8 LPM) RR 24 ครั้ง/นาที ผู้ป่วยลดอาการกระสับกระส่าย',
    },
    compareSummary: {
      definition: 'การแลกเปลี่ยนก๊าซลดลงจากภาวะน้ำคั่งในถุงลมปอด',
      supporting: 'SpO₂ ต่ำ, หอบ, Orthopnea, ฟังปอดพบ Crackles',
      distinction: 'มุ่งเน้นภาวะพร่องออกซิเจนและระดับความรุนแรงของอาการหอบ',
      dataFocus: 'SpO₂ พร้อมออกซิเจนที่ใช้, RR, ระดับเสียง Crackles',
      responseFocus: 'SpO₂ และ RR หลังจัดท่า/ให้ออกซิเจน',
    },
    icnpNote: {
      statusLabel: 'ฟังก์ชันระยะถัดไป',
      termExample: 'ICNP Term: Impaired Gas Exchange — รอการเทียบเคียง',
      disclaimer: 'แสดงเพื่อความชัดเจนของระบบมาตรฐาน',
    },
    provenanceStatus: 'แนวทางที่หน่วยงานทบทวน',
    reviewStatus: 'verified',
    reviewedDate: '02 ก.ย. 2568',
    nextReviewDate: '02 ก.ย. 2569',
    references: [
      {
        title: 'NANDA International Nursing Diagnoses: Definitions and Classification',
        source: 'Herdman, T. H., Kamitsuru, S., & Lopes, C. T.',
        edition: '12th Edition (2021–2023)',
        year: '2021',
      },
    ],
  },
  {
    id: 'adhf-activity-intolerance',
    diseaseIds: ['adhf-heart-failure'],
    expertOrder: 4,
    nandaCode: '00092',
    nandaEdition: 'NANDA-I 2021–2023 (ฉบับภาษาไทยเพื่อการทดสอบ)',
    titleTh: 'ความทนต่อกิจกรรมลดลง',
    titleEn: 'Activity Intolerance',
    shortDescription:
      'ผู้ป่วยมีพลังงานไม่เพียงพอต่อการทำกิจวัตรประจำวัน เนื่องจากหัวใจไม่สามารถเพิ่มปริมาณเลือดตอบสนองต่อการออกแรงได้',
    problemType: 'actual',
    assessmentFilterIds: ['low-perfusion'],
    supportingCues: [
      'เหนื่อยหอบหรือชีพจรเต้นเร็วขึ้นมากเมื่อทำกิจกรรมเบา ๆ (เช่น พลิกตัว ลุกนั่ง เข้าห้องน้ำ)',
      'ค่า SpO₂ ลดลงหรือ BP เปลี่ยนแปลงผิดปกติขณะทำกิจกรรม',
      'ผู้ป่วยบอกว่ารู้สึกอ่อนเพลีย หมดแรงขณะลุกเดิน',
    ],
    riskFactors: [],
    checkSummary: 'สังเกต PR, RR, SpO₂ และอาการเหนื่อยของผู้ป่วยก่อน–ระหว่าง–หลังทำกิจวัตร',
    differentialPoints: [
      {
        similarDiagnosis: 'ความบกพร่องในการเคลื่อนไหวร่างกาย (00085)',
        howToDistinguish:
          'Activity Intolerance เกิดจากความทนทานของระบบหัวใจและปอดลดลง (เหนื่อย ใจสั่น SpO₂ ตกเมื่อออกแรง) ไม่ใช่จากข้อจำกัดของกล้ามเนื้อหรือข้อต่อ',
      },
    ],
    dataGuidelines: [
      'ระบุชนิดกิจกรรมที่กระตุ้นให้เกิดอาการ (เช่น เดินไปห้องน้ำ 5 เมตร, อาบน้ำ)',
      'บันทึกสัญญาณชีพ (PR, RR, BP, SpO₂) ขณะพักเทียบกับหลังทำกิจกรรม',
    ],
    goalSummary: 'ผู้ป่วยทำกิจวัตรประจำวันเท่าที่จำเป็นได้โดยไม่มีอาการหอบเหนื่อยรุนแรงหรือสัญญาณชีพแปรปรวน',
    nocOutcomes: [
      {
        code: '0005',
        labelEn: 'Activity Tolerance',
        labelTh: 'ความทนต่อการทำกิจกรรม',
        edition: 'NOC 6th Edition',
        indicators: ['PR และ RR กลับสู่ค่าปกติหลังพัก', 'ทำกิจวัตรบนเตียงได้โดยไม่เหนื่อยหอบมาก'],
      },
    ],
    actionGuidelines: [
      'ช่วยเหลือการทำกิจวัตรประจำวันและจัดวางของใช้ใกล้ตัวเพื่อสงวนพลังงาน',
      'วางแผนทำกิจกรรมเป็นช่วงสั้น ๆ สลับเวลาพัก และหยุดทันทีหากผู้ป่วยหอบ ใจสั่น หรือเวียนศีรษะ',
    ],
    nicInterventions: [
      {
        code: '0180',
        labelEn: 'Energy Management',
        labelTh: 'การจัดการและสงวนพลังงาน',
        edition: 'NIC 7th Edition',
        guidelineNote: 'บันทึกกิจกรรมจริงที่ผู้ป่วยทำและระดับการช่วยเหลือ',
      },
    ],
    responseGuidelines: [
      'บันทึกสัญญาณชีพและอาการเหนื่อยหลังทำกิจกรรมและหลังพัก 5–10 นาที [__ : __ น.]',
    ],
    commonPitfalls: [
      'เขียนว่า “ผู้ป่วยเหนื่อยง่าย” โดยไม่ระบุว่าเหนื่อยขณะทำกิจกรรมใด',
    ],
    educationalExample: {
      contextNote: 'ตัวอย่างกรณีศึกษาสมมติเพื่อการเรียนรู้ — ห้ามคัดลอกค่าตัวเลขไปใช้กับผู้ป่วยจริง',
      focusLabel: 'Activity Intolerance (ความทนต่อกิจกรรมลดลง)',
      dataText: 'เวลา 07.30 น. ขณะผู้ป่วยลุกนั่งข้างเตียงเพื่อเช็ดตัว มีอาการเหนื่อยหอบ RR เพิ่มจาก 20 เป็น 28 ครั้ง/นาที PR เพิ่มจาก 84 เป็น 110 ครั้ง/นาที SpO₂ ลดจาก 95% เป็น 90%',
      actionText: 'เวลา 07.35 น. หยุดการเช็ดตัวชั่วคราว ช่วยจัดให้นั่งพักพิงหมอนสูง ดูแลสูดออกซิเจนตามแผนและช่วยเช็ดตัวบนเตียงให้เสร็จเพื่อสงวนพลังงาน',
      responseText: 'เวลา 07.50 น. หลังพัก 15 นาที RR ลดเป็น 20 ครั้ง/นาที PR 86 ครั้ง/นาที SpO₂ 95% ผู้ป่วยแจ้งว่าหายเหนื่อยแล้ว',
    },
    compareSummary: {
      definition: 'ร่างกายไม่ทนต่อการออกแรงทำกิจวัตรประจำวันเนื่องจากหัวใจและปอดปรับตัวไม่ทัน',
      supporting: 'เหนื่อย/ใจสั่น/SpO₂ ตกเมื่อออกแรงทำกิจวัตรเบา ๆ',
      distinction: 'เป็นข้อจำกัดจากความทนทานของระบบหัวใจ-ปอด ไม่ใช่กล้ามเนื้ออ่อนแรง',
      dataFocus: 'ชนิดกิจกรรมที่กระตุ้น + สัญญาณชีพก่อน/หลังออกแรง',
      responseFocus: 'ระยะเวลาฟื้นตัวของสัญญาณชีพและอาการเหนื่อยหลังพัก',
    },
    icnpNote: {
      statusLabel: 'ฟังก์ชันระยะถัดไป',
      termExample: 'ICNP Term: Activity Intolerance — รอการเทียบเคียง',
      disclaimer: 'ยังไม่เปิดใช้งานเทียบเคียงอัตโนมัติ',
    },
    provenanceStatus: 'แนวทางที่หน่วยงานทบทวน',
    reviewStatus: 'verified',
    reviewedDate: '02 ก.ย. 2568',
    nextReviewDate: '02 ก.ย. 2569',
    references: [
      {
        title: 'NANDA International Nursing Diagnoses: Definitions and Classification',
        source: 'Herdman, T. H., Kamitsuru, S., & Lopes, C. T.',
        edition: '12th Edition (2021–2023)',
        year: '2021',
      },
    ],
  },
  {
    id: 'adhf-risk-electrolyte-imbalance',
    diseaseIds: ['adhf-heart-failure'],
    expertOrder: 5,
    nandaCode: '00195',
    nandaEdition: 'NANDA-I 2021–2023 (ฉบับภาษาไทยเพื่อการทดสอบ)',
    titleTh: 'ความเสี่ยงต่อความไม่สมดุลของอิเล็กโทรไลต์',
    titleEn: 'Risk for Electrolyte Imbalance',
    shortDescription:
      'ผู้ป่วยมีความเสี่ยงต่อการเปลี่ยนแปลงระดับโพแทสเซียมและโซเดียมจากการได้รับยาขับปัสสาวะหรือภาวะการทำงานของไตเปลี่ยนแปลง',
    problemType: 'risk',
    assessmentFilterIds: ['diuretic-electrolyte'],
    supportingCues: [],
    riskFactors: [
      'ได้รับยาขับปัสสาวะ (Loop diuretic / Thiazide) อย่างต่อเนื่องหรือขนาดสูง',
      'ปัสสาวะออกปริมาณมากหลังได้ยาขับปัสสาวะ หรือมีอาการอาเจียน/ท้องเสียร่วมด้วย',
      'มีประวัติการทำงานของไตบกพร่อง',
    ],
    checkSummary: 'ตรวจสอบค่า K⁺, Na⁺, BUN/Cr ล่าสุด อาการตะคริว/กล้ามเนื้ออ่อนแรง และคลื่นไฟฟ้าหัวใจ',
    differentialPoints: [
      {
        similarDiagnosis: 'ปริมาณน้ำในร่างกายเกิน (00026)',
        howToDistinguish:
          'เป็นข้อวินิจฉัยกลุ่มความเสี่ยงที่เกิดตามมาจากการรักษาภาวะน้ำเกิน (ยาขับปัสสาวะ) เพื่อเฝ้าระวังระดับ K⁺ ผิดปกติและหัวใจเต้นผิดจังหวะ',
      },
    ],
    dataGuidelines: [
      'ระบุชนิดและขนาดยาขับปัสสาวะที่ผู้ป่วยได้รับจริง และปริมาณปัสสาวะที่ขับออก',
      'บันทึกผลตรวจ Electrolyte (Na⁺, K⁺) และค่าไตล่าสุดที่มีรายงานในระบบ',
      'ประเมินอาการเตือน เช่น กล้ามเนื้ออ่อนแรง ตะคริว ชีพจรเต้นไม่สม่ำเสมอ',
    ],
    goalSummary: 'ระดับอิเล็กโทรไลต์ (โดยเฉพาะโพแทสเซียม) อยู่ในเกณฑ์ปลอดภัย ไม่เกิดหัวใจเต้นผิดจังหวะจากเกลือแร่ผิดปกติ',
    nocOutcomes: [
      {
        code: '0606',
        labelEn: 'Electrolyte Balance',
        labelTh: 'ความสมดุลของอิเล็กโทรไลต์',
        edition: 'NOC 6th Edition',
        indicators: ['ค่า Serum K⁺ และ Na⁺ อยู่ในช่วงปกติ', 'ชีพจรสม่ำเสมอ ไม่มีอาการอ่อนแรง'],
      },
    ],
    actionGuidelines: [
      'ติดตามผลตรวจ Electrolyte ตามแผนการรักษา และรายงานแพทย์ทันทีหากค่า K⁺ ต่ำหรือสูงผิดปกติ',
      'ดูแลให้สารละลายเสริมโพแทสเซียมตามแผนการรักษาอย่างปลอดภัยตามอัตราที่กำหนด',
      'สังเกตชีพจรหรือคลื่นไฟฟ้าหัวใจ และอาการกล้ามเนื้ออ่อนแรง/ตะคริว',
    ],
    nicInterventions: [
      {
        code: '2020',
        labelEn: 'Electrolyte Monitoring',
        labelTh: 'การเฝ้าระวังอิเล็กโทรไลต์',
        edition: 'NIC 7th Edition',
        guidelineNote: 'ติดตามผล Lab จริงและอาการแสดงที่สัมพันธ์กัน',
      },
    ],
    responseGuidelines: [
      'บันทึกผลตรวจ Electrolyte ซ้ำ (ถ้ามี) อัตราการเต้นหัวใจ/ชีพจร และอาการกล้ามเนื้ออ่อนแรง [__ : __ น.]',
    ],
    commonPitfalls: [
      'ไม่ติดตามผลโพแทสเซียมหลังผู้ป่วยปัสสาวะออกปริมาณมากจากยาขับปัสสาวะ IV',
    ],
    educationalExample: {
      contextNote: 'ตัวอย่างกรณีศึกษาสมมติเพื่อการเรียนรู้ — ห้ามคัดลอกค่าตัวเลขไปใช้กับผู้ป่วยจริง',
      focusLabel: 'Risk for Electrolyte Imbalance (ความเสี่ยงต่อความไม่สมดุลของอิเล็กโทรไลต์)',
      dataText:
        'เวลา 09.00 น. ผู้ป่วยได้รับ Furosemide 40 mg IV ทุก 12 ชั่วโมง ปัสสาวะออก 2,200 mL ใน 24 ชั่วโมงที่ผ่านมา ผล K⁺ เช้านี้ 3.3 mEq/L ชีพจร 88 ครั้ง/นาที สม่ำเสมอ ไม่มีอาการตะคริว',
      actionText:
        'เวลา 09.15 น. รายงานผล K⁺ ต่ำให้แพทย์ทราบ ดูแลให้ KCl elixir ตามแผนการรักษาพร้อมน้ำดื่ม และเฝ้าระวังอาการอ่อนแรงหรือชีพจรผิดจังหวะ',
      responseText:
        'เวลา 15.00 น. ผู้ป่วยรับประทานยาเสริม K⁺ ได้ครบ ไม่คลื่นไส้อาเจียน ชีพจร 82 ครั้ง/นาที สม่ำเสมอ ไม่มีกล้ามเนื้ออ่อนแรง รอติดตามผล K⁺ ซ้ำวันพรุ่งนี้ตามแผน',
    },
    compareSummary: {
      definition: 'ภาวะเสี่ยงต่อความผิดปกติของระดับเกลือแร่ในเลือดจากการขับน้ำหรือโรคประจำตัว',
      supporting: 'ปัจจัยเสี่ยง: ได้รับยาขับปัสสาวะ, ปัสสาวะออกมาก, ไตเสื่อม',
      distinction: 'เป็นข้อวินิจฉัยความเสี่ยงเพื่อเฝ้าระวังผล Lab และอาการเตือนหัวใจเต้นผิดจังหวะ',
      dataFocus: 'ผล K⁺/Na⁺ ล่าสุด, ชนิดยาขับปัสสาวะ, ชีพจร',
      responseFocus: 'ผลการแก้ไข/ติดตามเกลือแร่และอาการทางคลินิกตามเวลาจริง',
    },
    icnpNote: {
      statusLabel: 'ฟังก์ชันระยะถัดไป',
      termExample: 'ICNP Term: Risk for Electrolyte Imbalance — แยกระบบรหัสชัดเจน',
      disclaimer: 'ยังไม่เชื่อมโยงอัตโนมัติในรุ่น MVP',
    },
    provenanceStatus: 'แนวทางที่หน่วยงานทบทวน',
    reviewStatus: 'verified',
    reviewedDate: '02 ก.ย. 2568',
    nextReviewDate: '02 ก.ย. 2569',
    references: [
      {
        title: 'NANDA International Nursing Diagnoses: Definitions and Classification',
        source: 'Herdman, T. H., Kamitsuru, S., & Lopes, C. T.',
        edition: '12th Edition (2021–2023)',
        year: '2021',
      },
    ],
  },

  // ================= AECOPD =================
  {
    id: 'aecopd-ineffective-breathing-pattern',
    diseaseIds: ['aecopd'],
    expertOrder: 1,
    nandaCode: '00032',
    nandaEdition: 'NANDA-I 2021–2023 (ฉบับภาษาไทยเพื่อการทดสอบ)',
    titleTh: 'รูปแบบการหายใจไม่มีประสิทธิภาพ (AECOPD)',
    titleEn: 'Ineffective Breathing Pattern',
    shortDescription:
      'การหายใจหอบเหนื่อย ช่วงหายใจออกยาว (Prolonged expiration) และใช้กล้ามเนื้อช่วยหายใจในผู้ป่วย COPD กำเริบ',
    problemType: 'actual',
    assessmentFilterIds: ['dyspnea'],
    supportingCues: [
      'ช่วงหายใจออกยาวขึ้น หายใจแบบห่อปาก (Pursed-lip breathing)',
      'RR > 24 ครั้ง/นาที ใช้กล้ามเนื้อคอและไหล่ช่วยหายใจ',
      'ท่านั่งโน้มตัวไปข้างหน้า (Tripod position) เพื่อช่วยการหายใจ',
    ],
    riskFactors: [],
    checkSummary: 'ตรวจ RR, Pursed-lip breathing, เป้าหมาย SpO₂ (มัก 88–92%) และอาการซึมจาก CO₂ คั่ง',
    differentialPoints: [
      {
        similarDiagnosis: 'การขับเสมหะไม่มีประสิทธิภาพ (00031)',
        howToDistinguish:
          'Breathing Pattern ใน AECOPD มักเด่นเรื่องหลอดลมตีบและลมคั่งในปอด (Air trapping) ขณะที่ Airway Clearance เด่นเรื่องเสมหะข้นปริมาณมากอุดกั้น',
      },
    ],
    dataGuidelines: [
      'บันทึกอัตราการหายใจ ช่วงหายใจออก และการใช้กล้ามเนื้อช่วยหายใจ',
      'ระบุเป้าหมายค่า SpO₂ ที่แพทย์กำหนดไว้เฉพาะราย (เช่น 88–92%) พร้อมอัตราออกซิเจนจริง',
      'ประเมินระดับความรู้สึกตัวเพื่อเฝ้าระวังภาวะคาร์บอนไดออกไซด์คั่ง',
    ],
    goalSummary: 'จังหวะหายใจช้าลง ช่วงหายใจออกมีประสิทธิภาพขึ้น และค่า SpO₂ อยู่ในช่วงเป้าหมายเฉพาะราย',
    nocOutcomes: [
      {
        code: '0415',
        labelEn: 'Respiratory Status',
        labelTh: 'ภาวะการหายใจ',
        edition: 'NOC 6th Edition',
        indicators: ['RR ลดลงใกล้ค่าพื้นฐานของผู้ป่วย', 'SpO₂ อยู่ในช่วงเป้าหมาย (88–92% ตามแผน)'],
      },
    ],
    actionGuidelines: [
      'จัดท่านั่งศีรษะสูงหรือโน้มตัวพิงโต๊ะข้างเตียง',
      'แนะนำวิธีหายใจแบบ Pursed-lip breathing เพื่อป้องกันหลอดลมฝอยแฟบขณะหายใจออก',
      'ดูแลให้ยาพ่นขยายหลอดลมและออกซิเจนตามแผนการรักษาอย่างระมัดระวังไม่เกินอัตราที่กำหนด',
    ],
    nicInterventions: [
      {
        code: '3390',
        labelEn: 'Ventilation Assistance',
        labelTh: 'การช่วยเหลือการระบายอากาศ',
        edition: 'NIC 7th Edition',
        guidelineNote: 'ควบคุมออกซิเจนตามเป้าหมาย COPD และฝึกการหายใจห่อปาก',
      },
    ],
    responseGuidelines: [
      'บันทึก RR, ลักษณะการใช้กล้ามเนื้อช่วยหายใจ, SpO₂ และความรู้สึกตัวหลังพ่นยา/ฝึกหายใจ [__ : __ น.]',
    ],
    commonPitfalls: [
      'ปรับเพิ่มออกซิเจนอัตราสูงเกินแผนการรักษาโดยไม่ปรึกษาแพทย์ ทำให้เสี่ยงกดศูนย์หายใจ/CO₂ คั่ง',
    ],
    educationalExample: {
      contextNote: 'ตัวอย่างกรณีศึกษาสมมติเพื่อการเรียนรู้ — ห้ามคัดลอกค่าตัวเลขไปใช้กับผู้ป่วยจริง',
      focusLabel: 'Ineffective Breathing Pattern (รูปแบบการหายใจไม่มีประสิทธิภาพ)',
      dataText: 'เวลา 06.30 น. ผู้ป่วย COPD หอบเหนื่อย นั่งโน้มตัวไปข้างหน้า RR 28 ครั้ง/นาที หายใจห่อปาก ช่วงหายใจออกยาว SpO₂ 87% (O₂ cannula 2 LPM) ตื่นรู้ตัวดี',
      actionText: 'เวลา 06.35 น. ดูแลพ่นยาขยายหลอดลมตามแผนการรักษา จัดท่านั่งพิงหมอนสูงและสอนหายใจแบบ Pursed-lip breathing คงออกซิเจนตามเป้าหมาย SpO₂ 88–92%',
      responseText: 'เวลา 07.05 น. RR ลดเป็น 22 ครั้ง/นาที การใช้กล้ามเนื้อไหล่ช่วยหายใจลดลง SpO₂ 91% (O₂ cannula 2 LPM) ตื่นรู้ตัวดีไม่ซึม',
    },
    compareSummary: {
      definition: 'กลไกการระบายอากาศบกพร่องจากภาวะลมคั่งและหลอดลมตีบในผู้ป่วย COPD',
      supporting: 'Pursed-lip breathing, หายใจออกยาว, ใช้กล้ามเนื้อช่วยหายใจ',
      distinction: 'ต้องระวังเป้าหมาย SpO₂ เฉพาะรายและเฝ้าระวัง CO₂ คั่ง',
      dataFocus: 'RR, ลักษณะช่วงหายใจออก, SpO₂ เทียบเป้า 88–92%, ความรู้สึกตัว',
      responseFocus: 'RR, ความเหนื่อย, SpO₂ และระดับความรู้สึกตัวซ้ำ',
    },
    icnpNote: {
      statusLabel: 'ฟังก์ชันระยะถัดไป',
      termExample: 'ICNP Term: Dyspnea / Impaired Breathing',
      disclaimer: 'ยังไม่เปิดใช้งานเทียบเคียงอัตโนมัติ',
    },
    provenanceStatus: 'การเชื่อมโยงจากเอกสารอ้างอิง',
    reviewStatus: 'review-due',
    reviewedDate: '10 ต.ค. 2567',
    nextReviewDate: '10 ต.ค. 2568',
    references: [
      {
        title: 'GOLD Report: Global Strategy for Prevention, Diagnosis and Management of COPD',
        source: 'Global Initiative for Chronic Obstructive Lung Disease',
        edition: '2024 Edition (เอกสารอ้างอิงตัวอย่าง)',
        year: '2024',
      },
    ],
  },
  {
    id: 'aecopd-ineffective-airway-clearance',
    diseaseIds: ['aecopd'],
    expertOrder: 2,
    nandaCode: '00031',
    nandaEdition: 'NANDA-I 2021–2023 (ฉบับภาษาไทยเพื่อการทดสอบ)',
    titleTh: 'การขับเสมหะไม่มีประสิทธิภาพ (AECOPD)',
    titleEn: 'Ineffective Airway Clearance',
    shortDescription: 'การมีเสมหะปริมาณมากหรือเปลี่ยนสีอุดกั้นหลอดลมที่ตีบแคบในระยะกำเริบของ COPD',
    problemType: 'actual',
    assessmentFilterIds: ['sputum'],
    supportingCues: [
      'ไอมีเสมหะมากขึ้นหรือเปลี่ยนเป็นสีเหลือง/เขียวเหนียวข้น',
      'ฟังปอดพบ Wheezing และ Rhonchi กระจาย',
    ],
    riskFactors: [],
    checkSummary: 'ประเมินสี/ปริมาณเสมหะ เสียง Rhonchi/Wheezing และเทคนิคการไอ',
    differentialPoints: [
      {
        similarDiagnosis: 'รูปแบบการหายใจไม่มีประสิทธิภาพ (00032)',
        howToDistinguish: 'Airway Clearance มุ่งไปที่การระบายเสมหะที่อุดกั้นโดยตรง',
      },
    ],
    dataGuidelines: [
      'บันทึกสี ปริมาณ ความข้นของเสมหะ และเสียงปอดก่อนจัดการทางเดินหายใจ',
    ],
    goalSummary: 'ผู้ป่วยขับเสมหะออกได้สะดวกขึ้นและเสียงอุดกั้นจากเสมหะลดลง',
    nocOutcomes: [
      {
        code: '0410',
        labelEn: 'Respiratory Status: Airway Patency',
        labelTh: 'ความโล่งของทางเดินหายใจ',
        edition: 'NOC 6th Edition',
        indicators: ['ขับเสมหะออกได้', 'เสียง Rhonchi ลดลง'],
      },
    ],
    actionGuidelines: [
      'ดูแลพ่นยาขยายหลอดลมและให้ยาละลายเสมหะตามแผนการรักษา',
      'สอนวิธี Huff coughing เพื่อลดอาการหลอดลมแฟบขณะไอแรงเกินไป',
    ],
    nicInterventions: [
      {
        code: '3250',
        labelEn: 'Cough Enhancement',
        labelTh: 'การส่งเสริมประสิทธิภาพการไอ',
        edition: 'NIC 7th Edition',
        guidelineNote: 'ใช้เทคนิค Huff coughing สำหรับผู้ป่วย COPD เพื่อลดแรงเค้นทางเดินหายใจ',
      },
    ],
    responseGuidelines: [
      'บันทึกลักษณะและปริมาณเสมหะที่ขับออกได้ พร้อมเสียงปอดหลังไอ/พ่นยา [__ : __ น.]',
    ],
    commonPitfalls: ['แนะนำให้ไอแรงซ้ำ ๆ จนผู้ป่วยหอบเหนื่อยมากขึ้นแทนการใช้ Huff coughing'],
    educationalExample: {
      contextNote: 'ตัวอย่างกรณีศึกษาสมมติเพื่อการเรียนรู้',
      focusLabel: 'Ineffective Airway Clearance',
      dataText: 'เวลา 10.00 น. ผู้ป่วยไอเสมหะเหนียวข้นออกยาก ฟังปอดมีเสียง Rhonchi และ Wheezing ทั่วปอดทั้งสองข้าง',
      actionText: 'เวลา 10.10 น. ดูแลพ่นยาตามแผนการรักษา และแนะนำการไอแบบ Huff coughing พร้อมให้จิบน้ำอุ่น',
      responseText: 'เวลา 10.45 น. ผู้ป่วยไอขับเสมหะสีเหลืองอ่อนออกได้ประมาณ 5 mL เสียง Rhonchi ลดลง',
    },
    compareSummary: {
      definition: 'ทางเดินหายใจมีเสมหะคั่งค้างจากการติดเชื้อหรือหลอดลมอักเสบกำเริบ',
      supporting: 'เสมหะข้น/เปลี่ยนสี, เสียง Rhonchi, ไอออกลำบาก',
      distinction: 'เน้นการขจัดเสมหะด้วยเทคนิคที่ไม่ทำให้หลอดลมแฟบ',
      dataFocus: 'เสียงปอด, สีและปริมาณเสมหะ',
      responseFocus: 'เสมหะที่ขับได้และเสียง Rhonchi หลังทำ Huff cough/พ่นยา',
    },
    icnpNote: {
      statusLabel: 'ฟังก์ชันระยะถัดไป',
      termExample: 'ICNP Term: Ineffective Airway Clearance',
      disclaimer: 'ยังไม่เปิดใช้งานเทียบเคียงอัตโนมัติ',
    },
    provenanceStatus: 'การเชื่อมโยงจากเอกสารอ้างอิง',
    reviewStatus: 'review-due',
    reviewedDate: '10 ต.ค. 2567',
    nextReviewDate: '10 ต.ค. 2568',
    references: [
      {
        title: 'NANDA International Nursing Diagnoses: Definitions and Classification',
        source: 'Herdman, T. H. et al.',
        edition: '12th Edition (2021–2023)',
        year: '2021',
      },
    ],
  },
  {
    id: 'aecopd-anxiety',
    diseaseIds: ['aecopd'],
    expertOrder: 3,
    nandaCode: '00146',
    nandaEdition: 'NANDA-I 2021–2023 (ฉบับภาษาไทยเพื่อการทดสอบ)',
    titleTh: 'ความวิตกกังวลจากการหายใจลำบาก',
    titleEn: 'Anxiety',
    shortDescription:
      'ความรู้สึกกลัว ตื่นตระหนก หรือไม่สบายใจอย่างรุนแรงซึ่งมักเกิดร่วมกับอาการหายใจไม่อิ่มและกระตุ้นให้หอบมากขึ้น',
    problemType: 'actual',
    assessmentFilterIds: ['anxiety-dyspnea'],
    supportingCues: [
      'ผู้ป่วยแสดงสีหน้าตื่นตระหนก กลัวหายใจไม่ออก หรือซักถามซ้ำ ๆ',
      'กระสับกระส่าย มือสั่น ชีพจรเต้นเร็วร่วมกับอาการหอบ',
    ],
    riskFactors: [],
    checkSummary: 'แยกให้ออกระหว่างกระสับกระส่ายจากพร่องออกซิเจนกับความวิตกกังวลทางอารมณ์',
    differentialPoints: [
      {
        similarDiagnosis: 'การแลกเปลี่ยนก๊าซบกพร่อง (00030)',
        howToDistinguish:
          'ต้องตรวจค่า SpO₂ และสัญญาณชีพก่อนเสมอ เพื่อยืนยันว่าอาการกระสับกระส่ายไม่ได้เกิดจากภาวะพร่องออกซิเจนเฉียบพลัน',
      },
    ],
    dataGuidelines: [
      'บันทึกคำพูดหรือพฤติกรรมที่แสดงถึงความกังวลควบคู่กับค่า SpO₂ และสัญญาณชีพจริง',
    ],
    goalSummary: 'ผู้ป่วยสงบลง สามารถควบคุมจังหวะหายใจร่วมกับพยาบาลได้',
    nocOutcomes: [
      {
        code: '1211',
        labelEn: 'Anxiety Level',
        labelTh: 'ระดับความวิตกกังวล',
        edition: 'NOC 6th Edition',
        indicators: ['สีหน้าผ่อนคลายขึ้น', 'ให้ความร่วมมือในการควบคุมการหายใจ'],
      },
    ],
    actionGuidelines: [
      'อยู่เป็นเพื่อนผู้ป่วยด้วยท่าทีสงบ มั่นคง และสื่อสารด้วยประโยคสั้น ๆ ชัดเจน',
      'นำจังหวะการหายใจทีละขั้น และเปิดโอกาสให้ญาติที่สงบอยู่ใกล้ชิดตามความเหมาะสม',
    ],
    nicInterventions: [
      {
        code: '5820',
        labelEn: 'Anxiety Reduction',
        labelTh: 'การลดความวิตกกังวล',
        edition: 'NIC 7th Edition',
        guidelineNote: 'ใช้เมื่อประเมินแล้วว่าไม่ได้มีภาวะขาดออกซิเจนวิกฤตที่ต้องกู้ชีพ',
      },
    ],
    responseGuidelines: [
      'บันทึกสีหน้า ท่าทาง การควบคุมการหายใจ และคำบอกเล่าของผู้ป่วยหลังให้การประคับประคอง [__ : __ น.]',
    ],
    commonPitfalls: ['สรุปว่าผู้ป่วย “วิตกกังวลไปเอง” โดยไม่ได้วัดค่า SpO₂ ก่อน'],
    educationalExample: {
      contextNote: 'ตัวอย่างกรณีศึกษาสมมติเพื่อการเรียนรู้',
      focusLabel: 'Anxiety',
      dataText: 'เวลา 22.00 น. SpO₂ 91% (O₂ cannula 2 LPM) แต่ผู้ป่วยสีหน้าตื่นตระหนก จับแขนพยาบาลแน่น บอกว่า “กลัวหายใจไม่ทันอีก” PR 104 ครั้ง/นาที',
      actionText: 'เวลา 22.05 น. ยืนอยู่ข้างเตียงด้วยท่าทีสงบ แนะนำให้มองตามและฝึกหายใจออกช้า ๆ พร้อมอธิบายขั้นตอนการพ่นยาที่กำลังจะได้รับ',
      responseText: 'เวลา 22.20 น. สีหน้าผู้ป่วยผ่อนคลายขึ้น ปล่อยมือและควบคุมจังหวะหายใจตามคำแนะนำได้ PR ลดเป็น 88 ครั้ง/นาที',
    },
    compareSummary: {
      definition: 'ความตื่นตระหนกหรือกังวลต่ออาการหายใจลำบากที่ทำให้หอบมากขึ้นเป็นวงจร',
      supporting: 'ตื่นตระหนก, กลัวขาดอากาศ, ซักถามซ้ำ, SpO₂ คงที่ในเกณฑ์เป้า',
      distinction: 'ต้องแยกจากกระสับกระส่ายที่เกิดจาก Hypoxia จริงด้วยการวัด SpO₂',
      dataFocus: 'พฤติกรรม/คำพูดแสดงความกังวล + ค่า SpO₂ ยืนยันความปลอดภัย',
      responseFocus: 'สีหน้า ความสงบ และความร่วมมือในการหายใจ',
    },
    icnpNote: {
      statusLabel: 'ฟังก์ชันระยะถัดไป',
      termExample: 'ICNP Term: Anxiety',
      disclaimer: 'ยังไม่เปิดใช้งานเทียบเคียงอัตโนมัติ',
    },
    provenanceStatus: 'การเชื่อมโยงจากเอกสารอ้างอิง',
    reviewStatus: 'review-due',
    reviewedDate: '10 ต.ค. 2567',
    nextReviewDate: '10 ต.ค. 2568',
    references: [
      {
        title: 'NANDA International Nursing Diagnoses: Definitions and Classification',
        source: 'Herdman, T. H. et al.',
        edition: '12th Edition (2021–2023)',
        year: '2021',
      },
    ],
  },
  {
    id: 'aecopd-risk-imbalanced-nutrition',
    diseaseIds: ['aecopd'],
    expertOrder: 4,
    nandaCode: '00002 / 00232',
    nandaEdition: 'NANDA-I 2021–2023 (ฉบับภาษาไทยเพื่อการทดสอบ)',
    titleTh: 'ความเสี่ยงต่อภาวะได้รับสารอาหารน้อยกว่าความต้องการของร่างกาย',
    titleEn: 'Risk for Imbalanced Nutrition: Less Than Body Requirements',
    shortDescription:
      'ผู้ป่วย COPD ใช้พลังงานในการหายใจสูงแต่มักรับประทานได้น้อยเนื่องจากเหนื่อยขณะเคี้ยวและกลืน',
    problemType: 'risk',
    assessmentFilterIds: ['poor-intake'],
    supportingCues: [],
    riskFactors: [
      'รับประทานอาหารได้น้อยกว่า 50% ของมื้อเนื่องจากเหนื่อยหอบขณะรับประทาน',
      'ค่า BMI ต่ำหรือน้ำหนักลดลงต่อเนื่องในช่วง 1–3 เดือน',
    ],
    checkSummary: 'ประเมินปริมาณอาหารที่รับประทานได้จริงแต่ละมื้อ, BMI และอาการเหนื่อยขณะเคี้ยว',
    differentialPoints: [
      {
        similarDiagnosis: 'ความทนต่อกิจกรรมลดลง (00092)',
        howToDistinguish: 'เน้นด้านปริมาณสารอาหารที่ได้รับเทียบความต้องการพลังงานของกล้ามเนื้อหายใจ',
      },
    ],
    dataGuidelines: ['บันทึกสัดส่วนอาหารที่รับประทานได้จริง น้ำหนักตัว และสาเหตุที่รับประทานได้น้อย'],
    goalSummary: 'ได้รับพลังงานและโปรตีนใกล้เคียงเป้าหมายโดยไม่เหนื่อยหอบระหว่างมื้ออาหาร',
    nocOutcomes: [
      {
        code: '1008',
        labelEn: 'Nutritional Status: Food & Fluid Intake',
        labelTh: 'ภาวะโภชนาการ: ปริมาณอาหารที่ได้รับ',
        edition: 'NOC 6th Edition',
        indicators: ['รับประทานมื้อย่อยได้มากขึ้น', 'น้ำหนักตัวไม่ลดลงเพิ่ม'],
      },
    ],
    actionGuidelines: [
      'จัดอาหารมื้อเล็กแต่บ่อยครั้ง (Small frequent meals) และพักก่อนมื้ออาหาร',
      'ดูแลให้ออกซิเจนทาง Nasal cannula ต่อเนื่องขณะรับประทานอาหารตามแผนการรักษา',
    ],
    nicInterventions: [
      {
        code: '1100',
        labelEn: 'Nutrition Management',
        labelTh: 'การจัดการด้านโภชนาการ',
        edition: 'NIC 7th Edition',
        guidelineNote: 'ประสานนักโภชนาการหากรับประทานได้น้อยต่อเนื่อง',
      },
    ],
    responseGuidelines: ['บันทึกปริมาณอาหารที่รับประทานได้จริงในมื้อนั้น ๆ และอาการเหนื่อยขณะรับประทาน [__ : __ น.]'],
    commonPitfalls: ['ไม่ตรวจสอบว่าผู้ป่วยถอดสายออกซิเจนออกขณะรับประทานอาหารจนเหนื่อยหอบ'],
    educationalExample: {
      contextNote: 'ตัวอย่างกรณีศึกษาสมมติเพื่อการเรียนรู้',
      focusLabel: 'Risk for Imbalanced Nutrition',
      dataText: 'เวลา 11.30 น. ผู้ป่วยรับประทานมื้อเช้าได้ 30% แจ้งว่าเหนื่อยขณะเคี้ยว BMI 17.8 kg/m²',
      actionText: 'เวลา 11.45 น. จัดให้นอนพัก 15 นาทีก่อนมื้อกลางวัน จัดอาหารอ่อนแบ่งมื้อย่อย และดูแลให้คงสาย O₂ cannula 2 LPM ขณะรับประทาน',
      responseText: 'เวลา 12.30 น. ผู้ป่วยรับประทานมื้อกลางวันได้ 70% ของมื้อย่อย ไม่เกิดอาการหอบรุนแรง SpO₂ 91%',
    },
    compareSummary: {
      definition: 'เสี่ยงต่อการขาดพลังงานและโปรตีนจากอาการเหนื่อยขณะรับประทานและใช้พลังงานหายใจสูง',
      supporting: 'ปัจจัยเสี่ยง: กินได้น้อยจากอาการเหนื่อย, BMI ต่ำ, น้ำหนักลด',
      distinction: 'ใช้ข้อมูลสัดส่วนการรับประทานอาหารและน้ำหนักตัวเป็นตัวติดตาม',
      dataFocus: 'ปริมาณอาหารที่กินได้จริง, BMI, อุปสรรคขณะเคี้ยว/กลืน',
      responseFocus: 'ปริมาณมื้อย่อยที่รับประทานได้จริงและอาการเหนื่อยระหว่างมื้อ',
    },
    icnpNote: {
      statusLabel: 'ฟังก์ชันระยะถัดไป',
      termExample: 'ICNP Term: Risk for Impaired Nutritional Intake',
      disclaimer: 'ยังไม่เปิดใช้งานเทียบเคียงอัตโนมัติ',
    },
    provenanceStatus: 'การเชื่อมโยงจากเอกสารอ้างอิง',
    reviewStatus: 'review-due',
    reviewedDate: '10 ต.ค. 2567',
    nextReviewDate: '10 ต.ค. 2568',
    references: [
      {
        title: 'NANDA International Nursing Diagnoses: Definitions and Classification',
        source: 'Herdman, T. H. et al.',
        edition: '12th Edition (2021–2023)',
        year: '2021',
      },
    ],
  },

  // ================= DKA =================
  {
    id: 'dka-deficient-fluid-volume',
    diseaseIds: ['dka-diabetes'],
    expertOrder: 1,
    nandaCode: '00027',
    nandaEdition: 'NANDA-I 2021–2023 (ฉบับภาษาไทยเพื่อการทดสอบ)',
    titleTh: 'ภาวะขาดสารน้ำ (Deficient Fluid Volume)',
    titleEn: 'Deficient Fluid Volume',
    shortDescription:
      'การสูญเสียน้ำและเกลือแร่ปริมาณมากจากการขับปัสสาวะออสโมติก (Osmotic diuresis) เนื่องจากระดับน้ำตาลในเลือดสูง',
    problemType: 'actual',
    assessmentFilterIds: ['dehydration'],
    supportingCues: [
      'เยื่อบุช่องปากแห้ง ริมฝีปากแห้ง ความตึงตัวของผิวหนังลดลง (Poor skin turgor)',
      'ชีพจรเต้นเร็ว ความดันโลหิตต่ำลงเมื่อเปลี่ยนท่า หรือกระหายน้ำมาก',
      'ปัสสาวะออกน้อยลงในระยะขาดน้ำรุนแรง หรือปัสสาวะออกมากในระยะแรกตามด้วยขาดน้ำ',
    ],
    riskFactors: [],
    checkSummary: 'ตรวจสัญญาณชีพ (BP/PR), ความชุ่มชื้นของเยื่อบุ, Skin turgor และบันทึก I/O ทุกชั่วโมง',
    differentialPoints: [
      {
        similarDiagnosis: 'ความเสี่ยงต่อระดับน้ำตาลในเลือดไม่คงที่ (00179)',
        howToDistinguish:
          'Deficient Fluid Volume เน้นการแก้ไขภาวะขาดน้ำและการไหลเวียนโลหิต (IV fluid resuscitation & I/O) ก่อน/ร่วมกับการลดระดับน้ำตาล',
      },
    ],
    dataGuidelines: [
      'บันทึก BP, PR, ความชุ่มชื้นเยื่อบุช่องปาก และ Capillary refill',
      'บันทึกชนิดและอัตราการให้สารน้ำทางหลอดเลือดดำ รวมถึงยอด I/O จริงตามรอบเวลา',
    ],
    goalSummary: 'ความสมดุลสารน้ำกลับสู่ปกติ สัญญาณชีพคงที่ เยื่อบุชุ่มชื้น และปัสสาวะออกเพียงพอ',
    nocOutcomes: [
      {
        code: '0602',
        labelEn: 'Hydration',
        labelTh: 'ภาวะความชุ่มชื้นของร่างกาย',
        edition: 'NOC 6th Edition',
        indicators: ['BP และ PR คงที่', 'เยื่อบุช่องปากชุ่มชื้น', 'ปัสสาวะออก ≥ 0.5 mL/kg/hr'],
      },
    ],
    actionGuidelines: [
      'ดูแลให้สารน้ำทางหลอดเลือดดำ (เช่น 0.9% NaCl) ตามแผนการรักษาอย่างแม่นยำผ่าน Infusion pump',
      'ติดตามสัญญาณชีพและบันทึก Intake/Output ทุก 1 ชั่วโมงในระยะเฉียบพลัน',
      'สังเกตอาการน้ำเกินในผู้สูงอายุหรือผู้มีโรคหัวใจร่วมขณะให้สารน้ำเร็ว',
    ],
    nicInterventions: [
      {
        code: '4130',
        labelEn: 'Fluid Monitoring',
        labelTh: 'การเฝ้าระวังสารน้ำ',
        edition: 'NIC 7th Edition',
        guidelineNote: 'บันทึกอัตรา IV ที่ให้จริงเทียบแผนการรักษาและปริมาณปัสสาวะ',
      },
    ],
    responseGuidelines: [
      'บันทึกค่า BP, PR, ปริมาณปัสสาวะ และสภาพความชุ่มชื้นหลังได้รับสารน้ำตามเวลาจริง [__ : __ น.]',
    ],
    commonPitfalls: ['เร่งเปิดสารน้ำโดยไม่ได้ตรวจสอบอัตราจริงหรือลืมตรวจฟังปอดในผู้ป่วยสูงอายุ'],
    educationalExample: {
      contextNote: 'ตัวอย่างกรณีศึกษาสมมติเพื่อการเรียนรู้',
      focusLabel: 'Deficient Fluid Volume',
      dataText: 'เวลา 10.00 น. ผู้ป่วยปากแห้ง กระหายน้ำ Skin turgor ลดลง BP 96/62 mmHg, PR 114 ครั้ง/นาที',
      actionText: 'เวลา 10.05 น. ดูแลให้ 0.9% NaCl 1,000 mL ทางหลอดเลือดดำใน 1 ชั่วโมงแรกตามแผนการรักษา และตวงบันทึกปัสสาวะทุกชั่วโมง',
      responseText: 'เวลา 11.05 น. BP 108/70 mmHg, PR 98 ครั้ง/นาที ปัสสาวะออก 55 mL ใน 1 ชั่วโมง ฟังปอดปกติไม่มีเสียง Crackles',
    },
    compareSummary: {
      definition: 'ร่างกายสูญเสียน้ำและเกลือแร่จากการปัสสาวะมากจากภาวะน้ำตาลสูง',
      supporting: 'ปากแห้ง, Poor skin turgor, PR เร็ว, BP ต่ำ, กระหายน้ำ',
      distinction: 'มุ่งจัดการการชดเชยสารน้ำและความดันโลหิตเป็นหลัก',
      dataFocus: 'BP/PR, เยื่อบุ/Skin turgor, อัตรา IV และยอด I/O',
      responseFocus: 'BP, PR และปริมาณปัสสาวะหลังได้รับสารน้ำ',
    },
    icnpNote: {
      statusLabel: 'ฟังก์ชันระยะถัดไป',
      termExample: 'ICNP Term: Fluid Volume Deficit',
      disclaimer: 'ยังไม่เปิดใช้งานเทียบเคียงอัตโนมัติ',
    },
    provenanceStatus: 'แนวทางที่หน่วยงานทบทวน',
    reviewStatus: 'verified',
    reviewedDate: '20 ก.ย. 2568',
    nextReviewDate: '20 ก.ย. 2569',
    references: [
      {
        title: 'NANDA International Nursing Diagnoses: Definitions and Classification',
        source: 'Herdman, T. H. et al.',
        edition: '12th Edition (2021–2023)',
        year: '2021',
      },
    ],
  },
  {
    id: 'dka-risk-unstable-glucose',
    diseaseIds: ['dka-diabetes'],
    expertOrder: 2,
    nandaCode: '00179',
    nandaEdition: 'NANDA-I 2021–2023 (ฉบับภาษาไทยเพื่อการทดสอบ)',
    titleTh: 'ความเสี่ยงต่อระดับน้ำตาลในเลือดไม่คงที่',
    titleEn: 'Risk for Unstable Blood Glucose Level',
    shortDescription:
      'ความเสี่ยงต่อการเปลี่ยนแปลงระดับน้ำตาลในเลือดสูงเกินเกณฑ์หรือลดลงเร็วจนเกิดภาวะน้ำตาลต่ำขณะได้รับ Regular Insulin ทางหลอดเลือดดำ',
    problemType: 'risk',
    assessmentFilterIds: ['glucose-fluctuation'],
    supportingCues: [],
    riskFactors: [
      'กำลังได้รับ Insulin drip ทางหลอดเลือดดำซึ่งต้องปรับอัตราตามค่า DTX ทุกชั่วโมง',
      'ความเจ็บป่วยเฉียบพลัน/การติดเชื้อ หรือรับประทานอาหารยังไม่คงที่',
    ],
    checkSummary: 'ตรวจ DTX ตามรอบเวลา, อัตรา Insulin drip จริง, และอาการเตือนน้ำตาลต่ำ (เหงื่อออก ใจสั่น ซึม)',
    differentialPoints: [
      {
        similarDiagnosis: 'การจัดการสุขภาพตนเองไม่มีประสิทธิภาพ (00078)',
        howToDistinguish:
          'Risk for Unstable Blood Glucose ใช้ในระยะเฉียบพลันที่หอผู้ป่วยเพื่อควบคุมระดับน้ำตาลและป้องกัน Hypoglycemia ขณะได้ Insulin drip',
      },
    ],
    dataGuidelines: [
      'บันทึกค่า DTX พร้อมเวลาที่เจาะ และอัตรา Insulin drip ที่กำลังเดินอยู่จริง (unit/hr)',
      'บันทึกอาการเตือนภาวะน้ำตาลต่ำหรืออาการซึม/หายใจหอบลึก (Kussmaul)',
    ],
    goalSummary: 'ระดับน้ำตาลในเลือดลดลงอย่างค่อยเป็นค่อยไปตามเกณฑ์ปลอดภัย ไม่เกิดภาวะน้ำตาลต่ำ (Hypoglycemia)',
    nocOutcomes: [
      {
        code: '2300',
        labelEn: 'Blood Glucose Level',
        labelTh: 'ระดับน้ำตาลในเลือด',
        edition: 'NOC 6th Edition',
        indicators: ['ค่า DTX ลดลงตามเป้าหมาย 50–75 mg/dL/hr', 'ไม่เกิด DTX < 70 mg/dL'],
      },
    ],
    actionGuidelines: [
      'เจาะตรวจ DTX ทุก 1 ชั่วโมงตามแนวทาง DKA protocol และปรับอัตรา Insulin drip ตามแผนการรักษา (Double-check ก่อนปรับ)',
      'เตรียมเปลี่ยนสารน้ำที่มี Dextrose ผสมตามแผนเมื่อระดับน้ำตาลลดลงถึงเกณฑ์กำหนด',
    ],
    nicInterventions: [
      {
        code: '2120',
        labelEn: 'Hyperglycemia Management',
        labelTh: 'การจัดการภาวะน้ำตาลในเลือดสูง',
        edition: 'NIC 7th Edition',
        guidelineNote: 'บันทึกเฉพาะค่า DTX และอัตรา Insulin ที่ปรับจริง',
      },
    ],
    responseGuidelines: [
      'บันทึกค่า DTX รอบถัดไปหลังปรับอัตรา Insulin และอาการทางระบบประสาท [__ : __ น.]',
    ],
    commonPitfalls: ['ปรับอัตรา Insulin drip โดยไม่ระบุเวลาและค่า DTX ที่ใช้ตัดสินใจ'],
    educationalExample: {
      contextNote: 'ตัวอย่างกรณีศึกษาสมมติเพื่อการเรียนรู้',
      focusLabel: 'Risk for Unstable Blood Glucose Level',
      dataText: 'เวลา 13.00 น. DTX 340 mg/dL ได้รับ RI drip 5 unit/hr ตื่นรู้ตัวดี ไม่มีอาการใจสั่นหรือเหงื่อออก',
      actionText: 'เวลา 13.05 น. ปรับอัตรา RI drip เป็น 4 unit/hr ตามแผนการรักษา DKA protocol (Double-check ร่วมกับพยาบาลเวร) และตั้งเจาะ DTX ซ้ำใน 1 ชั่วโมง',
      responseText: 'เวลา 14.00 น. DTX ลดลงเป็น 280 mg/dL (ลดลง 60 mg/dL/hr) ผู้ป่วยตื่นดี ไม่มีอาการน้ำตาลต่ำ',
    },
    compareSummary: {
      definition: 'เสี่ยงต่อระดับน้ำตาลแกว่งสูงหรือตกเร็วระหว่างให้การรักษาด้วยอินซูลิน',
      supporting: 'ปัจจัยเสี่ยง: ได้รับ RI drip, ติดเชื้อ, กินอาหารไม่สม่ำเสมอ',
      distinction: 'เฝ้าระวังความเร็วของการลดระดับน้ำตาลและป้องกัน Hypoglycemia',
      dataFocus: 'DTX รายชั่วโมง, อัตรา RI drip จริง, อาการ Hypoglycemia',
      responseFocus: 'ค่า DTX รอบถัดไปเทียบอัตราการเปลี่ยนแปลงที่ปลอดภัย',
    },
    icnpNote: {
      statusLabel: 'ฟังก์ชันระยะถัดไป',
      termExample: 'ICNP Term: Risk for Unstable Blood Glucose',
      disclaimer: 'ยังไม่เปิดใช้งานเทียบเคียงอัตโนมัติ',
    },
    provenanceStatus: 'แนวทางที่หน่วยงานทบทวน',
    reviewStatus: 'verified',
    reviewedDate: '20 ก.ย. 2568',
    nextReviewDate: '20 ก.ย. 2569',
    references: [
      {
        title: 'NANDA International Nursing Diagnoses: Definitions and Classification',
        source: 'Herdman, T. H. et al.',
        edition: '12th Edition (2021–2023)',
        year: '2021',
      },
    ],
  },
  {
    id: 'dka-risk-electrolyte-imbalance',
    diseaseIds: ['dka-diabetes'],
    expertOrder: 3,
    nandaCode: '00195',
    nandaEdition: 'NANDA-I 2021–2023 (ฉบับภาษาไทยเพื่อการทดสอบ)',
    titleTh: 'ความเสี่ยงต่อความไม่สมดุลของอิเล็กโทรไลต์ในภาวะ DKA',
    titleEn: 'Risk for Electrolyte Imbalance',
    shortDescription:
      'อินซูลินจะนำโพแทสเซียมเข้าสู่เซลล์อย่างรวดเร็ว เสี่ยงต่อภาวะโพแทสเซียมในเลือดต่ำรุนแรง (Hypokalemia)',
    problemType: 'risk',
    assessmentFilterIds: ['electrolyte-shift'],
    supportingCues: [],
    riskFactors: [
      'กำลังได้รับ Insulin drip เพื่อรักษา DKA ทำให้ K⁺ เคลื่อนเข้าสู่เซลล์',
      'มีการสูญเสียเกลือแร่ทางปัสสาวะปริมาณมากร่วมกับภาวะเลือดเป็นกรด',
    ],
    checkSummary: 'ตรวจสอบค่า K⁺ ก่อนเริ่ม Insulin และติดตามผลทุก 2–4 ชม. รวมถึงคลื่นไฟฟ้าหัวใจ',
    differentialPoints: [
      {
        similarDiagnosis: 'ภาวะขาดสารน้ำ (00027)',
        howToDistinguish: 'มุ่งเฉพาะความปลอดภัยของระดับ K⁺ และคลื่นไฟฟ้าหัวใจขณะได้อินซูลิน',
      },
    ],
    dataGuidelines: ['บันทึกค่า K⁺ ล่าสุด ปริมาณปัสสาวะ (ต้องมีปัสสาวะออกก่อนเติม KCl) และคลื่นไฟฟ้าหัวใจ'],
    goalSummary: 'ระดับ K⁺ อยู่ในช่วงปลอดภัยและไม่เกิดภาวะหัวใจเต้นผิดจังหวะ',
    nocOutcomes: [
      {
        code: '0606',
        labelEn: 'Electrolyte Balance',
        labelTh: 'ความสมดุลของอิเล็กโทรไลต์',
        edition: 'NOC 6th Edition',
        indicators: ['K⁺ อยู่ในช่วง 3.5–5.0 mEq/L', 'EKG ปกติ'],
      },
    ],
    actionGuidelines: [
      'ตรวจสอบผล K⁺ และยืนยันว่าผู้ป่วยมีปัสสาวะออกก่อนบริหารสารน้ำที่มี KCl ตามแผน',
      'เฝ้าระวัง EKG monitor และอาการกล้ามเนื้ออ่อนแรง',
    ],
    nicInterventions: [
      {
        code: '2020',
        labelEn: 'Electrolyte Monitoring',
        labelTh: 'การเฝ้าระวังอิเล็กโทรไลต์',
        edition: 'NIC 7th Edition',
        guidelineNote: 'ปฏิบัติตามเกณฑ์ความปลอดภัยการให้ KCl ทางหลอดเลือดดำ',
      },
    ],
    responseGuidelines: ['บันทึกผล K⁺ รอบถัดไปและจังหวะการเต้นหัวใจตามเวลาจริง [__ : __ น.]'],
    commonPitfalls: ['เริ่ม Insulin drip ทั้งที่ยังไม่ได้ดูค่า K⁺ หรือผู้ป่วยมีภาวะ K⁺ < 3.3 mEq/L'],
    educationalExample: {
      contextNote: 'ตัวอย่างกรณีศึกษาสมมติเพื่อการเรียนรู้',
      focusLabel: 'Risk for Electrolyte Imbalance',
      dataText: 'เวลา 12.00 น. ผล K⁺ 3.6 mEq/L กำลังได้รับ RI drip 4 unit/hr ปัสสาวะออก 60 mL/hr EKG เป็น Normal sinus rhythm',
      actionText: 'เวลา 12.10 น. ดูแลให้สารน้ำผสม KCl 20 mEq/L ตามแผนการรักษาและติดตาม EKG monitor ต่อเนื่อง',
      responseText: 'เวลา 16.00 น. ผล K⁺ ติดตามอยู่ที่ 3.9 mEq/L EKG ปกติ ไม่มีอาการกล้ามเนื้ออ่อนแรง',
    },
    compareSummary: {
      definition: 'เสี่ยงต่อ Hypokalemia เฉียบพลันขณะรักษาด้วย Insulin ในภาวะ DKA',
      supporting: 'ปัจจัยเสี่ยง: การเคลื่อนตัวของ K⁺ จาก Insulin, ปัสสาวะมาก',
      distinction: 'ต้องเช็ก K⁺ และปัสสาวะออกก่อนบริหาร KCl เสมอ',
      dataFocus: 'ค่า K⁺, ปริมาณปัสสาวะ, EKG',
      responseFocus: 'ผล K⁺ ติดตามและคลื่นไฟฟ้าหัวใจ',
    },
    icnpNote: {
      statusLabel: 'ฟังก์ชันระยะถัดไป',
      termExample: 'ICNP Term: Risk for Electrolyte Imbalance',
      disclaimer: 'ยังไม่เปิดใช้งานเทียบเคียงอัตโนมัติ',
    },
    provenanceStatus: 'แนวทางที่หน่วยงานทบทวน',
    reviewStatus: 'verified',
    reviewedDate: '20 ก.ย. 2568',
    nextReviewDate: '20 ก.ย. 2569',
    references: [
      {
        title: 'NANDA International Nursing Diagnoses: Definitions and Classification',
        source: 'Herdman, T. H. et al.',
        edition: '12th Edition (2021–2023)',
        year: '2021',
      },
    ],
  },
  {
    id: 'dka-ineffective-health-management',
    diseaseIds: ['dka-diabetes'],
    expertOrder: 4,
    nandaCode: '00078',
    nandaEdition: 'NANDA-I 2021–2023 (ฉบับภาษาไทยเพื่อการทดสอบ)',
    titleTh: 'การจัดการสุขภาพตนเองไม่มีประสิทธิภาพ',
    titleEn: 'Ineffective Health Management',
    shortDescription:
      'รูปแบบการดูแลโรคเบาหวานและการใช้อินซูลินในชีวิตประจำวันที่ยังไม่สอดคล้องกับเป้าหมายการรักษา จนนำไปสู่ภาวะ DKA ซ้ำ',
    problemType: 'actual',
    assessmentFilterIds: ['self-management'],
    supportingCues: [
      'ผู้ป่วยให้ข้อมูลว่าหยุดฉีดอินซูลินเองเมื่อเจ็บป่วยหรือรับประทานอาหารไม่ได้',
      'ไม่ทราบสัญญาณเตือนภาวะน้ำตาลสูง/คีโตน หรือวิธีปฏิบัติในวันป่วย (Sick-day rules)',
    ],
    riskFactors: [],
    checkSummary: 'ประเมินสาเหตุที่เกิด DKA (ลืมยา, หยุดยาวันป่วย, เทคนิคฉีดยา) เมื่อผู้ป่วยพ้นระยะวิกฤต',
    differentialPoints: [
      {
        similarDiagnosis: 'ความเสี่ยงต่อระดับน้ำตาลในเลือดไม่คงที่ (00179)',
        howToDistinguish: 'ใช้เมื่ออาการเฉียบพลันคงที่และพร้อมประเมินพฤติกรรม/ทักษะการดูแลตนเองก่อนจำหน่าย',
      },
    ],
    dataGuidelines: ['บันทึกคำบอกเล่าหรือทักษะที่สังเกตได้จริง (เช่น สาเหตุการหยุดยา ความเข้าใจเรื่อง Sick-day rules)'],
    goalSummary: 'ผู้ป่วยหรือผู้ดูแลอธิบายการฉีดอินซูลินและการปฏิบัติตัวในวันเจ็บป่วยได้อย่างถูกต้อง',
    nocOutcomes: [
      {
        code: '1619',
        labelEn: 'Self-Management: Diabetes',
        labelTh: 'การจัดการตนเอง: โรคเบาหวาน',
        edition: 'NOC 6th Edition',
        indicators: ['อธิบายหลัก Sick-day rules ได้', 'สาธิตการฉีดอินซูลินถูกต้อง'],
      },
    ],
    actionGuidelines: [
      'ทบทวนสาเหตุการเกิด DKA ร่วมกับผู้ป่วยโดยไม่ตำหนิ',
      'สอนและให้ผู้ป่วยสาธิตย้อนกลับ (Teach-back) การฉีดอินซูลินและการดูแลตนเองเมื่อเจ็บป่วย',
    ],
    nicInterventions: [
      {
        code: '5602',
        labelEn: 'Teaching: Disease Process',
        labelTh: 'การสอนเรื่องโรคและการปฏิบัติตัว',
        edition: 'NIC 7th Edition',
        guidelineNote: 'บันทึกหัวข้อที่สอนและผลจากการประเมิน Teach-back จริง',
      },
    ],
    responseGuidelines: ['บันทึกสิ่งที่ผู้ป่วยสามารถอธิบายหรือสาธิตย้อนกลับได้ถูกต้องด้วยตนเอง [__ : __ น.]'],
    commonPitfalls: ['เขียนว่า “ให้ความรู้แล้ว ผู้ป่วยเข้าใจดี” โดยไม่ระบุว่าผู้ป่วยตอบหรือสาธิตอะไรได้บ้าง'],
    educationalExample: {
      contextNote: 'ตัวอย่างกรณีศึกษาสมมติเพื่อการเรียนรู้',
      focusLabel: 'Ineffective Health Management',
      dataText: 'เวลา 10.00 น. (ระยะฟื้นตัว) ผู้ป่วยเล่าว่าก่อนมา รพ. มีไข้ กินข้าวน้อยจึงหยุดฉีดอินซูลินเอง 2 วันเพราะกลัวน้ำตาลต่ำ',
      actionText: 'เวลา 10.15 น. สอนเรื่อง Sick-day rules ให้ผู้ป่วยและญาติ โดยเน้นห้ามหยุดอินซูลินเองเมื่อป่วย ให้ตรวจ DTX บ่อยขึ้น และมาพบแพทย์เมื่ออาเจียน/กินไม่ได้',
      responseText: 'เวลา 10.35 น. ผู้ป่วยสามารถทวนคำแนะนำได้ถูกต้องว่าเมื่อป่วยห้ามหยุดยาเองและต้องตรวจ DTX บ่อยขึ้น พร้อมระบุอาการที่ต้องมาโรงพยาบาลได้',
    },
    compareSummary: {
      definition: 'พฤติกรรมหรือความเข้าใจในการจัดการโรคเบาหวานยังไม่สอดคล้องกับแผนการดูแล',
      supporting: 'หยุดอินซูลินเองเมื่อป่วย, ไม่ทราบ Sick-day rules, ฉีดยาไม่ถูกวิธี',
      distinction: 'ใช้ในระยะฟื้นตัว/เตรียมจำหน่ายเพื่อป้องกันการกลับเป็นซ้ำ',
      dataFocus: 'สาเหตุเฉพาะราย + ความเข้าใจพื้นฐานของผู้ป่วย/ผู้ดูแล',
      responseFocus: 'ผล Teach-back หรือการสาธิตย้อนกลับที่ผู้ป่วยทำได้จริง',
    },
    icnpNote: {
      statusLabel: 'ฟังก์ชันระยะถัดไป',
      termExample: 'ICNP Term: Impaired Health Management',
      disclaimer: 'ยังไม่เปิดใช้งานเทียบเคียงอัตโนมัติ',
    },
    provenanceStatus: 'แนวทางที่หน่วยงานทบทวน',
    reviewStatus: 'verified',
    reviewedDate: '20 ก.ย. 2568',
    nextReviewDate: '20 ก.ย. 2569',
    references: [
      {
        title: 'NANDA International Nursing Diagnoses: Definitions and Classification',
        source: 'Herdman, T. H. et al.',
        edition: '12th Edition (2021–2023)',
        year: '2021',
      },
    ],
  },

  // ================= STROKE =================
  {
    id: 'stroke-risk-cerebral-perfusion',
    diseaseIds: ['ischemic-stroke'],
    expertOrder: 1,
    nandaCode: '00201',
    nandaEdition: 'NANDA-I 2021–2023 (ฉบับภาษาไทยเพื่อการทดสอบ)',
    titleTh: 'ความเสี่ยงต่อการกำซาบเนื้อเยื่อสมองไม่มีประสิทธิภาพ',
    titleEn: 'Risk for Ineffective Cerebral Tissue Perfusion',
    shortDescription:
      'ความเสี่ยงต่อการขาดเลือดไปเลี้ยงเนื้อสมองเพิ่มขึ้นหรือเกิดสมองบวม/ความดันในกะโหลกศีรษะสูงในระยะเฉียบพลันของโรคหลอดเลือดสมอง',
    problemType: 'risk',
    assessmentFilterIds: ['neuro-risk'],
    supportingCues: [],
    riskFactors: [
      'ภาวะหลอดเลือดสมองตีบหรืออุดตันเฉียบพลันภายใน 24–72 ชั่วโมงแรก',
      'ความดันโลหิตสูงเกินเกณฑ์เป้าหมายหรือตกต่ำเกินไปจนกระทบการกำซาบสมอง',
    ],
    checkSummary: 'ติดตาม GCS, ขนาด/ปฏิกิริยาม่านตา, Motor power, และ BP ตามเกณฑ์เป้าหมาย Stroke',
    differentialPoints: [
      {
        similarDiagnosis: 'ความบกพร่องในการเคลื่อนไหวร่างกาย (00085)',
        howToDistinguish:
          'Risk for Ineffective Cerebral Tissue Perfusion เน้นการเฝ้าระวังความเปลี่ยนแปลงทางระบบประสาทเฉียบพลัน (Neurological worsening) และควบคุมความดันโลหิต',
      },
    ],
    dataGuidelines: [
      'บันทึกค่า GCS (E_V_M_), ขนาดและปฏิกิริยาต่อแสงของม่านตา (Pupils), กำลังแขนขาทั้ง 4 รยางค์ และ BP จริง',
    ],
    goalSummary: 'ระดับความรู้สึกตัวและอาการทางระบบประสาทคงที่ไม่ทรุดลง ความดันโลหิตอยู่ในช่วงเป้าหมาย',
    nocOutcomes: [
      {
        code: '0406',
        labelEn: 'Tissue Perfusion: Cerebral',
        labelTh: 'การกำซาบเนื้อเยื่อสมอง',
        edition: 'NOC 6th Edition',
        indicators: ['GCS คงที่เท่าค่าตั้งต้น', 'BP อยู่ในเกณฑ์เป้าหมายของแพทย์'],
      },
    ],
    actionGuidelines: [
      'ประเมิน Neuro signs (GCS, Pupils, Motor power) และสัญญาณชีพตามรอบเวลาที่กำหนด',
      'จัดท่านอนศีรษะสูง 30 องศา ศีรษะอยู่ในแนวตรงไม่พับงอคอเพื่อช่วยการไหลกลับของเลือดดำ',
      'หลีกเลี่ยงการเบ่งถ่ายหรือกิจกรรมที่เพิ่มความดันในกะโหลกศีรษะ และรายงานแพทย์ทันทีหาก GCS ลดลง ≥ 2 คะแนน',
    ],
    nicInterventions: [
      {
        code: '2550',
        labelEn: 'Cerebral Perfusion Promotion',
        labelTh: 'การส่งเสริมการกำซาบเลือดไปเลี้ยงสมอง',
        edition: 'NIC 7th Edition',
        guidelineNote: 'บันทึกค่า Neuro signs จริงเปรียบเทียบค่าตั้งต้นเสมอ',
      },
    ],
    responseGuidelines: [
      'บันทึกผลประเมิน GCS, Pupils, Motor power และ BP ซ้ำตามรอบเวลาจริง [__ : __ น.]',
    ],
    commonPitfalls: ['บันทึกเพียง “Neuro signs stable” โดยไม่ระบุค่า E_V_M_ และ Motor power จริง'],
    educationalExample: {
      contextNote: 'ตัวอย่างกรณีศึกษาสมมติเพื่อการเรียนรู้',
      focusLabel: 'Risk for Ineffective Cerebral Tissue Perfusion',
      dataText: 'เวลา 08.00 น. ผู้ป่วย Acute Ischemic Stroke ภายใน 24 ชม. แรก GCS E4V5M6 ม่านตา 3 mm RTL ทั้งสองข้าง แขนขาขวา Grade 3/5 ซ้าย 5/5 BP 158/90 mmHg',
      actionText: 'เวลา 08.05 น. จัดท่านอนศีรษะสูง 30 องศา ศีรษะแนวตรง ประเมิน Neuro signs และ BP ทุก 2 ชั่วโมง ดูแลให้ยาตามแผนการรักษา',
      responseText: 'เวลา 10.00 น. GCS คงที่ E4V5M6 ม่านตา 3 mm RTL แขนขาขวา Grade 3/5 BP 150/86 mmHg ไม่พบอาการทางระบบประสาททรุดลง',
    },
    compareSummary: {
      definition: 'เสี่ยงต่อการกำซาบเลือดสมองลดลงหรือสมองบวมในระยะเฉียบพลัน',
      supporting: 'ปัจจัยเสี่ยง: Ischemic stroke เฉียบพลัน, BP แกว่ง',
      distinction: 'เน้น Neuro signs (GCS/Pupils/Motor) และ BP เป้าหมาย',
      dataFocus: 'GCS, Pupils, Motor power, BP',
      responseFocus: 'ค่า Neuro signs และ BP เปรียบเทียบค่าตั้งต้น',
    },
    icnpNote: {
      statusLabel: 'ฟังก์ชันระยะถัดไป',
      termExample: 'ICNP Term: Risk for Impaired Cerebral Tissue Perfusion',
      disclaimer: 'ยังไม่เปิดใช้งานเทียบเคียงอัตโนมัติ',
    },
    provenanceStatus: 'แนวทางที่หน่วยงานทบทวน',
    reviewStatus: 'verified',
    reviewedDate: '05 ต.ค. 2568',
    nextReviewDate: '05 ต.ค. 2569',
    references: [
      {
        title: 'NANDA International Nursing Diagnoses: Definitions and Classification',
        source: 'Herdman, T. H. et al.',
        edition: '12th Edition (2021–2023)',
        year: '2021',
      },
    ],
  },
  {
    id: 'stroke-impaired-swallowing',
    diseaseIds: ['ischemic-stroke'],
    expertOrder: 2,
    nandaCode: '00103',
    nandaEdition: 'NANDA-I 2021–2023 (ฉบับภาษาไทยเพื่อการทดสอบ)',
    titleTh: 'การกลืนบกพร่อง',
    titleEn: 'Impaired Swallowing',
    shortDescription:
      'ความผิดปกติของกลไกการส่งผ่านอาหารหรือน้ำจากช่องปากสู่กระเพาะอาหาร ซึ่งเสี่ยงต่อการสำลักเข้าปอด',
    problemType: 'actual',
    assessmentFilterIds: ['dysphagia'],
    supportingCues: [
      'ไม่ผ่านแบบคัดกรองการกลืน (Swallowing screening) หรือเสียงเปลี่ยน/เสียงเครือหลังกลืนน้ำ',
      'ไอหรือสำลักขณะกลืนน้ำลายหรืออาหาร มีน้ำลายไหลมุมปาก',
    ],
    riskFactors: [],
    checkSummary: 'ตรวจสอบผลการคัดกรองการกลืน (Swallowing screening) อาการไอ/เสียงเปลี่ยนหลังกลืน',
    differentialPoints: [
      {
        similarDiagnosis: 'การขับเสมหะไม่มีประสิทธิภาพ (00031)',
        howToDistinguish: 'เน้นการป้องกันการสำลักอาหาร/น้ำลาย และการจัดการอาหารทางสายยางหรือปรับความหนืดอาหาร',
      },
    ],
    dataGuidelines: ['บันทึกผลการคัดกรองการกลืน อาการไอ/สำลัก เสียงเปลี่ยน และแผนการให้อาหารปัจจุบัน (เช่น NPO / NG tube)'],
    goalSummary: 'ได้รับสารอาหารและน้ำอย่างปลอดภัยโดยไม่เกิดการสำลักหรือปอดอักเสบจากการสำลัก',
    nocOutcomes: [
      {
        code: '1010',
        labelEn: 'Swallowing Status',
        labelTh: 'ภาวะการกลืน',
        edition: 'NOC 6th Edition',
        indicators: ['ไม่ไอหรือสำลัก', 'ปอดไม่มีเสียงผิดปกติจากการสำลัก'],
      },
    ],
    actionGuidelines: [
      'งดน้ำและอาหารทางปาก (NPO) จนกว่าจะผ่านการประเมินการกลืนตามแนวทางของหน่วยงาน',
      'ดูแลความสะอาดช่องปากสม่ำเสมอ และหากรับอาหารทางสายยางให้ยกหัวเตียงสูง 30–45 องศาเสมอ',
    ],
    nicInterventions: [
      {
        code: '1860',
        labelEn: 'Swallowing Therapy / Aspiration Precautions',
        labelTh: 'การป้องกันการสำลักและดูแลการกลืน',
        edition: 'NIC 7th Edition',
        guidelineNote: 'บันทึกการงดน้ำอาหารหรือการจัดท่าก่อนให้สารอาหารจริง',
      },
    ],
    responseGuidelines: [
      'บันทึกผลหลังดูแลทำความสะอาดช่องปากหรือให้อาหารทางสายยาง (ไม่สำลัก, SpO₂ คงที่) [__ : __ น.]',
    ],
    commonPitfalls: ['ให้ผู้ป่วยจิบน้ำหรือรับประทานยาเม็ดก่อนได้รับการคัดกรองการกลืน'],
    educationalExample: {
      contextNote: 'ตัวอย่างกรณีศึกษาสมมติเพื่อการเรียนรู้',
      focusLabel: 'Impaired Swallowing',
      dataText: 'เวลา 09.00 น. ผู้ป่วยพูดไม่ชัด น้ำลายไหลมุมปากขวา ทดสอบกลืนน้ำตามแบบคัดกรองพบไอทันทีและเสียงเปลี่ยนเป็นเสียงเครือ',
      actionText: 'เวลา 09.05 น. ให้งดน้ำและอาหารทางปาก (NPO) แจ้งผู้ป่วยและญาติทราบสาเหตุ จัดท่าศีรษะสูง 30 องศา และรายงานแพทย์เพื่อวางแผนให้อาหารทางสายยาง',
      responseText: 'เวลา 11.00 น. ผู้ป่วยและญาติเข้าใจและปฏิบัติตามแผน NPO ถูกต้อง ไม่มีอาการไอสำลัก SpO₂ 98% (Room air)',
    },
    compareSummary: {
      definition: 'กลไกการกลืนอาหารหรือน้ำลายบกพร่อง เสี่ยงสำลักเข้าสู่ทางเดินหายใจ',
      supporting: 'ไม่ผ่าน Swallowing screen, ไอ/สำลักขณะกลืน, เสียงเครือ, น้ำลายไหล',
      distinction: 'เน้นความปลอดภัยของการรับน้ำ/อาหาร/ยาทางปาก',
      dataFocus: 'ผลคัดกรองการกลืน, อาการไอ/เสียงเปลี่ยน, สถานะ NPO/NG',
      responseFocus: 'ความปลอดภัยไม่สำลักและค่า SpO₂ หลังดูแล',
    },
    icnpNote: {
      statusLabel: 'ฟังก์ชันระยะถัดไป',
      termExample: 'ICNP Term: Impaired Swallowing',
      disclaimer: 'ยังไม่เปิดใช้งานเทียบเคียงอัตโนมัติ',
    },
    provenanceStatus: 'แนวทางที่หน่วยงานทบทวน',
    reviewStatus: 'verified',
    reviewedDate: '05 ต.ค. 2568',
    nextReviewDate: '05 ต.ค. 2569',
    references: [
      {
        title: 'NANDA International Nursing Diagnoses: Definitions and Classification',
        source: 'Herdman, T. H. et al.',
        edition: '12th Edition (2021–2023)',
        year: '2021',
      },
    ],
  },
  {
    id: 'stroke-impaired-physical-mobility',
    diseaseIds: ['ischemic-stroke'],
    expertOrder: 3,
    nandaCode: '00085',
    nandaEdition: 'NANDA-I 2021–2023 (ฉบับภาษาไทยเพื่อการทดสอบ)',
    titleTh: 'ความบกพร่องในการเคลื่อนไหวร่างกาย',
    titleEn: 'Impaired Physical Mobility',
    shortDescription:
      'ข้อจำกัดในการเคลื่อนไหวร่างกายหรือแขนขาด้วยตนเองอย่างอิสระจากภาวะอ่อนแรงครึ่งซีก (Hemiparesis)',
    problemType: 'actual',
    assessmentFilterIds: ['mobility'],
    supportingCues: [
      'กำลังกล้ามเนื้อแขนและขาซีกใดซีกหนึ่งลดลง (เช่น Motor power Grade 0–3/5)',
      'ไม่สามารถพลิกตะแคงตัวหรือลุกนั่งบนเตียงได้เอง',
    ],
    riskFactors: [],
    checkSummary: 'ตรวจ Motor power รายข้าง ความสามารถในการพลิกตัว และสภาพผิวหนังบริเวณปุ่มกระดูก',
    differentialPoints: [
      {
        similarDiagnosis: 'ความเสี่ยงต่อการพลัดตกหกล้ม (00155)',
        howToDistinguish: 'Impaired Mobility มุ่งเน้นการฟื้นฟูการเคลื่อนไหวและป้องกันแผลกดทับ/ข้อยึดติด ส่วน Risk for Falls มุ่งเน้นความปลอดภัยขณะเปลี่ยนท่าหรือย้ายเตียง',
      },
    ],
    dataGuidelines: ['บันทึกคะแนน Motor power แยกแขน/ขา ซ้าย/ขวา และระดับความต้องการการช่วยเหลือ'],
    goalSummary: 'ไม่เกิดข้อติดแข็งหรือแผลกดทับ และผู้ป่วยมีส่วนร่วมในการทำกายภาพบำบัดเบื้องต้นตามความเหมาะสม',
    nocOutcomes: [
      {
        code: '0208',
        labelEn: 'Mobility',
        labelTh: 'ความสามารถในการเคลื่อนไหว',
        edition: 'NOC 6th Edition',
        indicators: ['ขยับข้อต่อได้ตามพิสัยข้อ', 'ผิวหนังบริเวณปุ่มกระดูกไม่มีรอยแดง'],
      },
    ],
    actionGuidelines: [
      'ช่วยพลิกตะแคงตัวทุก 2 ชั่วโมงและจัดแนวร่างกาย (Body alignment) ด้วยหมอนรองรับแขนขาข้างที่อ่อนแรง',
      'ทำ Passive / Active-assisted Range of Motion (ROM) เมื่อสัญญาณชีพคงที่ตามแผนการรักษา',
    ],
    nicInterventions: [
      {
        code: '0224',
        labelEn: 'Exercise Therapy: Joint Mobility',
        labelTh: 'การฟื้นฟูพิสัยการเคลื่อนไหวข้อ',
        edition: 'NIC 7th Edition',
        guidelineNote: 'บันทึกข้างที่ทำกายภาพและสภาพผิวหนังที่ตรวจพบจริง',
      },
    ],
    responseGuidelines: ['บันทึกสภาพผิวหนังปุ่มกระดูก พิสัยข้อ และความทนต่อการเคลื่อนไหว [__ : __ น.]'],
    commonPitfalls: ['ดึงรั้งแขนข้างที่อ่อนแรงขณะช่วยพลิกตัวจนเสี่ยงข้อไหล่เคลื่อน'],
    educationalExample: {
      contextNote: 'ตัวอย่างกรณีศึกษาสมมติเพื่อการเรียนรู้',
      focusLabel: 'Impaired Physical Mobility',
      dataText: 'เวลา 13.00 น. แขนและขาขวาอ่อนแรง Motor power Grade 2/5 พลิกตะแคงตัวด้วยตนเองไม่ได้ ผิวหนังก้นกบปกติไม่มีรอยแดง',
      actionText: 'เวลา 13.05 น. ช่วยพลิกตะแคงตัวตะแคงซ้าย ใช้หมอนรองรับแขนขวาในท่าสบาย และทำ Passive ROM ข้อไหล่-ข้อศอก-ข้อเข่าขวาอย่างนุ่มนวล',
      responseText: 'เวลา 13.20 น. ข้อต่อข้างขวาเคลื่อนไหวได้ตามพิสัยข้อไม่ยึดติด ผู้ป่วยไม่ปวดข้อไหล่ ผิวหนังปุ่มกระดูกปกติ',
    },
    compareSummary: {
      definition: 'ข้อจำกัดการเคลื่อนไหวร่างกายหรือรยางค์จากการอ่อนแรงของกล้ามเนื้อ',
      supporting: 'Motor power ลดลง, พลิกตัวไม่ได้, ต้องพึ่งพาในการเคลื่อนไหว',
      distinction: 'มุ่งป้องกันข้อยึดติด แผลกดทับ และส่งเสริมการฟื้นฟูกล้ามเนื้อ',
      dataFocus: 'Motor power แยกรยางค์ + สภาพผิวหนังปุ่มกระดูก',
      responseFocus: 'พิสัยข้อและสภาพผิวหนังหลังพลิกตัว/ทำ ROM',
    },
    icnpNote: {
      statusLabel: 'ฟังก์ชันระยะถัดไป',
      termExample: 'ICNP Term: Impaired Mobility',
      disclaimer: 'ยังไม่เปิดใช้งานเทียบเคียงอัตโนมัติ',
    },
    provenanceStatus: 'แนวทางที่หน่วยงานทบทวน',
    reviewStatus: 'verified',
    reviewedDate: '05 ต.ค. 2568',
    nextReviewDate: '05 ต.ค. 2569',
    references: [
      {
        title: 'NANDA International Nursing Diagnoses: Definitions and Classification',
        source: 'Herdman, T. H. et al.',
        edition: '12th Edition (2021–2023)',
        year: '2021',
      },
    ],
  },
  {
    id: 'stroke-risk-for-falls',
    diseaseIds: ['ischemic-stroke'],
    expertOrder: 4,
    nandaCode: '00155',
    nandaEdition: 'NANDA-I 2021–2023 (ฉบับภาษาไทยเพื่อการทดสอบ)',
    titleTh: 'ความเสี่ยงต่อการพลัดตกหกล้ม',
    titleEn: 'Risk for Falls',
    shortDescription:
      'ความเสี่ยงต่อการได้รับบาดเจ็บจากการตกเตียงหรือล้มขณะเคลื่อนย้าย เนื่องจากแขนขาอ่อนแรง การทรงตัวบกพร่อง หรือความรู้สึกตัวเปลี่ยนแปลง',
    problemType: 'risk',
    assessmentFilterIds: ['fall-risk', 'mobility'],
    supportingCues: [],
    riskFactors: [
      'แขนขาอ่อนแรงครึ่งซีกหรือการรับรู้ด้านใดด้านหนึ่งลดลง',
      'คะแนนประเมินความเสี่ยงพลัดตกหกล้ม (เช่น Morse Fall Scale) อยู่ในระดับสูง',
      'ผู้ป่วยพยายามลุกจากเตียงโดยไม่ขอความช่วยเหลือ',
    ],
    checkSummary: 'ตรวจสอบคะแนนประเมินความเสี่ยงล้ม สิ่งแวดล้อมรอบเตียง ราวกั้นเตียง และปุ่มเรียกพยาบาล',
    differentialPoints: [
      {
        similarDiagnosis: 'ความบกพร่องในการเคลื่อนไหวร่างกาย (00085)',
        howToDistinguish: 'เป็นข้อวินิจฉัยความเสี่ยงด้านความปลอดภัย (Fall prevention) และสิ่งแวดล้อมรอบเตียง',
      },
    ],
    dataGuidelines: ['บันทึกคะแนนความเสี่ยงล้ม ปัจจัยเสี่ยงเฉพาะราย และพฤติกรรมความพยายามลุกเดิน'],
    goalSummary: 'ไม่เกิดเหตุการณ์ตกเตียงหรือพลัดตกหกล้มตลอดระยะเวลาที่รับการดูแล',
    nocOutcomes: [
      {
        code: '1912',
        labelEn: 'Falls Occurrence',
        labelTh: 'การป้องกันการพลัดตกหกล้ม',
        edition: 'NOC 6th Edition',
        indicators: ['ไม่มีอุบัติการณ์ตกเตียง/หกล้ม', 'สิ่งแวดล้อมรอบเตียงปลอดภัย'],
      },
    ],
    actionGuidelines: [
      'ปรับระดับเตียงให้อยู่ในระดับต่ำสุด ล็อกล้อเตียง ยกไม้กั้นเตียงตามมาตรการป้องกันล้ม',
      'วางปุ่มเรียกพยาบาลในระยะที่มือข้างที่แข็งแรงเอื้อมถึง และแนะนำให้เรียกพยาบาลทุกครั้งก่อนลุก',
    ],
    nicInterventions: [
      {
        code: '6490',
        labelEn: 'Fall Prevention',
        labelTh: 'การป้องกันการพลัดตกหกล้ม',
        edition: 'NIC 7th Edition',
        guidelineNote: 'บันทึกมาตรการป้องกันที่จัดให้จริงและคำแนะนำแก่ผู้ป่วย/ญาติ',
      },
    ],
    responseGuidelines: ['บันทึกความร่วมมือในการขอความช่วยเหลือและความปลอดภัยในเวร [__ : __ น.]'],
    commonPitfalls: ['ยกไม้กั้นเตียงครบ 4 ด้านโดยไม่วางออดเรียกหรือสื่อสารในผู้ป่วยที่สับสน (อาจทำให้ปีนข้ามไม้กั้น)'],
    educationalExample: {
      contextNote: 'ตัวอย่างกรณีศึกษาสมมติเพื่อการเรียนรู้',
      focusLabel: 'Risk for Falls',
      dataText: 'เวลา 20.00 น. Morse Fall Scale 55 คะแนน (เสี่ยงสูง) แขนขาขวาอ่อนแรง Grade 3/5 พยายามเอื้อมหยิบน้ำข้างเตียงเอง',
      actionText: 'เวลา 20.05 น. ปรับเตียงระดับต่ำสุด ล็อกล้อ ยกไม้กั้นเตียงส่วนบน วางแก้วน้ำและปุ่มเรียกพยาบาลด้านซ้ายมือข้างที่แข็งแรง พร้อมแนะนำให้กดเรียกก่อนลุก',
      responseText: 'เวลา 23.00 น. ผู้ป่วยกดออดเรียกพยาบาลเมื่อต้องการเข้าห้องน้ำตลอดเวร ไม่พบอุบัติการณ์พลัดตกหกล้ม',
    },
    compareSummary: {
      definition: 'เสี่ยงต่อการตกเตียงหรือล้มจากภาวะอ่อนแรงและการทรงตัวบกพร่อง',
      supporting: 'ปัจจัยเสี่ยง: อ่อนแรง, Morse score สูง, พยายามลุกเอง',
      distinction: 'เน้นมาตรการสิ่งแวดล้อมและความปลอดภัยขณะเคลื่อนย้าย',
      dataFocus: 'คะแนนเสี่ยงล้ม + พฤติกรรมเสี่ยงเฉพาะราย',
      responseFocus: 'ความร่วมมือและอุบัติการณ์ความปลอดภัยในเวร',
    },
    icnpNote: {
      statusLabel: 'ฟังก์ชันระยะถัดไป',
      termExample: 'ICNP Term: Risk for Fall',
      disclaimer: 'ยังไม่เปิดใช้งานเทียบเคียงอัตโนมัติ',
    },
    provenanceStatus: 'แนวทางที่หน่วยงานทบทวน',
    reviewStatus: 'verified',
    reviewedDate: '05 ต.ค. 2568',
    nextReviewDate: '05 ต.ค. 2569',
    references: [
      {
        title: 'NANDA International Nursing Diagnoses: Definitions and Classification',
        source: 'Herdman, T. H. et al.',
        edition: '12th Edition (2021–2023)',
        year: '2021',
      },
    ],
  },

  // ================= PROCEDURES =================
  {
    id: 'proc-catheter-risk-cauti',
    diseaseIds: ['proc-urinary-catheter'],
    expertOrder: 1,
    nandaCode: '00004',
    nandaEdition: 'NANDA-I 2021–2023 (ฉบับภาษาไทยเพื่อการทดสอบ)',
    titleTh: 'ความเสี่ยงต่อการติดเชื้อทางเดินปัสสาวะสัมพันธ์กับสายสวน (CAUTI)',
    titleEn: 'Risk for Infection (Catheter-Associated UTI)',
    shortDescription:
      'ผู้ป่วยที่คาสายสวนปัสสาวะมีความเสี่ยงต่อเชื้อแบคทีเรียเข้าสู่ทางเดินปัสสาวะผ่านระบบระบายปัสสาวะหรือบริเวณรอบท่อปัสสาวะ',
    problemType: 'risk',
    assessmentFilterIds: ['cauti-risk'],
    supportingCues: [],
    riskFactors: [
      'คาสายสวนปัสสาวะ (Foley catheter) ต่อเนื่องเป็นระยะเวลาหลายวัน',
      'ระบบปิดถูกเปิดหรือถุงปัสสาวะวางสูงกว่าระดับกระเพาะปัสสาวะ',
    ],
    checkSummary: 'ตรวจจำนวนวันที่คาสาย, ความสมบูรณ์ของระบบปิด, สี/ตะกอนปัสสาวะ และข้อบ่งชี้คงสาย',
    differentialPoints: [
      {
        similarDiagnosis: 'การขับถ่ายปัสสาวะบกพร่อง (00016)',
        howToDistinguish: 'Risk for Infection มุ่งเน้นการป้องกันการติดเชื้อ (CAUTI bundle) และประเมินถอดสายเมื่อหมดข้อบ่งชี้',
      },
    ],
    dataGuidelines: [
      'ระบุวันที่ใส่สายสวน (Day of catheter), ลักษณะปัสสาวะ (สี ความใส ตะกอน), สภาพรอบรูเปิดท่อปัสสาวะ และอุณหภูมิร่างกาย',
    ],
    goalSummary: 'ไม่เกิดการติดเชื้อทางเดินปัสสาวะสัมพันธ์กับสายสวน และถอดสายสวนออกได้เมื่อหมดข้อบ่งชี้',
    nocOutcomes: [
      {
        code: '0703',
        labelEn: 'Infection Severity',
        labelTh: 'การเฝ้าระวังการติดเชื้อ',
        edition: 'NOC 6th Edition',
        indicators: ['ปัสสาวะใสไม่มีตะกอนขุ่น', 'ไม่มีไข้หรือปวดท้องน้อย'],
      },
    ],
    actionGuidelines: [
      'ดูแลรักษาระบบปิด (Closed system) ตรึงสายสวนไม่ให้ดึงรั้ง และจัดถุงปัสสาวะต่ำกว่าระดับกระเพาะปัสสาวะโดยไม่วางสัมผัสพื้น',
      'ทำความสะอาดอวัยวะสืบพันธุ์ด้วยสบู่อ่อนและน้ำสะอาดทุกวันและหลังขับถ่ายอุจจาระ',
      'ทบทวนข้อบ่งชี้การคาสายสวนร่วมกับแพทย์ทุกวันเพื่อถอดสายทันทีเมื่อไม่จำเป็น',
    ],
    nicInterventions: [
      {
        code: '1876',
        labelEn: 'Tube Care: Urinary',
        labelTh: 'การดูแลสายสวนปัสสาวะ',
        edition: 'NIC 7th Edition',
        guidelineNote: 'บันทึกมาตรการ CAUTI bundle ที่ปฏิบัติจริง',
      },
    ],
    responseGuidelines: [
      'บันทึกลักษณะปัสสาวะ, อุณหภูมิร่างกาย, และผลการทบทวนข้อบ่งชี้คง/ถอดสาย [__ : __ น.]',
    ],
    commonPitfalls: ['ไม่บันทึกจำนวนวันที่คาสายสวน (Catheter day) และลืมประเมินข้อบ่งชี้ในการถอดสายรายวัน'],
    educationalExample: {
      contextNote: 'ตัวอย่างกรณีศึกษาสมมติเพื่อการเรียนรู้',
      focusLabel: 'Risk for Infection (CAUTI)',
      dataText: 'เวลา 08.00 น. คาสายสวนปัสสาวะ Day 3 ปัสสาวะสีเหลืองใส ไม่มีตะกอน รอบรูเปิดท่อปัสสาวะสะอาดไม่บวมแดง BT 36.8 °C',
      actionText: 'เวลา 08.30 น. ดูแลทำความสะอาดอวัยวะสืบพันธุ์ ตรวจสอบระบบปิดและจัดถุงปัสสาวะต่ำกว่ากระเพาะปัสสาวะ พร้อมปรึกษาแพทย์ประเมินข้อบ่งชี้คงสายสวนในวันนี้',
      responseText: 'เวลา 12.00 น. ปัสสาวะไหลสะดวก สีเหลืองใส ไม่มีไข้ แพทย์พิจารณาให้ถอดสายสวนได้หลังประเมินปริมาณปัสสาวะครบเวรเช้า',
    },
    compareSummary: {
      definition: 'เสี่ยงต่อการติดเชื้อทางเดินปัสสาวะจากการคาสายสวน',
      supporting: 'ปัจจัยเสี่ยง: ระยะเวลาคาสาย, การเปิดระบบปิด, ความสะอาด',
      distinction: 'เน้นมาตรการป้องกัน CAUTI และการถอดสายเมื่อหมดข้อบ่งชี้',
      dataFocus: 'Catheter day, สี/ตะกอนปัสสาวะ, BT',
      responseFocus: 'ลักษณะปัสสาวะและการตัดสินใจเรื่องถอด/คงสาย',
    },
    icnpNote: {
      statusLabel: 'ฟังก์ชันระยะถัดไป',
      termExample: 'ICNP Term: Risk for Infection',
      disclaimer: 'ยังไม่เปิดใช้งานเทียบเคียงอัตโนมัติ',
    },
    provenanceStatus: 'แนวทางที่หน่วยงานทบทวน',
    reviewStatus: 'verified',
    reviewedDate: '12 ก.ย. 2568',
    nextReviewDate: '12 ก.ย. 2569',
    references: [
      {
        title: 'แนวทางการป้องกันการติดเชื้อทางเดินปัสสาวะจากการใส่สายสวนปัสสาวะ (CAUTI)',
        source: 'คณะกรรมการป้องกันการติดเชื้อในโรงพยาบาล (เอกสารทดสอบ)',
        edition: 'ฉบับปรับปรุง 2568',
        year: '2568',
      },
    ],
  },
  {
    id: 'proc-catheter-impaired-urinary',
    diseaseIds: ['proc-urinary-catheter'],
    expertOrder: 2,
    nandaCode: '00016',
    nandaEdition: 'NANDA-I 2021–2023 (ฉบับภาษาไทยเพื่อการทดสอบ)',
    titleTh: 'การระบายปัสสาวะบกพร่อง / การขับถ่ายปัสสาวะผิดปกติ',
    titleEn: 'Impaired Urinary Elimination',
    shortDescription:
      'การไหลของปัสสาวะผ่านสายสวนติดขัดจากสายพับงอ ลิ่มเลือด/ตะกอนอุดตัน หรือปัสสาวะคั่งหลังถอดสายสวน',
    problemType: 'actual',
    assessmentFilterIds: ['urine-flow'],
    supportingCues: [
      'ปัสสาวะไหลเข้าถุงน้อยลงกะทันหัน (< 30 mL/hr) ร่วมกับปวดแน่นท้องน้อยหรือคลำได้กระเพาะปัสสาวะโป่งตึง',
      'สายสวนพับงอ มีตะกอนหรือลิ่มเลือดขวางในสาย',
    ],
    riskFactors: [],
    checkSummary: 'ตรวจความโล่งของสายระบายปัสสาวะ อาการปวดแน่นท้องน้อย และปริมาณปัสสาวะรายชั่วโมง',
    differentialPoints: [
      {
        similarDiagnosis: 'ความเสี่ยงต่อการติดเชื้อ (00004)',
        howToDistinguish: 'ข้อวินิจฉัยนี้ใช้เมื่อมีการไหลของปัสสาวะติดขัดหรือปัสสาวะคั่งเกิดขึ้นแล้ว',
      },
    ],
    dataGuidelines: ['บันทึกปริมาณปัสสาวะที่ออก สภาพสายระบาย การคลำกระเพาะปัสสาวะ และอาการปวดท้องน้อย'],
    goalSummary: 'ปัสสาวะระบายสะดวก ไม่มีอาการปวดแน่นกระเพาะปัสสาวะ',
    nocOutcomes: [
      {
        code: '0503',
        labelEn: 'Urinary Elimination',
        labelTh: 'การขับถ่ายปัสสาวะ',
        edition: 'NOC 6th Edition',
        indicators: ['ปัสสาวะไหลต่อเนื่อง ≥ 30 mL/hr', 'ไม่มีกระเพาะปัสสาวะโป่งตึง'],
      },
    ],
    actionGuidelines: [
      'ตรวจสอบสายระบายตลอดแนวไม่ให้พับงอหรือถูกทับ และจัดวางสายไม่ให้เป็นห่วงตกท้องช้าง (Dependent loop)',
      'หากสงสัยสายอุดตันหรือปัสสาวะออกน้อยจริงให้ประเมิน Bladder scan/รายงานแพทย์ตามแนวทาง',
    ],
    nicInterventions: [
      {
        code: '0590',
        labelEn: 'Urinary Elimination Management',
        labelTh: 'การจัดการการขับถ่ายปัสสาวะ',
        edition: 'NIC 7th Edition',
        guidelineNote: 'แยกให้ออกระหว่างสายอุดตันกับภาวะไตผลิตปัสสาวะน้อย',
      },
    ],
    responseGuidelines: ['บันทึกปริมาณปัสสาวะที่ระบายได้หลังแก้ไขสายและอาการปวดแน่นท้องน้อย [__ : __ น.]'],
    commonPitfalls: ['รีดสายหรือสวนล้างสายโดยพลการเมื่อยังไม่ได้ตรวจดูการพับงอหรือคำสั่งแพทย์'],
    educationalExample: {
      contextNote: 'ตัวอย่างกรณีศึกษาสมมติเพื่อการเรียนรู้',
      focusLabel: 'Impaired Urinary Elimination',
      dataText: 'เวลา 15.00 น. ผู้ป่วยบ่นปวดแน่นท้องน้อย ปัสสาวะไม่ออกใน 1 ชม. ที่ผ่านมา ตรวจพบสายระบายปัสสาวะถูกขาผู้ป่วยทับพับงอ',
      actionText: 'เวลา 15.05 น. จัดเรียงสายระบายปัสสาวะให้ตรงไม่พับงอ ตรึงสายกับต้นขาอย่างเหมาะสม และสังเกตการไหลของปัสสาวะ',
      responseText: 'เวลา 15.20 น. ปัสสาวะไหลลงถุงทันที 180 mL สีเหลืองใส อาการปวดแน่นท้องน้อยหายไป',
    },
    compareSummary: {
      definition: 'ปัสสาวะไหลระบายไม่สะดวกหรือคั่งค้างในกระเพาะปัสสาวะ',
      supporting: 'ปัสสาวะออกน้อยกะทันหัน, ปวดแน่นท้องน้อย, สายพับงอ',
      distinction: 'เน้นการแก้ไขการระบายออกทันที (Patency)',
      dataFocus: 'ปริมาณปัสสาวะ, การตรวจสาย, อาการปวดท้องน้อย',
      responseFocus: 'ปริมาณปัสสาวะที่ไหลออกและอาการปวดท้องน้อยหลังแก้ไข',
    },
    icnpNote: {
      statusLabel: 'ฟังก์ชันระยะถัดไป',
      termExample: 'ICNP Term: Impaired Urinary Elimination',
      disclaimer: 'ยังไม่เปิดใช้งานเทียบเคียงอัตโนมัติ',
    },
    provenanceStatus: 'แนวทางที่หน่วยงานทบทวน',
    reviewStatus: 'verified',
    reviewedDate: '12 ก.ย. 2568',
    nextReviewDate: '12 ก.ย. 2569',
    references: [
      {
        title: 'NANDA International Nursing Diagnoses: Definitions and Classification',
        source: 'Herdman, T. H. et al.',
        edition: '12th Edition (2021–2023)',
        year: '2021',
      },
    ],
  },
  {
    id: 'proc-et-weaning-response',
    diseaseIds: ['proc-et-intubation'],
    expertOrder: 1,
    nandaCode: '00034',
    nandaEdition: 'NANDA-I 2021–2023 (ฉบับภาษาไทยเพื่อการทดสอบ)',
    titleTh: 'การตอบสนองต่อการหย่าเครื่องช่วยหายใจผิดปกติ',
    titleEn: 'Dysfunctional Ventilatory Weaning Response',
    shortDescription:
      'ภาวะที่ผู้ป่วยไม่สามารถปรับตัวเข้ากับระดับการลดการช่วยเหลือจากเครื่องช่วยหายใจได้ ทำให้เกิดอาการหายใจล้มเหลวหรือเหนื่อยล้าขณะหย่าเครื่อง',
    problemType: 'actual',
    assessmentFilterIds: ['weaning-distress'],
    supportingCues: [
      'RR > 30–35 ครั้ง/นาที หรือหายใจตื้นเร็ว (Rapid shallow breathing) ขณะทดลองหายใจเอง (SBT)',
      'เหงื่อออกมาก ชีพจรเต้นเร็ว ความดันโลหิตสูงขึ้น หรือ SpO₂ ลดลง',
      'ผู้ป่วยแสดงสีหน้าตื่นตระหนกหรือใช้กล้ามเนื้อคอช่วยหายใจมากขึ้น',
    ],
    riskFactors: [],
    checkSummary: 'ติดตาม RR, Vt, SpO₂, PR, BP และความเหนื่อยล้าทุก 15–30 นาทีระหว่างหย่าเครื่อง',
    differentialPoints: [
      {
        similarDiagnosis: 'ความเสี่ยงต่อปอดอักเสบจากการใช้เครื่องช่วยหายใจ (00004)',
        howToDistinguish: 'ข้อวินิจฉัยนี้เกิดเฉพาะขณะลดโหมดหรือทำ Spontaneous Breathing Trial (SBT)',
      },
    ],
    dataGuidelines: ['บันทึกโหมดเครื่องช่วยหายใจ/T-piece, เวลาที่เริ่มหย่า, RR, SpO₂, PR, BP และอาการแสดงความเหนื่อยล้า'],
    goalSummary: 'ผู้ป่วยทนต่อการหย่าเครื่องช่วยหายใจได้หรือได้รับการปรับคืนโหมดช่วยเหลือทันเวลาเมื่อไม่ทน',
    nocOutcomes: [
      {
        code: '0412',
        labelEn: 'Mechanical Ventilation Weaning Response: Adult',
        labelTh: 'การตอบสนองต่อการหย่าเครื่องช่วยหายใจ',
        edition: 'NOC 6th Edition',
        indicators: ['RR และ PR อยู่ในเกณฑ์รับได้', 'ค่า SpO₂ คงที่'],
      },
    ],
    actionGuidelines: [
      'ดูดเสมหะให้ทางเดินหายใจโล่งและจัดท่านั่งศีรษะสูงก่อนเริ่มการหย่าเครื่อง',
      'อยู่ใกล้ชิดให้กำลังใจและเฝ้าระวังสัญญาณไม่ทนต่อการหย่าเครื่อง (Weaning failure criteria)',
      'รายงานแพทย์ทันทีเมื่อพบเกณฑ์ไม่ผ่านการหย่าเครื่องเพื่อปรับกลับสู่โหมดช่วยเหลือตามแผน',
    ],
    nicInterventions: [
      {
        code: '3310',
        labelEn: 'Mechanical Ventilatory Weaning',
        labelTh: 'การหย่าเครื่องช่วยหายใจ',
        edition: 'NIC 7th Edition',
        guidelineNote: 'ระบุเวลาเริ่ม-เวลาสิ้นสุด และเกณฑ์ที่สังเกตได้จริง',
      },
    ],
    responseGuidelines: [
      'บันทึกค่า RR, SpO₂, PR, BP และผลการตัดสินใจต่อเนื่องหลังหย่าเครื่อง [__ : __ น.]',
    ],
    commonPitfalls: ['ปล่อยให้ผู้ป่วยหอบเหนื่อยนานเกินไประหว่าง SBT โดยไม่บันทึกเวลาที่หยุดหรือรายงานแพทย์'],
    educationalExample: {
      contextNote: 'ตัวอย่างกรณีศึกษาสมมติเพื่อการเรียนรู้',
      focusLabel: 'Dysfunctional Ventilatory Weaning Response',
      dataText: 'เวลา 09.30 น. หลังทดลองหย่าเครื่องด้วย T-piece 20 นาที ผู้ป่วย RR เพิ่มเป็น 34 ครั้ง/นาที เหงื่อออกที่หน้าผาก PR 118 ครั้ง/นาที SpO₂ ลดเป็น 90%',
      actionText: 'เวลา 09.32 น. รายงานแพทย์และดูแลต่อเครื่องช่วยหายใจกลับสู่โหมดช่วยเหลือตามแผนการรักษา พร้อมดูดเสมหะและให้ผู้ป่วยพัก',
      responseText: 'เวลา 09.45 น. หลังต่อเครื่องช่วยหายใจ RR ลดเป็น 18 ครั้ง/นาที (ตามเครื่อง) SpO₂ 98% PR 88 ครั้ง/นาที เหงื่อหยุดออก ผู้ป่วยพักได้สงบ',
    },
    compareSummary: {
      definition: 'ร่างกายไม่ทนต่อการลดแรงช่วยของเครื่องช่วยหายใจระหว่างการหย่าเครื่อง',
      supporting: 'RR > 30, เหงื่อออก, PR/BP สูง, SpO₂ ลดลงขณะ SBT',
      distinction: 'ใช้เฉพาะบริบทการหย่าเครื่องช่วยหายใจ (Weaning)',
      dataFocus: 'โหมด/ระยะเวลาหย่าเครื่อง, RR, SpO₂, PR, BP',
      responseFocus: 'ผลปรับกลับโหมดหรือความคงที่หลังผ่านช่วงเวลาหย่าเครื่อง',
    },
    icnpNote: {
      statusLabel: 'ฟังก์ชันระยะถัดไป',
      termExample: 'ICNP Term: Impaired Spontaneous Breathing',
      disclaimer: 'ยังไม่เปิดใช้งานเทียบเคียงอัตโนมัติ',
    },
    provenanceStatus: 'แนวทางที่หน่วยงานทบทวน',
    reviewStatus: 'verified',
    reviewedDate: '28 ส.ค. 2568',
    nextReviewDate: '28 ส.ค. 2569',
    references: [
      {
        title: 'NANDA International Nursing Diagnoses: Definitions and Classification',
        source: 'Herdman, T. H. et al.',
        edition: '12th Edition (2021–2023)',
        year: '2021',
      },
    ],
  },
  {
    id: 'proc-et-risk-vap',
    diseaseIds: ['proc-et-intubation'],
    expertOrder: 2,
    nandaCode: '00004',
    nandaEdition: 'NANDA-I 2021–2023 (ฉบับภาษาไทยเพื่อการทดสอบ)',
    titleTh: 'ความเสี่ยงต่อปอดอักเสบจากการใช้เครื่องช่วยหายใจ (VAP)',
    titleEn: 'Risk for Infection (Ventilator-Associated Pneumonia)',
    shortDescription:
      'ผู้ป่วยที่ใส่ท่อช่วยหายใจมีความเสี่ยงสูงต่อการสำลักเชื้อจากช่องปากและทางเดินหายใจส่วนบนลงสู่ปอด',
    problemType: 'risk',
    assessmentFilterIds: ['vap-risk'],
    supportingCues: [],
    riskFactors: [
      'ใส่ท่อช่วยหายใจและใช้เครื่องช่วยหายใจ (> 48 ชั่วโมง)',
      'มีเสมหะคั่งค้างเหนือกระเปาะลมท่อช่วยหายใจ (Subglottic secretions)',
    ],
    checkSummary: 'ตรวจ Cuff pressure, ระดับหัวเตียง 30–45°, การดูแลช่องปาก และสี/กลิ่นเสมหะ',
    differentialPoints: [
      {
        similarDiagnosis: 'การตอบสนองต่อการหย่าเครื่องผิดปกติ (00034)',
        howToDistinguish: 'เป็นข้อวินิจฉัยความเสี่ยงด้านการป้องกันการติดเชื้อตาม VAP bundle',
      },
    ],
    dataGuidelines: ['บันทึก Day of ET-tube, ขีดความลึกท่อ, ค่า Cuff pressure, ระดับหัวเตียง และลักษณะเสมหะ'],
    goalSummary: 'ไม่เกิดปอดอักเสบจากการใช้เครื่องช่วยหายใจ (VAP) ตลอดระยะเวลาใส่ท่อ',
    nocOutcomes: [
      {
        code: '0703',
        labelEn: 'Infection Severity',
        labelTh: 'การเฝ้าระวังการติดเชื้อ',
        edition: 'NOC 6th Edition',
        indicators: ['ไม่มีไข้ใหม่หรือเสมหะเป็นหนอง', 'ปฏิบัติตาม VAP bundle ครบถ้วน'],
      },
    ],
    actionGuidelines: [
      'จัดหัวเตียงสูง 30–45 องศาตลอดเวลาหากไม่มีข้อห้าม',
      'ดูแลความสะอาดช่องปาก (Oral care) ด้วยน้ำยาฆ่าเชื้อตามมาตรฐานหน่วยงานและดูดเสมหะอย่างปลอดเชื้อ',
      'ตรวจสอบ Cuff pressure ให้อยู่ในช่วง 20–30 cmH₂O ตามรอบเวร',
    ],
    nicInterventions: [
      {
        code: '3180',
        labelEn: 'Artificial Airway Management',
        labelTh: 'การดูแลทางเดินหายใจเทียม',
        edition: 'NIC 7th Edition',
        guidelineNote: 'บันทึกมาตรการ VAP bundle ที่ปฏิบัติจริงในเวรนั้น ๆ',
      },
    ],
    responseGuidelines: ['บันทึกค่า Cuff pressure หลังปรับ, สภาพช่องปาก และลักษณะเสมหะ/BT [__ : __ น.]'],
    commonPitfalls: ['ปรับหัวเตียงราบลงหลังเช็ดตัวหรือพลิกตะแคงตัวแล้วลืมยกกลับ 30–45 องศา'],
    educationalExample: {
      contextNote: 'ตัวอย่างกรณีศึกษาสมมติเพื่อการเรียนรู้',
      focusLabel: 'Risk for Infection (VAP)',
      dataText: 'เวลา 08.00 น. คาท่อช่วยหายใจ Day 4 ขีดท่อ 22 cm มุมปาก Cuff pressure 24 cmH₂O เสมหะสีขาวขุ่นปริมาณปานกลาง BT 37.0 °C',
      actionText: 'เวลา 08.15 น. ยกหัวเตียงสูง 35 องศา ดูดเสมหะในท่อและช่องปากด้วยเทคนิคปลอดเชื้อ ทำ Oral care ตามมาตรฐาน VAP bundle',
      responseText: 'เวลา 08.35 น. ช่องปากสะอาด เสมหะในท่อลดลง Cuff pressure คงที่ 24 cmH₂O หัวเตียงสูง 35 องศา',
    },
    compareSummary: {
      definition: 'เสี่ยงต่อปอดอักเสบจากการใส่ท่อช่วยหายใจและเครื่องช่วยหายใจ',
      supporting: 'ปัจจัยเสี่ยง: ใส่ ET-tube, นอนราบ, เสมหะเหนือ Cuff',
      distinction: 'มุ่งเน้น VAP prevention bundle และความปลอดภัยของท่อช่วยหายใจ',
      dataFocus: 'Day of ET, Cuff pressure, ระดับหัวเตียง, เสมหะ/BT',
      responseFocus: 'ความครบถ้วนของ VAP bundle และลักษณะเสมหะ/BT',
    },
    icnpNote: {
      statusLabel: 'ฟังก์ชันระยะถัดไป',
      termExample: 'ICNP Term: Risk for Infection',
      disclaimer: 'ยังไม่เปิดใช้งานเทียบเคียงอัตโนมัติ',
    },
    provenanceStatus: 'แนวทางที่หน่วยงานทบทวน',
    reviewStatus: 'verified',
    reviewedDate: '28 ส.ค. 2568',
    nextReviewDate: '28 ส.ค. 2569',
    references: [
      {
        title: 'แนวทางป้องกันปอดอักเสบจากการใช้เครื่องช่วยหายใจ (VAP Bundle)',
        source: 'คณะกรรมการป้องกันการติดเชื้อในโรงพยาบาล (เอกสารทดสอบ)',
        edition: 'ฉบับปรับปรุง 2568',
        year: '2568',
      },
    ],
  },
  ...DOCUMENT_FOCUSES,
];
