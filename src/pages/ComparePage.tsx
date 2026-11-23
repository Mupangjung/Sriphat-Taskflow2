import { useContent } from '../context/ContentContext';
import { focusCodeLabel } from '../types/clinical';
import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Columns2 } from 'lucide-react';
import { ComparisonMatrix } from '../components/ComparisonMatrix';

export const ComparePage: React.FC = () => {
  const { diseases, focuses, abbreviations } = useContent();
  const [selectedDiseaseId, setSelectedDiseaseId] = useState<string>(diseases[0]?.id ?? '');

  const availableFocuses = useMemo(
    () =>
      focuses.filter((f) => f.diseaseIds.includes(selectedDiseaseId)).sort(
        (a, b) => (diseases.find(d => d.id === selectedDiseaseId)?.focusIds.indexOf(a.id) ?? 0) - (diseases.find(d => d.id === selectedDiseaseId)?.focusIds.indexOf(b.id) ?? 0)
      ),
    [selectedDiseaseId]
  );

  const [focusAId, setFocusAId] = useState<string>(() => availableFocuses[0]?.id ?? '');
  const [focusBId, setFocusBId] = useState<string>(() => availableFocuses[1]?.id ?? '');

  const handleDiseaseChange = (newDiseaseId: string) => {
    setSelectedDiseaseId(newDiseaseId);
    const list = focuses.filter((f) => f.diseaseIds.includes(newDiseaseId)).sort(
      (a, b) => (diseases.find(d => d.id === newDiseaseId)?.focusIds.indexOf(a.id) ?? 0) - (diseases.find(d => d.id === newDiseaseId)?.focusIds.indexOf(b.id) ?? 0)
    );
    setFocusAId(list[0]?.id ?? '');
    setFocusBId(list[1]?.id ?? list[0]?.id ?? '');
  };

  const focusA = useMemo(
    () => availableFocuses.find((f) => f.id === focusAId) ?? availableFocuses[0] ?? null,
    [availableFocuses, focusAId]
  );
  const focusB = useMemo(
    () => availableFocuses.find((f) => f.id === focusBId) ?? availableFocuses[1] ?? availableFocuses[0] ?? null,
    [availableFocuses, focusBId]
  );

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      <nav aria-label="เส้นทางหน้า" className="flex items-center gap-2 text-sm text-slate-600">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-[#4338CA] hover:underline underline-offset-4 font-medium"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>หน้าค้นหา</span>
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-slate-900 font-medium">เปรียบเทียบปัญหา</span>
      </nav>

      <header className="space-y-1.5 max-w-3xl">
        <div className="flex items-center gap-2 text-[#4338CA] text-sm font-semibold">
          <Columns2 className="w-4 h-4" aria-hidden="true" />
          <span>เปรียบเทียบสองข้อวินิจฉัยภายในโรคเดียวกัน</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight headline-balance">
          เปรียบเทียบความแตกต่างของปัญหาทางการพยาบาล
        </h1>
        <p className="text-sm sm:text-base text-slate-600">
          ใช้เทียบความหมาย ข้อมูลสนับสนุน จุดแตกต่าง และแนวทางบันทึก Assessment (A) / Evaluation (E) เพื่อช่วยเลือกปัญหา (F) ที่ตรงกับผู้ป่วยรายนั้น
        </p>
      </header>

      {/* Selector Controls */}
      <section aria-label="เลือกโรคและข้อวินิจฉัยเพื่อเปรียบเทียบ" className="bg-white border border-slate-200 rounded-xl p-5 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="compare-disease-select" className="block text-xs font-bold text-slate-700">
            โรค / หัตถการ
          </label>
          <select
            id="compare-disease-select"
            value={selectedDiseaseId}
            onChange={(e) => handleDiseaseChange(e.target.value)}
            className="w-full min-h-[44px] px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:border-[#7C3AED] focus:outline-none"
          >
            {diseases.map((d) => (
              <option key={d.id} value={d.id}>
                {d.nameTh} ({d.abbreviations[0] ?? d.icdCode})
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="compare-focus-a" className="block text-xs font-bold text-[#4338CA]">
            ปัญหาที่ 1
          </label>
          <select
            id="compare-focus-a"
            value={focusA?.id ?? ''}
            onChange={(e) => setFocusAId(e.target.value)}
            className="w-full min-h-[44px] px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:border-[#7C3AED] focus:outline-none"
          >
            {availableFocuses.map((f) => (
              <option key={f.id} value={f.id}>
                {f.titleTh} ({focusCodeLabel(f)})
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5">
          <label htmlFor="compare-focus-b" className="block text-xs font-bold text-[#4338CA]">
            ปัญหาที่ 2
          </label>
          <select
            id="compare-focus-b"
            value={focusB?.id ?? ''}
            onChange={(e) => setFocusBId(e.target.value)}
            className="w-full min-h-[44px] px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 focus:border-[#7C3AED] focus:outline-none"
          >
            {availableFocuses.map((f) => (
              <option key={f.id} value={f.id}>
                {f.titleTh} ({focusCodeLabel(f)})
              </option>
            ))}
          </select>
        </div>
      </section>

      {focusA && focusB ? (
        focusA.id === focusB.id ? (
          <div className="bg-white border border-slate-200 rounded-xl p-6 text-center text-sm text-slate-600">
            กรุณาเลือกข้อวินิจฉัยที่แตกต่างกัน 2 ข้อเพื่อเปรียบเทียบความแตกต่าง
          </div>
        ) : (
          <ComparisonMatrix
            focusA={focusA}
            focusB={focusB}
            diseaseId={selectedDiseaseId}
          />
        )
      ) : null}
    </main>
  );
};
