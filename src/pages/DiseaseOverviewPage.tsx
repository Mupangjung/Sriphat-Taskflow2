import React, { useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  Columns2,
  Filter,
  Info,
  ShieldCheck,
} from 'lucide-react';
import { MOCK_DISEASES } from '../data/mockDiseases';
import { MOCK_FOCUSES } from '../data/mockFocuses';
import { useAppState } from '../context/AppStateContext';
import { ComparePanelModal } from '../components/ComparePanelModal';
import { ContentErrorState, ContentSkeleton } from '../components/StatusBanners';
import { FocusProblemType } from '../types/clinical';

export const DiseaseOverviewPage: React.FC = () => {
  const { diseaseId } = useParams<{ diseaseId: string }>();
  const navigate = useNavigate();
  const {
    isDiseaseFavorite,
    toggleDiseaseFavorite,
    isFocusFavorite,
    toggleFocusFavorite,
    qaSim,
    setQaSim,
  } = useAppState();

  const [selectedFilterIds, setSelectedFilterIds] = useState<string[]>([]);
  const [problemTypeFilter, setProblemTypeFilter] = useState<'all' | FocusProblemType>('all');
  const [selectedCompareIds, setSelectedCompareIds] = useState<string[]>([]);
  const [compareModalOpen, setCompareModalOpen] = useState(false);

  const compareOpenerRef = useRef<HTMLButtonElement>(null);

  const disease = useMemo(
    () => MOCK_DISEASES.find((d) => d.id === diseaseId) ?? null,
    [diseaseId]
  );

  // Ordered strictly by expert clinical sequence (expertOrder), never popularity
  const diseaseFocuses = useMemo(() => {
    if (!disease) return [];
    return MOCK_FOCUSES.filter((f) => f.diseaseIds.includes(disease.id)).sort(
      (a, b) => a.expertOrder - b.expertOrder
    );
  }, [disease]);

  const problemTypeCounts = useMemo(() => {
    const actual = diseaseFocuses.filter((f) => f.problemType === 'actual').length;
    const risk = diseaseFocuses.filter((f) => f.problemType === 'risk').length;
    return { all: diseaseFocuses.length, actual, risk };
  }, [diseaseFocuses]);

  const filteredFocuses = useMemo(() => {
    return diseaseFocuses.filter((focus) => {
      if (problemTypeFilter !== 'all' && focus.problemType !== problemTypeFilter) {
        return false;
      }
      if (selectedFilterIds.length === 0) return true;
      // Match focuses linked to ALL selected assessment cues (enables realistic filtering & empty-filter state testing)
      return selectedFilterIds.every((fid) => focus.assessmentFilterIds.includes(fid));
    });
  }, [diseaseFocuses, problemTypeFilter, selectedFilterIds]);

  const activeFilterCount = selectedFilterIds.length + (problemTypeFilter !== 'all' ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedFilterIds([]);
    setProblemTypeFilter('all');
  };

  const compareFocusA = useMemo(
    () => diseaseFocuses.find((f) => f.id === selectedCompareIds[0]) ?? null,
    [diseaseFocuses, selectedCompareIds]
  );
  const compareFocusB = useMemo(
    () => diseaseFocuses.find((f) => f.id === selectedCompareIds[1]) ?? null,
    [diseaseFocuses, selectedCompareIds]
  );

  const toggleFilter = (filterId: string) => {
    setSelectedFilterIds((prev) =>
      prev.includes(filterId) ? prev.filter((id) => id !== filterId) : [...prev, filterId]
    );
  };

  const toggleCompareSelection = (focusId: string) => {
    setSelectedCompareIds((prev) => {
      if (prev.includes(focusId)) {
        return prev.filter((id) => id !== focusId);
      }
      if (prev.length >= 2) {
        return [prev[1], focusId];
      }
      return [...prev, focusId];
    });
  };

  if (qaSim.simulateLoading) {
    return (
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <ContentSkeleton rows={4} />
      </main>
    );
  }

  if (qaSim.simulateContentError || !disease) {
    return (
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <ContentErrorState
          title={!disease ? 'ไม่พบข้อมูลโรคหรือหัตถการที่ระบุ' : undefined}
          message={
            !disease
              ? 'รหัสหน้านี้ไม่มีอยู่ในชุดข้อมูลทดสอบ หรืออาจยังไม่มีแนวทางที่ตรวจรับรอง'
              : undefined
          }
          onRetry={() => {
            setQaSim((prev) => ({ ...prev, simulateContentError: false }));
          }}
          onBackToSearch={() => {
            setQaSim((prev) => ({ ...prev, simulateContentError: false }));
            navigate('/');
          }}
        />
      </main>
    );
  }

  const diseaseFav = isDiseaseFavorite(disease.id);

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Breadcrumb */}
      <nav aria-label="เส้นทางหน้า" className="flex flex-wrap items-center gap-2 text-sm text-slate-600">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-[#4338CA] hover:underline underline-offset-4 font-medium"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>หน้าค้นหา</span>
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-slate-900 font-medium truncate">{disease.nameTh}</span>
      </nav>

      {/* Review-Due Banner (never hides dates) */}
      {disease.reviewStatus === 'review-due' && (
        <div
          role="status"
          className="bg-[#C2410C]/10 border border-[#C2410C]/30 rounded-xl p-4 flex items-start gap-3 text-sm text-[#9A3412]"
        >
          <AlertTriangle className="w-5 h-5 text-[#C2410C] shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-bold">เนื้อหาถึงรอบทบทวน</p>
            <p className="text-xs sm:text-sm mt-0.5">
              ทบทวนล่าสุด: {disease.reviewedDate} · กำหนดทบทวนรอบถัดไป: {disease.nextReviewDate} · โปรดตรวจสอบร่วมกับแนวทางปัจจุบันของหอผู้ป่วย
            </p>
          </div>
        </div>
      )}

      {/* Disease Context Header Card */}
      <section className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
              <span className="font-semibold text-[#4338CA]">
                {disease.entityType === 'disease' ? 'โรค' : 'หัตถการ'}
              </span>
              <span aria-hidden="true">·</span>
              <span className="font-mono tabular-nums text-slate-800">
                {disease.codeSystem}: {disease.icdCode}
              </span>
              <span aria-hidden="true">·</span>
              <span>{disease.codeEdition}</span>
              <span aria-hidden="true">·</span>
              <span className="font-medium text-slate-700">{disease.isSampleLabel}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight headline-balance">
              {disease.nameTh}
              {disease.abbreviations.length > 0 && (
                <span className="ml-2 font-mono text-xl font-semibold text-slate-600">
                  ({disease.abbreviations.join(' / ')})
                </span>
              )}
            </h1>
            <p className="text-sm sm:text-base text-slate-600">
              {disease.nameEn}
              {disease.aliases.length > 0 && (
                <span className="text-slate-500"> · ชื่อเรียกอื่น: {disease.aliases.join(', ')}</span>
              )}
            </p>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed pt-1">
              {disease.shortSummary}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={() => toggleDiseaseFavorite(disease.id)}
              aria-pressed={diseaseFav}
              className={`inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-lg border text-sm font-medium transition-colors cursor-pointer ${
                diseaseFav
                  ? 'border-[#7C3AED] bg-[#7C3AED]/10 text-[#4338CA]'
                  : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${diseaseFav ? 'fill-current' : ''}`} aria-hidden="true" />
              <span>{diseaseFav ? 'บันทึกในรายการโปรดแล้ว' : 'เพิ่มโรคนี้ในรายการโปรด'}</span>
            </button>
          </div>
        </div>

        {/* Review & Provenance Metadata */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
          <span>สถานะที่มา: {disease.provenanceStatus}</span>
          <span aria-hidden="true">·</span>
          <span>ทบทวนเนื้อหาล่าสุด: {disease.reviewedDate}</span>
          <span aria-hidden="true">·</span>
          <span>รอบทบทวนถัดไป: {disease.nextReviewDate}</span>
          <span aria-hidden="true">·</span>
          <span>ผู้รับผิดชอบ: {disease.reviewerUnit}</span>
        </div>
      </section>

      {/* Clinical Guardrail Notice */}
      <div
        role="note"
        className="bg-[#4338CA]/[0.06] border border-[#4338CA]/20 rounded-xl px-4 py-3.5 flex items-start gap-3 text-sm text-slate-800"
      >
        <ShieldCheck className="w-5 h-5 text-[#4338CA] shrink-0 mt-0.5" aria-hidden="true" />
        <p className="font-medium">
          เลือกใช้เฉพาะประเด็นที่มีข้อมูลสนับสนุนในผู้ป่วยรายนั้น — รายการข้อวินิจฉัยที่แสดงเป็นแนวทางประกอบการพิจารณา ไม่ได้หมายความว่าผู้ป่วยทุกรายที่เป็นโรคนี้ต้องมีครบทุกข้อ
        </p>
      </div>

      {/* Key Clinical Considerations Box */}
      <section
        aria-labelledby="key-considerations-heading"
        className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-3"
      >
        <h2 id="key-considerations-heading" className="text-base sm:text-lg font-bold text-[#4338CA]">
          ประเด็นสำคัญที่ควรพิจารณา
        </h2>
        <ul className="space-y-2.5 text-sm sm:text-base text-slate-700 list-disc pl-5">
          {disease.keyConsiderations.map((point, index) => (
            <li key={index} className="leading-relaxed">
              {point}
            </li>
          ))}
        </ul>
      </section>

      {/* Assessment Filter & Comparison Toolbar */}
      <section aria-labelledby="filter-section-heading" className="bg-white border border-slate-200 rounded-xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <Filter className="w-4 h-4 text-[#4338CA] shrink-0 mt-1" aria-hidden="true" />
            <div>
              <h2 id="filter-section-heading" className="text-base font-bold text-slate-900">
                กรองประเด็นตามข้อมูลที่ประเมินพบในผู้ป่วยรายนี้
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                ใช้ความสัมพันธ์จากเนื้อหาที่จัดเตรียมไว้เพื่อช่วยคัดกรอง (ระบบไม่เลือกข้อวินิจฉัยแทนผู้ใช้)
              </p>
            </div>
          </div>

          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="self-start sm:self-auto min-h-[40px] px-3.5 py-1.5 rounded-lg border border-slate-300 text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer whitespace-nowrap"
            >
              ล้างตัวกรองทั้งหมด ({activeFilterCount})
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
          {/* Problem Type Dropdown Filter */}
          <div className="lg:col-span-4 space-y-1.5">
            <label
              htmlFor="problem-type-filter"
              className="block text-xs font-bold text-slate-700"
            >
              ประเภทปัญหา
            </label>
            <select
              id="problem-type-filter"
              value={problemTypeFilter}
              onChange={(e) =>
                setProblemTypeFilter(e.target.value as 'all' | FocusProblemType)
              }
              className="w-full min-h-[44px] px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 focus:outline-none cursor-pointer"
            >
              <option value="all">
                ทุกประเภทปัญหา ({problemTypeCounts.all})
              </option>
              <option value="actual">
                ปัญหาที่เกิดขึ้นแล้ว ({problemTypeCounts.actual})
              </option>
              <option value="risk">
                ปัจจัยเสี่ยง / ความเสี่ยง ({problemTypeCounts.risk})
              </option>
            </select>
          </div>

          {/* Assessment Cue Filter Chips */}
          <div className="lg:col-span-8 space-y-1.5">
            <span className="block text-xs font-bold text-slate-700">
              ข้อมูลประเมินที่พบในผู้ป่วย
            </span>
            <div className="flex flex-wrap gap-2" role="group" aria-label="ตัวเลือกข้อมูลประเมิน">
              {disease.assessmentFilters.map((filter) => {
                const active = selectedFilterIds.includes(filter.id);
                return (
                  <button
                    key={filter.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => toggleFilter(filter.id)}
                    className={`inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-lg border text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                      active
                        ? 'border-[#4338CA] bg-[#4338CA] text-white'
                        : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {active && <Check className="w-4 h-4 shrink-0" aria-hidden="true" />}
                    <span>{filter.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Comparison Action Strip */}
        <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="text-xs sm:text-sm text-slate-600">
            ต้องการเทียบความแตกต่าง? เลือกติ๊ก 2 ปัญหาจากการ์ดด้านล่างเพื่อเปรียบเทียบจุดต่างและแนวทาง Assessment / Evaluation (A / E)
          </p>
          <div className="flex items-center gap-2 shrink-0">
            {selectedCompareIds.length > 0 && (
              <button
                type="button"
                onClick={() => setSelectedCompareIds([])}
                className="min-h-[44px] px-3 py-2 text-xs sm:text-sm text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                ล้างที่เลือก
              </button>
            )}
            <button
              ref={compareOpenerRef}
              type="button"
              disabled={selectedCompareIds.length !== 2}
              onClick={() => setCompareModalOpen(true)}
              className={`inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                selectedCompareIds.length === 2
                  ? 'bg-[#7C3AED] hover:bg-[#6D28D9] text-white cursor-pointer'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Columns2 className="w-4 h-4 shrink-0" aria-hidden="true" />
              <span className="tabular-nums">
                เปรียบเทียบปัญหา ({selectedCompareIds.length}/2)
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Focus Cards List (Expert Order) */}
      <section aria-labelledby="focus-list-heading" className="space-y-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="focus-list-heading" className="text-lg font-bold text-slate-900">
            ข้อวินิจฉัยทางการพยาบาลที่เกี่ยวข้อง (เรียงตามลำดับการทบทวนทางคลินิก)
          </h2>
          <span className="text-sm text-slate-600 tabular-nums">
            แสดง {filteredFocuses.length} จาก {diseaseFocuses.length} ประเด็น
          </span>
        </div>

        {/* Filter Empty State (keeps filters visible + clear all button) */}
        {filteredFocuses.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 text-center space-y-3">
            <Info className="w-6 h-6 text-[#4338CA] mx-auto" aria-hidden="true" />
            <div className="space-y-1 max-w-md mx-auto">
              <h3 className="text-base font-bold text-slate-900">
                ไม่พบประเด็นที่ตรงกับเงื่อนไขตัวกรองทั้งหมดร่วมกัน
              </h3>
              <p className="text-sm text-slate-600">
                ลองลดจำนวนข้อมูลประเมินที่เลือก หรือล้างตัวกรองเพื่อดูประเด็นสำคัญทั้งหมดของโรคนี้
              </p>
            </div>
            <button
              type="button"
              onClick={clearAllFilters}
              className="min-h-[44px] px-5 py-2.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-medium cursor-pointer"
            >
              ล้างตัวกรองทั้งหมด
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredFocuses.map((focus, idx) => {
              const isSelectedCompare = selectedCompareIds.includes(focus.id);
              const isFav = isFocusFavorite(focus.id);

              return (
                <article
                  key={focus.id}
                  className={`bg-white border rounded-xl p-5 sm:p-6 transition-colors ${
                    isSelectedCompare
                      ? 'border-[#7C3AED] ring-1 ring-[#7C3AED]/20'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                    <div className="space-y-2.5 flex-1 min-w-0">
                      {/* Quiet metadata line (zero pill clutter) */}
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-slate-600">
                        <span className="font-semibold text-slate-500 tabular-nums">
                          ลำดับที่ {idx + 1}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums font-medium text-slate-800">
                          NANDA-I {focus.nandaCode}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{focus.nandaEdition}</span>
                        <span aria-hidden="true">·</span>
                        <span
                          className={`font-semibold ${
                            focus.problemType === 'actual'
                              ? 'text-[#1D4ED8]'
                              : 'text-[#C2410C]'
                          }`}
                        >
                          {focus.problemType === 'actual'
                            ? 'ปัญหาที่เกิดขึ้นแล้ว (Actual)'
                            : 'ความเสี่ยง (Risk)'}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                        {focus.titleTh}
                        <span className="block sm:inline sm:ml-2 text-sm sm:text-base font-medium text-slate-600">
                          ({focus.titleEn})
                        </span>
                      </h3>

                      <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                        {focus.shortDescription}
                      </p>

                      <div className="bg-slate-50 border border-slate-200/80 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-slate-700">
                        <span className="font-semibold text-slate-900">ข้อมูลที่ควรตรวจสอบ: </span>
                        {focus.checkSummary}
                      </div>
                    </div>

                    {/* Card Action Controls */}
                    <div className="flex flex-row flex-wrap lg:flex-col items-stretch sm:items-center lg:items-end justify-between gap-2.5 shrink-0 pt-2 lg:pt-0 border-t lg:border-t-0 border-slate-100">
                      <Link
                        to={`/disease/${disease.id}/focus/${focus.id}`}
                        className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-medium transition-colors whitespace-nowrap"
                      >
                        <span>แนวทางปัญหา</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </Link>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => toggleCompareSelection(focus.id)}
                          aria-pressed={isSelectedCompare}
                          className={`inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3 py-2 rounded-lg border text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                            isSelectedCompare
                              ? 'border-[#4338CA] bg-[#4338CA]/10 text-[#4338CA]'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <Columns2 className="w-4 h-4" aria-hidden="true" />
                          <span>{isSelectedCompare ? 'เลือกเทียบแล้ว' : 'เทียบปัญหา'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => toggleFocusFavorite(focus.id, disease.id)}
                          aria-pressed={isFav}
                          aria-label={isFav ? `นำ ${focus.titleTh} ออกจากรายการโปรด` : `บันทึก ${focus.titleTh} ในรายการโปรด`}
                          className={`inline-flex items-center justify-center gap-1.5 min-h-[44px] px-3 py-2 rounded-lg border text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                            isFav
                              ? 'border-[#7C3AED] bg-[#7C3AED]/10 text-[#4338CA]'
                              : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <Bookmark className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} aria-hidden="true" />
                          <span>{isFav ? 'โปรดแล้ว' : 'โปรด'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Accessible Comparison Modal (restores focus to compareOpenerRef on close) */}
      <ComparePanelModal
        isOpen={compareModalOpen}
        onClose={() => setCompareModalOpen(false)}
        focusA={compareFocusA}
        focusB={compareFocusB}
        diseaseId={disease.id}
        diseaseName={disease.nameTh}
        openerRef={compareOpenerRef}
      />
    </main>
  );
};
