import { focusCodeLabel } from '../types/clinical';
import React, { useEffect, useState } from 'react';
import { api, track } from '../lib/api';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { FocusDiagnosis } from '../types/clinical';

interface ComparisonMatrixProps {
  focusA: FocusDiagnosis;
  focusB: FocusDiagnosis;
  diseaseId?: string;
  onNavigateDetail?: () => void;
}

export const ComparisonMatrix: React.FC<ComparisonMatrixProps> = ({
  focusA,
  focusB,
  diseaseId,
  onNavigateDetail,
}) => {
  const [pair, setPair] = useState<{ focusA: FocusDiagnosis; focusB: FocusDiagnosis } | null>(null);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController(); setPair(null); setError('');
    const context = diseaseId ?? focusA.diseaseIds[0];
    void api<{focusA: FocusDiagnosis; focusB: FocusDiagnosis}>('/comparisons?' + new URLSearchParams({ diseaseId: context, focusAId: focusA.id, focusBId: focusB.id }), { signal: controller.signal }).then(data => { if (!controller.signal.aborted) { setPair(data); track('comparison-open', { diseaseId: context, focusId: focusA.id, secondFocusId: focusB.id }); } }).catch(e => { if (!controller.signal.aborted) setError(e.message); });
    return () => controller.abort();
  }, [diseaseId, focusA.id, focusB.id, attempt]);
  if (error) return <div role="alert">{error} <button className="underline" onClick={() => setAttempt(a => a+1)}>ลองใหม่</button></div>;
  if (!pair) return <p role="status">กำลังโหลดข้อมูลเปรียบเทียบ…</p>;
  focusA = pair.focusA; focusB = pair.focusB;
  const rows: {
    key: keyof FocusDiagnosis['compareSummary'];
    label: string;
    accentClass?: string;
  }[] = [
    { key: 'definition', label: 'ความหมาย (Definition)' },
    { key: 'supporting', label: 'ข้อมูลสนับสนุน / ปัจจัยเสี่ยง' },
    { key: 'distinction', label: 'จุดแตกต่างสำคัญ' },
    {
      key: 'dataFocus',
      label: 'แนวทาง A (Assessment) — ข้อมูลประเมินที่ควรสะท้อนในบันทึก',
      accentClass: 'text-[#1D4ED8]',
    },
    {
      key: 'responseFocus',
      label: 'แนวทาง E (Evaluation) — ประเด็นประเมินผลที่สัมพันธ์กัน',
      accentClass: 'text-[#C2410C]',
    },
  ];

  const getDetailUrl = (focus: FocusDiagnosis) => {
    const targetDisease = diseaseId || focus.diseaseIds[0];
    return targetDisease ? `/disease/${targetDisease}/focus/${focus.id}` : `/focus/${focus.id}`;
  };

  return (
    <div className="space-y-6">
      {/* Header Pair Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: 'ปัญหาที่ 1', item: focusA },
          { label: 'ปัญหาที่ 2', item: focusB },
        ].map(({ label, item }) => (
          <div
            key={item.id}
            className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col justify-between gap-3"
          >
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                <span className="font-semibold text-[#4338CA]">{label}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">{focusCodeLabel(item)}</span>
                <span aria-hidden="true">·</span>
                <span className="font-medium">
                  {item.problemType === 'actual' ? 'ปัญหาที่เกิดขึ้นแล้ว' : 'ความเสี่ยง'}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900">{item.titleTh}</h3>
              <p className="text-xs text-slate-600">{item.titleEn}</p>
            </div>
            <div>
              <Link
                to={getDetailUrl(item)}
                onClick={onNavigateDetail}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-[#4338CA] hover:text-[#7C3AED] underline-offset-4 hover:underline"
              >
                <span>แนวทางปัญหา</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Rows: Side-by-side on desktop (md+), stacked consecutively under same heading on mobile */}
      <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl bg-white overflow-hidden">
        {rows.map((row) => (
          <section key={row.key} className="p-4 sm:p-5">
            <h4 className={`text-sm font-bold mb-3 ${row.accentClass ?? 'text-slate-900'}`}>
              {row.label}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
              <div className="bg-slate-50/70 md:bg-transparent rounded-lg p-3 md:p-0 border border-slate-100 md:border-0">
                <p className="md:hidden text-xs font-semibold text-[#4338CA] mb-1">
                  ปัญหาที่ 1: {focusA.titleTh}
                </p>
                <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed">
                  {focusA.compareSummary[row.key]}
                </p>
              </div>
              <div className="bg-slate-50/70 md:bg-transparent rounded-lg p-3 md:p-0 border border-slate-100 md:border-0 md:border-l md:border-slate-200 md:pl-6">
                <p className="md:hidden text-xs font-semibold text-[#4338CA] mb-1">
                  ปัญหาที่ 2: {focusB.titleTh}
                </p>
                <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed">
                  {focusB.compareSummary[row.key]}
                </p>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
