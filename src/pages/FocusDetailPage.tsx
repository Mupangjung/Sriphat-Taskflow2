import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowLeft,
  Bookmark,
  BookOpen,
  ChevronDown,
  ChevronUp,
  ChevronsDownUp,
  ChevronsUpDown,
  Copy,
  FileText,
  Layers,
} from 'lucide-react';
import { MOCK_DISEASES } from '../data/mockDiseases';
import { MOCK_FOCUSES } from '../data/mockFocuses';
import { useAppState } from '../context/AppStateContext';
import { ContentErrorState, ContentSkeleton } from '../components/StatusBanners';
import { CodeSystemsReferenceTable } from '../components/CodeSystemsReferenceTable';

type SectionKey =
  | 'supporting'
  | 'differential'
  | 'data'
  | 'goalsNoc'
  | 'action'
  | 'response'
  | 'pitfalls'
  | 'example';

const ALL_SECTION_KEYS: SectionKey[] = [
  'supporting',
  'differential',
  'data',
  'goalsNoc',
  'action',
  'response',
  'pitfalls',
  'example',
];

export const FocusDetailPage: React.FC = () => {
  const { diseaseId, focusId } = useParams<{ diseaseId?: string; focusId: string }>();
  const navigate = useNavigate();

  const {
    isFocusFavorite,
    toggleFocusFavorite,
    copyBlankDarTemplate,
    openManualCopyFallback,
    qaSim,
    setQaSim,
  } = useAppState();

  const focus = useMemo(
    () => MOCK_FOCUSES.find((f) => f.id === focusId) ?? null,
    [focusId]
  );

  const disease = useMemo(() => {
    if (diseaseId) {
      return MOCK_DISEASES.find((d) => d.id === diseaseId) ?? null;
    }
    if (focus && focus.diseaseIds.length > 0) {
      return MOCK_DISEASES.find((d) => d.id === focus.diseaseIds[0]) ?? null;
    }
    return null;
  }, [diseaseId, focus]);

  // Default open core DAR & supporting sections for rapid ward scanning; others collapsible
  const [openSections, setOpenSections] = useState<Record<SectionKey, boolean>>({
    supporting: true,
    differential: false,
    data: true,
    goalsNoc: false,
    action: true,
    response: true,
    pitfalls: false,
    example: false,
  });

  const [showNicDetails, setShowNicDetails] = useState(false);
  const [showNocDetails, setShowNocDetails] = useState(true);

  const allExpanded = ALL_SECTION_KEYS.every((k) => openSections[k]);

  const toggleSection = (key: SectionKey) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleToggleAll = () => {
    const nextState = !allExpanded;
    const updated = {} as Record<SectionKey, boolean>;
    ALL_SECTION_KEYS.forEach((k) => {
      updated[k] = nextState;
    });
    setOpenSections(updated);
    if (nextState) {
      setShowNicDetails(true);
      setShowNocDetails(true);
    }
  };

  if (qaSim.simulateLoading) {
    return (
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <ContentSkeleton rows={5} />
      </main>
    );
  }

  if (qaSim.simulateContentError || !focus) {
    return (
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <ContentErrorState
          title={!focus ? 'ไม่พบข้อวินิจฉัย Focus ที่ระบุ' : undefined}
          message={
            !focus
              ? 'อาจไม่มีแนวทางที่ตรวจรับรองสำหรับรหัสนี้ในระบบทดสอบ'
              : undefined
          }
          onRetry={() => setQaSim((prev) => ({ ...prev, simulateContentError: false }))}
          onBackToSearch={() => {
            setQaSim((prev) => ({ ...prev, simulateContentError: false }));
            navigate('/');
          }}
        />
      </main>
    );
  }

  const isFav = isFocusFavorite(focus.id);
  const targetDiseaseId = disease?.id ?? focus.diseaseIds[0] ?? '';

  const renderAccordionHeader = (
    key: SectionKey,
    title: string,
    subtitle?: string,
    badgeElement?: React.ReactNode
  ) => {
    const isOpen = openSections[key];
    return (
      <button
        type="button"
        id={`header-${key}`}
        aria-expanded={isOpen}
        aria-controls={`panel-${key}`}
        onClick={() => toggleSection(key)}
        className="w-full min-h-[56px] px-5 py-3.5 flex items-center justify-between gap-4 text-left hover:bg-slate-50/80 transition-colors cursor-pointer"
      >
        <div className="min-w-0 flex-1 space-y-0.5">
          <div className="flex flex-wrap items-center gap-2.5">
            {badgeElement}
            <h2 className="text-base sm:text-lg font-bold text-slate-900">{title}</h2>
          </div>
          {subtitle && <p className="text-xs sm:text-sm text-slate-600">{subtitle}</p>}
        </div>
        <span className="shrink-0 text-slate-500">
          {isOpen ? (
            <ChevronUp className="w-5 h-5" aria-hidden="true" />
          ) : (
            <ChevronDown className="w-5 h-5" aria-hidden="true" />
          )}
        </span>
      </button>
    );
  };

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Breadcrumb */}
      <nav aria-label="เส้นทางหน้า" className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-[#4338CA] hover:underline underline-offset-4 font-medium"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>หน้าค้นหา</span>
        </Link>
        {disease && (
          <>
            <span aria-hidden="true">/</span>
            <Link
              to={`/disease/${disease.id}`}
              className="text-[#4338CA] hover:underline underline-offset-4 font-medium truncate max-w-[220px]"
            >
              {disease.nameTh}
            </Link>
          </>
        )}
        <span aria-hidden="true">/</span>
        <span className="text-slate-900 font-medium truncate">{focus.titleTh}</span>
      </nav>

      {/* Review-Due Notice */}
      {focus.reviewStatus === 'review-due' && (
        <div
          role="status"
          className="bg-[#C2410C]/10 border border-[#C2410C]/30 rounded-xl p-4 flex items-start gap-3 text-sm text-[#9A3412]"
        >
          <AlertTriangle className="w-5 h-5 text-[#C2410C] shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-bold">เนื้อหานี้ถึงรอบทบทวน</p>
            <p className="text-xs sm:text-sm mt-0.5">
              ทบทวนล่าสุด: {focus.reviewedDate} · รอบทบทวนถัดไป: {focus.nextReviewDate}
            </p>
          </div>
        </div>
      )}

      {/* Disease Context + Focus Header Card */}
      <section className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-5">
        {/* Disease Context Strip */}
        {disease && (
          <div className="bg-slate-50 border border-slate-200/80 rounded-lg px-4 py-3 text-xs sm:text-sm text-slate-700 flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="font-semibold text-slate-900">บริบทโรค/หัตถการ: </span>
              <span>{disease.nameTh}</span>
              <span className="mx-1.5 text-slate-400">·</span>
              <span className="font-mono tabular-nums">
                {disease.codeSystem}: {disease.icdCode}
              </span>
              <span className="mx-1.5 text-slate-400">·</span>
              <span>{disease.codeEdition}</span>
            </div>
            <span className="font-medium text-[#4338CA]">{focus.provenanceStatus}</span>
          </div>
        )}

        {/* Focus Title & NANDA-I Standard Info */}
        <div className="space-y-2.5">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs sm:text-sm text-slate-600">
            <span className="font-mono font-semibold text-slate-900 tabular-nums">
              NANDA-I {focus.nandaCode}
            </span>
            <span aria-hidden="true">·</span>
            <span>{focus.nandaEdition}</span>
            <span aria-hidden="true">·</span>
            <span
              className={`font-semibold ${
                focus.problemType === 'actual' ? 'text-[#1D4ED8]' : 'text-[#C2410C]'
              }`}
            >
              {focus.problemType === 'actual'
                ? 'ปัญหาที่เกิดขึ้นแล้ว (Actual Diagnosis)'
                : 'ความเสี่ยง (Risk Diagnosis)'}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center justify-center px-2.5 h-7 rounded-md bg-[#7C3AED] text-white font-mono text-xs font-bold shrink-0">
              F = ปัญหา
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight headline-balance">
              {focus.titleTh}
            </h1>
          </div>
          <p className="text-base font-medium text-slate-600">{focus.titleEn}</p>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed pt-1">
            {focus.shortDescription}
          </p>
        </div>

        {/* Primary CTA Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => copyBlankDarTemplate(focus)}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm sm:text-base font-semibold transition-colors cursor-pointer whitespace-nowrap"
            >
              <Copy className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>คัดลอกโครง FAIE เปล่า</span>
            </button>

            <button
              type="button"
              onClick={() => openManualCopyFallback(focus)}
              className="inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors cursor-pointer whitespace-nowrap"
            >
              <FileText className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span>ดูโครงข้อความเปล่า</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            {targetDiseaseId && (
              <button
                type="button"
                onClick={() => toggleFocusFavorite(focus.id, targetDiseaseId)}
                aria-pressed={isFav}
                className={`inline-flex items-center justify-center gap-1.5 min-h-[44px] px-4 py-2 rounded-lg border text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  isFav
                    ? 'border-[#7C3AED] bg-[#7C3AED]/10 text-[#4338CA]'
                    : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} aria-hidden="true" />
                <span>{isFav ? 'บันทึกในรายการโปรดแล้ว' : 'เพิ่มในรายการโปรด'}</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Expand All / Collapse All Control Bar */}
      <div className="flex items-center justify-between gap-4">
        <p className="text-xs sm:text-sm text-slate-600">
          คลิกแต่ละหัวข้อเพื่อพับ–ขยายเนื้อหาตามลำดับการเขียน Focus Charting
        </p>
        <button
          type="button"
          onClick={handleToggleAll}
          className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-sm font-medium text-[#4338CA] transition-colors cursor-pointer whitespace-nowrap shrink-0"
        >
          {allExpanded ? (
            <>
              <ChevronsDownUp className="w-4 h-4" aria-hidden="true" />
              <span>พับทุกหัวข้อ</span>
            </>
          ) : (
            <>
              <ChevronsUpDown className="w-4 h-4" aria-hidden="true" />
              <span>เปิดทุกหัวข้อ</span>
            </>
          )}
        </button>
      </div>

      {/* Collapsible Clinical Sections */}
      <div className="space-y-3">
        {/* 1. Supporting Cues / Risk Factors */}
        <section className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          {renderAccordionHeader(
            'supporting',
            '1. ข้อมูลที่สนับสนุนการเลือกปัญหา',
            focus.problemType === 'actual'
              ? 'อาการและอาการแสดงที่ควรพบจริงในผู้ป่วย (Defining Characteristics)'
              : 'ปัจจัยเสี่ยงเฉพาะรายที่สนับสนุนการเฝ้าระวัง (Risk Factors)'
          )}
          {openSections.supporting && (
            <div
              id="panel-supporting"
              role="region"
              aria-labelledby="header-supporting"
              className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-3"
            >
              {focus.problemType === 'actual' && focus.supportingCues.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-[#1D4ED8] mb-2">
                    อาการและอาการแสดง (ปัญหาที่เกิดขึ้นแล้ว)
                  </h3>
                  <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base text-slate-700">
                    {focus.supportingCues.map((cue, i) => (
                      <li key={i} className="leading-relaxed">
                        {cue}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {focus.problemType === 'risk' && focus.riskFactors.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-[#C2410C] mb-2">
                    ปัจจัยเสี่ยง (สำหรับข้อวินิจฉัยความเสี่ยง — ยังไม่ถือว่าปัญหาเกิดขึ้นแล้ว)
                  </h3>
                  <ul className="list-disc pl-5 space-y-1.5 text-sm sm:text-base text-slate-700">
                    {focus.riskFactors.map((rf, i) => (
                      <li key={i} className="leading-relaxed">
                        {rf}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </section>

        {/* 2. Differential Reasoning */}
        <section className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          {renderAccordionHeader(
            'differential',
            '2. จุดแยกจากปัญหาที่คล้ายกัน',
            'ช่วยให้เลือก Focus ได้ตรงกับข้อมูลเด่นของผู้ป่วยรายนั้น'
          )}
          {openSections.differential && (
            <div
              id="panel-differential"
              role="region"
              aria-labelledby="header-differential"
              className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-3"
            >
              {focus.differentialPoints.map((diff, i) => (
                <div key={i} className="bg-slate-50 border border-slate-200/80 rounded-lg p-4 space-y-1">
                  <p className="text-sm font-bold text-[#4338CA]">
                    เทียบกับ: {diff.similarDiagnosis}
                  </p>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {diff.howToDistinguish}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 3. A — Assessment */}
        <section className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          {renderAccordionHeader(
            'data',
            'A — Assessment: ข้อมูลประเมินที่ควรตรวจสอบและบันทึก',
            'ข้อมูลอัตนัยและปรนัยที่ตรวจพบจริงในผู้ป่วย ณ เวลาที่ประเมิน',
            <span className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 rounded-md bg-[#2563EB] text-white font-mono text-xs font-bold">
              A
            </span>
          )}
          {openSections.data && (
            <div
              id="panel-data"
              role="region"
              aria-labelledby="header-data"
              className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-3"
            >
              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-slate-700">
                {focus.dataGuidelines.map((item, i) => (
                  <li key={i} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* 4. Goals & Optional NOC Outcomes */}
        <section className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          {renderAccordionHeader(
            'goalsNoc',
            'เป้าหมายการพยาบาล และตัวชี้วัดผลลัพธ์ (NOC)',
            'ข้อมูลสนับสนุนการตั้งเป้าหมายและการเขียน E — Evaluation (เปิดอ่านเพิ่มเติมได้)'
          )}
          {openSections.goalsNoc && (
            <div
              id="panel-goalsNoc"
              role="region"
              aria-labelledby="header-goalsNoc"
              className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-4"
            >
              <div className="bg-slate-50 border border-slate-200/80 rounded-lg p-4">
                <p className="text-xs font-semibold text-slate-500 mb-1">เป้าหมายที่คาดหวัง</p>
                <p className="text-sm sm:text-base text-slate-800 leading-relaxed">
                  {focus.goalSummary}
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-bold text-[#4338CA]">
                    ตัวชี้วัดตามมาตรฐาน NOC (ข้อมูลสนับสนุน — ไม่ใช้แทนผลประเมินจริง)
                  </p>
                  <button
                    type="button"
                    onClick={() => setShowNocDetails((p) => !p)}
                    className="text-xs font-medium text-[#4338CA] underline hover:no-underline cursor-pointer"
                  >
                    {showNocDetails ? 'ซ่อนรายละเอียด NOC' : 'อ่านเพิ่มเติม NOC'}
                  </button>
                </div>

                {showNocDetails && (
                  <div className="space-y-3">
                    {focus.nocOutcomes.map((noc) => (
                      <div key={noc.code} className="border border-slate-200 rounded-lg p-4 space-y-2">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                          <span className="font-mono font-bold text-slate-900">
                            NOC {noc.code}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span>{noc.edition}</span>
                        </div>
                        <p className="text-sm font-bold text-slate-900">
                          {noc.labelTh} ({noc.labelEn})
                        </p>
                        <ul className="list-disc pl-5 space-y-1 text-sm text-slate-700">
                          {noc.indicators.map((ind, idx) => (
                            <li key={idx}>{ind}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        {/* 5. I — Intervention + Optional NIC */}
        <section className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          {renderAccordionHeader(
            'action',
            'I — Intervention: แนวทางการพยาบาลที่สัมพันธ์กับปัญหา',
            'แนวทางประกอบการพิจารณา — เลือกบันทึกเฉพาะกิจกรรมที่ได้ปฏิบัติจริงกับผู้ป่วยเท่านั้น',
            <span className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 rounded-md bg-[#D9F99D] text-[#1A2E05] border border-[#BEF264] font-mono text-xs font-bold">
              I
            </span>
          )}
          {openSections.action && (
            <div
              id="panel-action"
              role="region"
              aria-labelledby="header-action"
              className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-4"
            >
              <div className="bg-[#D9F99D]/45 border border-[#BEF264] rounded-lg px-4 py-2.5 text-xs sm:text-sm font-medium text-[#1A2E05]">
                รายการด้านล่างเป็นแนวทางประกอบการตัดสินใจ ไม่ใช่คำยืนยันว่าได้ปฏิบัติแล้ว โปรดบันทึกเฉพาะกิจกรรมที่ดำเนินการจริงและเวลาที่ปฏิบัติจริง
              </div>

              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-slate-700">
                {focus.actionGuidelines.map((item, i) => (
                  <li key={i} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>

              {/* Expandable NIC Block */}
              <div className="pt-2 border-t border-slate-100 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm font-bold text-slate-800">
                    การเชื่อมโยงกิจกรรมพยาบาลมาตรฐาน NIC (เปิดอ่านเพิ่มเติมได้)
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowNicDetails((prev) => !prev)}
                    className="min-h-[36px] px-3 py-1 rounded-lg border border-slate-200 text-xs font-medium text-[#4338CA] hover:bg-slate-50 cursor-pointer"
                  >
                    {showNicDetails ? 'พับรายละเอียด NIC' : 'เปิดอ่าน NIC ที่เกี่ยวข้อง'}
                  </button>
                </div>

                {showNicDetails && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {focus.nicInterventions.map((nic) => (
                      <div key={nic.code} className="border border-slate-200 rounded-lg p-3.5 space-y-1 bg-slate-50/50">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                          <span className="font-mono font-bold text-slate-900">NIC {nic.code}</span>
                          <span aria-hidden="true">·</span>
                          <span>{nic.edition}</span>
                        </div>
                        <p className="text-sm font-bold text-slate-900">
                          {nic.labelTh} ({nic.labelEn})
                        </p>
                        <p className="text-xs text-slate-600 leading-relaxed">{nic.guidelineNote}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </section>

        {/* 6. E — Evaluation */}
        <section className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          {renderAccordionHeader(
            'response',
            'E — Evaluation: สิ่งที่ควรประเมินผลหลังให้การพยาบาล',
            'ระบุผลประเมินที่ตรวจวัดได้จริงพร้อมเวลาประเมิน ไม่เติมคำว่า “อาการดีขึ้น” โดยอัตโนมัติ',
            <span className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 rounded-md bg-[#C2410C] text-white font-mono text-xs font-bold">
              E
            </span>
          )}
          {openSections.response && (
            <div
              id="panel-response"
              role="region"
              aria-labelledby="header-response"
              className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-3"
            >
              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-slate-700">
                {focus.responseGuidelines.map((item, i) => (
                  <li key={i} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* 7. Common Charting Pitfalls */}
        <section className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          {renderAccordionHeader(
            'pitfalls',
            'จุดที่มักเขียนตกหล่นในการบันทึกบนหอผู้ป่วย',
            'ข้อสังเกตเพื่อช่วยให้ F (ปัญหา), A (Assessment), I (Intervention) และ E (Evaluation) สอดคล้องกันครบถ้วน'
          )}
          {openSections.pitfalls && (
            <div
              id="panel-pitfalls"
              role="region"
              aria-labelledby="header-pitfalls"
              className="px-5 pb-5 pt-2 border-t border-slate-100"
            >
              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base text-slate-700">
                {focus.commonPitfalls.map((pitfall, i) => (
                  <li key={i} className="leading-relaxed">
                    {pitfall}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        {/* 8. Educational Example */}
        <section className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          {renderAccordionHeader(
            'example',
            'ตัวอย่างเพื่อการเรียนรู้ (Educational Example)',
            focus.educationalExample.contextNote,
            <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-slate-100 border border-slate-300 text-xs font-semibold text-slate-800">
              ตัวอย่างเพื่อการเรียนรู้
            </span>
          )}
          {openSections.example && (
            <div
              id="panel-example"
              role="region"
              aria-labelledby="header-example"
              className="px-5 pb-5 pt-3 border-t border-slate-100 space-y-3"
            >
              <div className="bg-[#C2410C]/[0.06] border border-[#C2410C]/25 rounded-lg px-4 py-2.5 text-xs sm:text-sm font-medium text-[#9A3412]">
                ตัวอย่างเพื่อการเรียนรู้เท่านั้น — ตัวเลขและเหตุการณ์เป็นข้อมูลสมมติ ห้ามคัดลอกไปบันทึกเป็นข้อมูลของผู้ป่วยจริง
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3 text-sm sm:text-base">
                <p className="font-bold text-slate-900">
                  <span className="font-mono text-[#7C3AED] mr-1.5">F (ปัญหา):</span>
                  {focus.educationalExample.focusLabel}
                </p>
                <div className="space-y-1">
                  <span className="font-mono font-bold text-[#1D4ED8]">A (Assessment):</span>
                  <p className="text-slate-700 leading-relaxed">{focus.educationalExample.dataText}</p>
                </div>
                <div className="space-y-1">
                  <span className="font-mono font-bold text-[#1A2E05] bg-[#D9F99D] px-1.5 py-0.5 rounded">
                    I (Intervention):
                  </span>
                  <p className="text-slate-700 leading-relaxed">{focus.educationalExample.actionText}</p>
                </div>
                <div className="space-y-1">
                  <span className="font-mono font-bold text-[#C2410C]">E (Evaluation):</span>
                  <p className="text-slate-700 leading-relaxed">{focus.educationalExample.responseText}</p>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Always-Visible References, Standards Governance & ICNP Separation (PRD 6.3 & Additional Req 5) */}
      <section
        aria-labelledby="references-governance-heading"
        className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-5"
      >
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-[#4338CA]" aria-hidden="true" />
          <h2 id="references-governance-heading" className="text-lg font-bold text-slate-900">
            แหล่งอ้างอิง มาตรฐานสากล และข้อมูลการทบทวน
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="border border-slate-200 rounded-lg p-4 space-y-2">
            <p className="font-bold text-slate-900">แหล่งที่มาและรอบการทบทวน</p>
            <dl className="space-y-1 text-slate-700 text-xs sm:text-sm">
              <div className="flex justify-between gap-2">
                <dt className="text-slate-500">สถานะความสัมพันธ์:</dt>
                <dd className="font-medium text-right">{focus.provenanceStatus}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-slate-500">ฉบับ NANDA-I:</dt>
                <dd className="font-medium text-right">{focus.nandaEdition}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-slate-500">วันที่ทบทวนล่าสุด:</dt>
                <dd className="font-medium text-right">{focus.reviewedDate}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-slate-500">กำหนดทบทวนถัดไป:</dt>
                <dd className="font-medium text-right">{focus.nextReviewDate}</dd>
              </div>
            </dl>
          </div>

          <div className="border border-slate-200 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-slate-900">
              <Layers className="w-4 h-4 text-slate-600" aria-hidden="true" />
              <span>มาตรฐาน ICNP ({focus.icnpNote.statusLabel})</span>
            </div>
            <p className="text-xs sm:text-sm font-mono text-slate-700">
              {focus.icnpNote.termExample}
            </p>
            <p className="text-xs text-slate-600 leading-relaxed">{focus.icnpNote.disclaimer}</p>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-bold text-slate-900">เอกสารอ้างอิง</h3>
          <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
            {focus.references.map((ref, idx) => (
              <li key={idx} className="border-t border-slate-100 pt-2">
                <span className="font-semibold text-slate-900">{ref.title}</span>
                <span className="block text-slate-600">
                  {ref.source} · {ref.edition} ({ref.year})
                </span>
              </li>
            ))}
          </ul>
        </div>

        <CodeSystemsReferenceTable compact />
      </section>
    </main>
  );
};
