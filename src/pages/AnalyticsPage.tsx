import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, BarChart3, CheckCircle2, Info, SlidersHorizontal } from 'lucide-react';
import { CLINICAL_GOVERNANCE_CHECKLIST, MOCK_ANALYTICS } from '../data/mockAnalytics';
import { useAppState } from '../context/AppStateContext';

export const AnalyticsPage: React.FC = () => {
  const { qaSim, setQaSim } = useAppState();
  const maxDiseaseCount = Math.max(
    ...MOCK_ANALYTICS.topSearchedDiseases.map((d) => d.searchCount)
  );
  const maxFocusCount = Math.max(
    ...MOCK_ANALYTICS.topOpenedFocuses.map((f) => f.openCount)
  );

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
      <nav aria-label="เส้นทางหน้า" className="flex items-center gap-2 text-sm text-slate-600">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-[#4338CA] hover:underline underline-offset-4 font-medium"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>หน้าค้นหา</span>
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-slate-900 font-medium">สถิติการใช้งานต้นแบบ (ข้อมูลจำลอง)</span>
      </nav>

      {/* Mandatory Mock Data Disclosure Banner */}
      <section
        role="note"
        aria-label="คำชี้แจงข้อมูลจำลอง"
        className="bg-[#C2410C]/10 border border-[#C2410C]/30 rounded-xl p-5 space-y-2"
      >
        <div className="flex items-center gap-2 text-[#9A3412] font-bold text-base">
          <Info className="w-5 h-5 text-[#C2410C] shrink-0" aria-hidden="true" />
          <span>{MOCK_ANALYTICS.label}</span>
        </div>
        <p className="text-sm text-slate-800 leading-relaxed">{MOCK_ANALYTICS.disclaimer}</p>
        <p className="text-xs text-slate-600">{MOCK_ANALYTICS.periodLabel}</p>
      </section>

      <header className="space-y-1">
        <div className="flex items-center gap-2 text-[#4338CA] text-sm font-semibold">
          <BarChart3 className="w-4 h-4" aria-hidden="true" />
          <span>สำหรับหัวหน้าหอผู้ป่วย / ผู้รับผิดชอบคุณภาพ — ข้อมูลจำลอง</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          ภาพรวมหัวข้อที่ค้นหาและช่องว่างเนื้อหา (ข้อมูลจำลอง)
        </h1>
      </header>

      {/* Summary Metrics (Tabular Numerals) */}
      <section aria-label="ตัวเลขสรุปข้อมูลจำลอง" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-1">
          <p className="text-xs font-medium text-slate-500">ข้อมูลจำลอง · การค้นหาทั้งหมด</p>
          <p className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-slate-900">
            {MOCK_ANALYTICS.summaryMetrics.totalSearchesCount.toLocaleString('th-TH')}
          </p>
          <p className="text-xs text-slate-600">ครั้งในช่วงทดสอบต้นแบบ</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-1">
          <p className="text-xs font-medium text-slate-500">ข้อมูลจำลอง · เปิดหน้าเปรียบเทียบ</p>
          <p className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-[#4338CA]">
            {MOCK_ANALYTICS.summaryMetrics.compareOpensCount.toLocaleString('th-TH')}
          </p>
          <p className="text-xs text-slate-600">ครั้งที่เทียบ 2 ปัญหา</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-1">
          <p className="text-xs font-medium text-slate-500">ข้อมูลจำลอง · คัดลอกโครง FAIE เปล่า</p>
          <p className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-[#7C3AED]">
            {MOCK_ANALYTICS.summaryMetrics.darCopiesCount.toLocaleString('th-TH')}
          </p>
          <p className="text-xs text-slate-600">ครั้ง (ไม่ใช่ตัวชี้วัดคุณภาพบันทึก)</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-1">
          <p className="text-xs font-medium text-slate-500">ข้อมูลจำลอง · สัดส่วนคำค้นไม่พบ</p>
          <p className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-[#C2410C]">
            {MOCK_ANALYTICS.summaryMetrics.unmatchedRatePercent}%
          </p>
          <p className="text-xs text-slate-600">ใช้ระบุโรคที่ควรพัฒนาเนื้อหาเพิ่ม</p>
        </div>
      </section>

      {/* Two-Column Breakdown: Top Searched Diseases + Top Opened Focuses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-4">
          <div>
            <p className="text-xs font-semibold text-[#C2410C]">ข้อมูลจำลอง</p>
            <h2 className="text-lg font-bold text-slate-900">โรคที่ถูกค้นหาบ่อย</h2>
          </div>
          <div className="space-y-3.5">
            {MOCK_ANALYTICS.topSearchedDiseases.map((item) => {
              const widthPct = Math.round((item.searchCount / maxDiseaseCount) * 100);
              return (
                <div key={item.diseaseId} className="space-y-1.5">
                  <div className="flex items-baseline justify-between gap-2 text-sm">
                    <Link
                      to={`/disease/${item.diseaseId}`}
                      className="font-semibold text-slate-900 hover:text-[#4338CA] truncate"
                    >
                      {item.nameTh}{' '}
                      <span className="font-mono text-xs text-slate-500">
                        ({item.abbr} · {item.icdCode})
                      </span>
                    </Link>
                    <span className="font-mono tabular-nums text-xs font-semibold text-slate-700 shrink-0">
                      {item.searchCount} ครั้ง
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#4338CA] rounded-full"
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-4">
          <div>
            <p className="text-xs font-semibold text-[#C2410C]">ข้อมูลจำลอง</p>
            <h2 className="text-lg font-bold text-slate-900">Focus ที่ถูกเปิดดูบ่อย</h2>
          </div>
          <div className="space-y-3.5">
            {MOCK_ANALYTICS.topOpenedFocuses.map((item) => {
              const widthPct = Math.round((item.openCount / maxFocusCount) * 100);
              return (
                <div key={item.focusId} className="space-y-1.5">
                  <div className="flex items-baseline justify-between gap-2 text-sm">
                    <Link
                      to={`/disease/${item.diseaseId}/focus/${item.focusId}`}
                      className="font-semibold text-slate-900 hover:text-[#7C3AED] truncate"
                    >
                      {item.titleTh}{' '}
                      <span className="font-mono text-xs text-slate-500">
                        (NANDA-I {item.nandaCode})
                      </span>
                    </Link>
                    <span className="font-mono tabular-nums text-xs font-semibold text-slate-700 shrink-0">
                      {item.openCount} ครั้ง
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#7C3AED] rounded-full"
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* Unmatched Search Queries Table */}
      <section className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="p-5 sm:p-6 border-b border-slate-200">
          <p className="text-xs font-semibold text-[#C2410C]">ข้อมูลจำลอง</p>
          <h2 className="text-lg font-bold text-slate-900">
            คำค้นที่ไม่พบเนื้อหา (ใช้สำรวจช่องว่างเนื้อหาทางคลินิก)
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-600">
                <th className="py-3 px-5">คำค้นที่ไม่พบเนื้อหา</th>
                <th className="py-3 px-5 text-right">จำนวนครั้ง (จำลอง)</th>
                <th className="py-3 px-5">ข้อเสนอแนะสำหรับทีมเนื้อหา</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {MOCK_ANALYTICS.unmatchedQueries.map((row) => (
                <tr key={row.query} className="hover:bg-slate-50/70">
                  <td className="py-3.5 px-5 font-mono font-medium text-slate-900">{row.query}</td>
                  <td className="py-3.5 px-5 text-right font-mono tabular-nums text-slate-700">
                    {row.count}
                  </td>
                  <td className="py-3.5 px-5 text-slate-600">{row.suggestedAction}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Clinical Readiness & QA State Simulator */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <section className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#4338CA]" aria-hidden="true" />
            <h2 className="text-lg font-bold text-slate-900">
              ประเด็นที่ต้องยืนยันก่อนเปิดใช้งานจริงในวอร์ด
            </h2>
          </div>
          <ul className="divide-y divide-slate-100">
            {CLINICAL_GOVERNANCE_CHECKLIST.map((item) => (
              <li key={item.id} className="py-3 first:pt-0 last:pb-0 space-y-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="text-sm font-bold text-slate-900">{item.title}</p>
                  <span className="text-xs font-medium text-[#4338CA] shrink-0">{item.status}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600">{item.detail}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5 text-[#4338CA]" aria-hidden="true" />
            <h2 className="text-lg font-bold text-slate-900">
              เครื่องมือจำลองสถานะหน้าจอสำหรับทดสอบ (QA Preview)
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600">
            ใช้ตรวจสอบสถานะที่กำหนดใน PRD ข้อ 10 เช่น ไม่มีเครือข่าย, กำลังโหลด, เปิดเนื้อหาไม่ได้ และคัดลอกคลิปบอร์ดไม่สำเร็จ
          </p>
          <div className="space-y-3">
            {[
              {
                key: 'simulateOffline' as const,
                label: 'จำลองสถานะไม่มีเครือข่าย (Offline Banner)',
              },
              {
                key: 'simulateLoading' as const,
                label: 'จำลองสถานะกำลังโหลดโครงร่าง (Loading Skeleton ในหน้าค้นหา/โรค/Focus)',
              },
              {
                key: 'simulateContentError' as const,
                label: 'จำลองสถานะเปิดเนื้อหาไม่ได้ (Error State พร้อมปุ่มลองใหม่)',
              },
              {
                key: 'simulateClipboardFailure' as const,
                label: 'จำลองคัดลอกคลิปบอร์ดไม่สำเร็จ (แสดงกล่องคัดลอกด้วยตนเอง)',
              },
            ].map((toggle) => {
              const checked = qaSim[toggle.key];
              return (
                <label
                  key={toggle.key}
                  className="flex items-center justify-between gap-3 p-3 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer"
                >
                  <span className="text-sm text-slate-800">{toggle.label}</span>
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) =>
                      setQaSim((prev) => ({ ...prev, [toggle.key]: e.target.checked }))
                    }
                    className="w-5 h-5 accent-[#7C3AED] rounded cursor-pointer shrink-0"
                  />
                </label>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
};
