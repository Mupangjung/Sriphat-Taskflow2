import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Bookmark, Search, Trash2 } from 'lucide-react';
import { MOCK_DISEASES } from '../data/mockDiseases';
import { MOCK_FOCUSES } from '../data/mockFocuses';
import { useAppState } from '../context/AppStateContext';

export const FavoritesPage: React.FC = () => {
  const { favorites, removeFavorite, clearAllFavorites } = useAppState();
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  const savedDiseases = useMemo(() => {
    return favorites
      .filter((f): f is Extract<typeof f, { type: 'disease' }> => f.type === 'disease')
      .map((fav) => ({
        fav,
        disease: MOCK_DISEASES.find((d) => d.id === fav.id),
      }))
      .filter((entry): entry is { fav: typeof entry.fav; disease: NonNullable<typeof entry.disease> } =>
        Boolean(entry.disease)
      );
  }, [favorites]);

  const savedFocuses = useMemo(() => {
    return favorites
      .filter((f): f is Extract<typeof f, { type: 'focus' }> => f.type === 'focus')
      .map((fav) => ({
        fav,
        focus: MOCK_FOCUSES.find((f) => f.id === fav.id),
        disease: MOCK_DISEASES.find((d) => d.id === fav.diseaseId),
      }))
      .filter(
        (
          entry
        ): entry is {
          fav: typeof entry.fav;
          focus: NonNullable<typeof entry.focus>;
          disease: typeof entry.disease;
        } => Boolean(entry.focus)
      );
  }, [favorites]);

  const totalCount = savedDiseases.length + savedFocuses.length;

  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      <nav aria-label="เส้นทางหน้า" className="flex items-center gap-2 text-sm text-slate-600">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-[#4338CA] hover:underline underline-offset-4 font-medium"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>หน้าค้นหา</span>
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-slate-900 font-medium">รายการโปรด</span>
      </nav>

      <header className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            รายการโปรดบนอุปกรณ์นี้
          </h1>
          <p className="text-sm text-slate-600">
            บันทึกเฉพาะหัวข้อโรคและแนวทาง Focus เพื่อเปิดดูซ้ำอย่างรวดเร็ว (ไม่เก็บข้อมูลผู้ป่วย และไม่ซิงก์ข้ามอุปกรณ์ในรุ่น MVP)
          </p>
        </div>

        {totalCount > 0 && (
          <div className="shrink-0">
            {!confirmClearOpen ? (
              <button
                type="button"
                onClick={() => setConfirmClearOpen(true)}
                className="inline-flex items-center gap-2 min-h-[44px] px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-sm font-medium text-[#B91C1C] cursor-pointer whitespace-nowrap"
              >
                <Trash2 className="w-4 h-4" aria-hidden="true" />
                <span>ล้างรายการโปรดทั้งหมด</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 bg-white border border-[#B91C1C]/30 rounded-xl p-2">
                <span className="text-xs font-medium text-slate-700 px-2">ยืนยันการล้างทั้งหมด?</span>
                <button
                  type="button"
                  onClick={() => {
                    clearAllFavorites();
                    setConfirmClearOpen(false);
                  }}
                  className="min-h-[36px] px-3 py-1 rounded-lg bg-[#B91C1C] text-white text-xs font-semibold cursor-pointer"
                >
                  ยืนยันล้าง
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmClearOpen(false)}
                  className="min-h-[36px] px-3 py-1 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 cursor-pointer"
                >
                  ยกเลิก
                </button>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Empty State */}
      {totalCount === 0 ? (
        <section className="bg-white border border-slate-200 rounded-xl p-8 sm:p-10 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#7C3AED]/10 text-[#7C3AED] flex items-center justify-center mx-auto">
            <Bookmark className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="space-y-1.5 max-w-md mx-auto">
            <h2 className="text-lg font-bold text-slate-900">ยังไม่มีรายการโปรดที่บันทึกไว้</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              คุณสามารถกดปุ่ม “โปรด” ในหน้าโรคหรือหน้า Focus เพื่อเก็บหัวข้อที่เปิดใช้บ่อยไว้บนอุปกรณ์นี้ได้ทันที
            </p>
          </div>
          <div className="pt-1">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-medium transition-colors"
            >
              <Search className="w-4 h-4" aria-hidden="true" />
              <span>เริ่มค้นหาโรค</span>
            </Link>
          </div>
        </section>
      ) : (
        <div className="space-y-8">
          {/* Saved Diseases / Procedures */}
          {savedDiseases.length > 0 && (
            <section aria-labelledby="fav-diseases-heading" className="space-y-3">
              <h2 id="fav-diseases-heading" className="text-base font-bold text-[#4338CA]">
                โรคและหัตถการที่บันทึกไว้ ({savedDiseases.length})
              </h2>
              <div className="space-y-3">
                {savedDiseases.map(({ fav, disease }) => (
                  <article
                    key={disease.id}
                    className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                        <span className="font-semibold text-[#4338CA]">
                          {disease.entityType === 'disease' ? 'โรค' : 'หัตถการ'}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums">
                          {disease.codeSystem}: {disease.icdCode}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900">{disease.nameTh}</h3>
                      <p className="text-xs text-slate-600">{disease.nameEn}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        to={`/disease/${disease.id}`}
                        className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-lg bg-[#4338CA]/10 hover:bg-[#4338CA]/15 text-[#4338CA] text-sm font-semibold"
                      >
                        <span>เปิดดู</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeFavorite(fav)}
                        aria-label={`นำ ${disease.nameTh} ออกจากรายการโปรด`}
                        className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] px-3 rounded-lg border border-slate-200 text-slate-600 hover:text-[#B91C1C] hover:border-[#B91C1C]/40 text-xs font-medium cursor-pointer"
                      >
                        นำออก
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}

          {/* Saved Focus Diagnoses */}
          {savedFocuses.length > 0 && (
            <section aria-labelledby="fav-focuses-heading" className="space-y-3">
              <h2 id="fav-focuses-heading" className="text-base font-bold text-[#4338CA]">
                ข้อวินิจฉัยปัญหา (F) และแนวทาง FAIE ({savedFocuses.length})
              </h2>
              <div className="space-y-3">
                {savedFocuses.map(({ fav, focus, disease }) => (
                  <article
                    key={focus.id}
                    className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                        <span className="font-mono font-semibold text-slate-800">
                          NANDA-I {focus.nandaCode}
                        </span>
                        {disease && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>บริบท: {disease.nameTh}</span>
                          </>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-slate-900">{focus.titleTh}</h3>
                      <p className="text-xs text-slate-600">{focus.titleEn}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        to={
                          disease
                            ? `/disease/${disease.id}/focus/${focus.id}`
                            : `/focus/${focus.id}`
                        }
                        className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-medium"
                      >
                        <span>แนวทางปัญหา</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeFavorite(fav)}
                        aria-label={`นำ ${focus.titleTh} ออกจากรายการโปรด`}
                        className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] px-3 rounded-lg border border-slate-200 text-slate-600 hover:text-[#B91C1C] hover:border-[#B91C1C]/40 text-xs font-medium cursor-pointer"
                      >
                        นำออก
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </main>
  );
};
