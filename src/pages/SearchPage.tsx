import { clinicalDate } from '../lib/dates';
import { api, apiPage, track } from '../lib/api';
import { useContent } from '../context/ContentContext';
import { focusCodeLabel } from '../types/clinical';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  AlertCircle,
  ArrowRight,
  Bookmark,
  ExternalLink,
  FileWarning,
  Search,
  ShieldAlert,
  X,
} from 'lucide-react';
import { useAppState } from '../context/AppStateContext';
import { ContentErrorState, ContentSkeleton } from '../components/StatusBanners';
import {
  CodeSystemsReferenceTable,
} from '../components/CodeSystemsReferenceTable';
import { ClinicalEntityType } from '../types/clinical';

type CatalogFilter = 'all' | ClinicalEntityType | 'code-system';

interface SearchResultItem {
  key: string;
  entityType: ClinicalEntityType | 'code-system' | 'unverified';
  typeLabel:
    | 'โรค'
    | 'หัตถการ'
    | 'ข้อวินิจฉัยทางการพยาบาล'
    | 'ชุดข้อมูลมาตรฐาน'
    | 'ยังไม่มีแนวทางที่ตรวจรับรอง';
  titleTh: string;
  titleEn: string;
  abbreviations: string[];
  codeSystemLabel: string;
  codeValue: string;
  summary: string;
  department?: string;
  reviewStatus?: 'verified' | 'review-due' | 'pending-review';
  reviewedDate?: string;
  to: string | null;
  reasonNote?: string;
  officialUrl?: string;
  officialLabel?: string;
  linkedCatalogFilter?: CatalogFilter;
}

export const SearchPage: React.FC = () => {
  const { diseases, focuses, abbreviations } = useContent();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState<string>('');
  const [catalogFilter, setCatalogFilter] = useState<CatalogFilter>('all');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeSuggestionIdx, setActiveSuggestionIdx] = useState(-1);

  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownWrapperRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const { favorites, isDiseaseFavorite, toggleDiseaseFavorite, qaSim, setQaSim } = useAppState();

  useEffect(() => {
    if (searchParams.get('focusSearch') === '1') {
      searchInputRef.current?.focus();
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownWrapperRef.current &&
        !dropdownWrapperRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const normalizedQuery = query.trim().toLowerCase();

  // Check if query matches an ambiguous abbreviation exactly or closely
  const matchedAmbiguousGroup = useMemo(() => {
    if (!normalizedQuery) return null;
    return (
      abbreviations.find(
        (group) => group.abbr.toLowerCase() === normalizedQuery
      ) ?? null
    );
  }, [normalizedQuery]);

  const [filteredItems, setFilteredItems] = useState<SearchResultItem[]>([]);
  const [suggestions, setSuggestions] = useState<SearchResultItem[]>([]);
  const [searchLoading, setSearchLoading] = useState(true);
  const [searchError, setSearchError] = useState('');
  const [searchAttempt, setSearchAttempt] = useState(0);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const lastTracked = useRef('');
  useEffect(() => { setPage(1); }, [normalizedQuery, catalogFilter]);
  useEffect(() => {
    const controller = new AbortController();
    setSearchLoading(true); setSearchError(''); setActiveSuggestionIdx(-1); setSuggestions([]);
    const timer = setTimeout(() => {
      const params = new URLSearchParams({ q: normalizedQuery, type: catalogFilter, pageSize: '20', page: String(page) });
      void Promise.all([
        apiPage<SearchResultItem>('/catalog?' + params, { signal: controller.signal }),
        api<SearchResultItem[]>('/search/suggestions?' + new URLSearchParams({ q: normalizedQuery }), { signal: controller.signal }),
      ]).then(([items, matches]) => {
        if (controller.signal.aborted) return;
        setFilteredItems(items.data); setTotal(items.meta.total); setSuggestions(matches); setSearchLoading(false);
        const key = normalizedQuery + '|' + catalogFilter;
        if (normalizedQuery && lastTracked.current !== key) track('search', { query: normalizedQuery, catalogType: catalogFilter, searchRequestId: crypto.randomUUID() });
        lastTracked.current = key;
      }).catch(e => { if (!controller.signal.aborted) { setSearchError(e.message); setSearchLoading(false); } });
    }, 300);
    return () => { clearTimeout(timer); controller.abort(); };
  }, [normalizedQuery, catalogFilter, searchAttempt, page]);

  const favoriteDiseases = useMemo(() => {
    return favorites
      .filter((f): f is Extract<typeof f, { type: 'disease' }> => f.type === 'disease')
      .map((f) => diseases.find((d) => d.id === f.id))
      .filter((d): d is NonNullable<typeof d> => Boolean(d));
  }, [favorites]);

  const handleClearSearch = () => {
    setQuery('');
    setCatalogFilter('all');
    setDropdownOpen(false);
    setActiveSuggestionIdx(-1);
    searchInputRef.current?.focus();
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!dropdownOpen || suggestions.length === 0) {
      if (e.key === 'Escape' && query) {
        handleClearSearch();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveSuggestionIdx((prev) => (prev + 1) % suggestions.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveSuggestionIdx((prev) => (prev <= 0 ? suggestions.length - 1 : prev - 1));
    } else if (e.key === 'Enter' && activeSuggestionIdx >= 0) {
      e.preventDefault();
      const selected = suggestions[activeSuggestionIdx];
      if (selected.to) {
        setDropdownOpen(false);
        if (selected.key.startsWith('disease-')) track('disease-open', { diseaseId: selected.key.slice(8) });
        navigate(selected.to);
      } else if (selected.entityType === 'code-system') {
        setQuery(selected.titleTh);
        setDropdownOpen(false);
      }
    } else if (e.key === 'Escape') {
      setDropdownOpen(false);
      setActiveSuggestionIdx(-1);
    }
  };

  // Default directory lists diseases & procedures first unless user filters or searches
  const displayedList = useMemo(() => {
    if (!normalizedQuery && catalogFilter === 'all') {
      return filteredItems.filter(
        (item) => item.entityType === 'disease' || item.entityType === 'procedure'
      );
    }
    return filteredItems;
  }, [catalogFilter, filteredItems, normalizedQuery]);

  if (qaSim.simulateLoading) {
    return (
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <ContentSkeleton rows={4} />
      </main>
    );
  }

  if (qaSim.simulateContentError) {
    return (
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <ContentErrorState
          onRetry={() => setQaSim((prev) => ({ ...prev, simulateContentError: false }))}
          onBackToSearch={() => {
            setQaSim((prev) => ({ ...prev, simulateContentError: false }));
            handleClearSearch();
          }}
        />
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
      {/* Hero / Search Header */}
      <section aria-labelledby="search-hero-heading" className="space-y-5">
        <div className="max-w-3xl space-y-2">
          <p className="text-xs sm:text-sm font-medium text-[#4338CA]">
            ระบบช่วยระบุประเด็นทางการพยาบาลหอผู้ป่วยใน · ตัวอย่างสำหรับทดสอบ
          </p>
          <h1
            id="search-hero-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight headline-balance"
          >
            ค้นโรค เจอประเด็น เขียน Focus ครบ
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            ค้นชื่อโรค หัตถการ รหัส ICD หรือข้อวินิจฉัย NANDA-I เพื่อดูประเด็นสำคัญและแนวทางบันทึกแบบ
            F-A-I-E (ปัญหา–Assessment–Intervention–Evaluation) ได้ทันทีโดยไม่ต้องกรอกข้อมูลผู้ป่วย
          </p>
        </div>

        {/* Main Search Box */}
        <div ref={dropdownWrapperRef} className="relative max-w-3xl">
          <label htmlFor="main-clinical-search" className="sr-only">
            ค้นชื่อโรค ภาษาไทย English คำย่อ หรือรหัส ICD
          </label>
          <div className="relative flex items-center">
            <Search
              className="w-5 h-5 text-slate-400 absolute left-4 pointer-events-none"
              aria-hidden="true"
            />
            <input
              ref={searchInputRef}
              id="main-clinical-search"
              type="search"
              role="combobox"
              aria-expanded={dropdownOpen && suggestions.length > 0}
              aria-controls="search-suggestions-listbox"
              aria-autocomplete="list"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setDropdownOpen(true);
                setActiveSuggestionIdx(-1);
              }}
              onFocus={() => setDropdownOpen(true)}
              onKeyDown={handleSearchKeyDown}
              placeholder="ค้นชื่อโรค ภาษาไทย / English / คำย่อ / รหัส ICD (เช่น CAP, ปอดอักเสบ, J18.9)"
              className="w-full min-h-[52px] pl-12 pr-24 py-3 bg-white border border-slate-300 rounded-xl text-base text-slate-900 placeholder:text-slate-400 shadow-xs focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={handleClearSearch}
                aria-label="ล้างคำค้น"
                className="absolute right-2 inline-flex items-center gap-1 min-h-[40px] px-3 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" aria-hidden="true" />
                <span>ล้าง</span>
              </button>
            )}
          </div>

          {/* Patient privacy reminder */}
          <p className="mt-2 flex items-center gap-1.5 text-xs sm:text-sm text-slate-600">
            <ShieldAlert className="w-4 h-4 text-[#C2410C] shrink-0" aria-hidden="true" />
            <span>
              คำแนะนำความปลอดภัย: กรุณาอย่าพิมพ์ชื่อ-นามสกุล เลข HN หรือข้อมูลที่ระบุตัวผู้ป่วยลงในช่องค้นหา
            </span>
          </p>

          {/* Autocomplete Dropdown */}
          {dropdownOpen && normalizedQuery && suggestions.length > 0 && (
            <ul
              id="search-suggestions-listbox"
              role="listbox"
              aria-label="คำแนะนำระหว่างพิมพ์"
              className="absolute left-0 right-0 top-[56px] z-20 bg-white border border-slate-200 rounded-xl shadow-lg divide-y divide-slate-100 max-h-96 overflow-y-auto"
            >
              {suggestions.map((item, idx) => {
                const isActive = idx === activeSuggestionIdx;
                return (
                  <li
                    key={item.key}
                    role="option"
                    aria-selected={isActive}
                    className={`${isActive ? 'bg-[#7C3AED]/5' : 'hover:bg-slate-50'}`}
                  >
                    {item.to ? (
                      <Link
                        to={item.to}
                        onClick={() => { setDropdownOpen(false); if (item.key.startsWith('disease-')) track('disease-open', { diseaseId: item.key.slice(8) }); }}
                        className="flex items-start justify-between gap-3 px-4 py-3 min-h-[44px]"
                      >
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 mb-0.5">
                            <span
                              className={`font-semibold ${
                                item.entityType === 'disease'
                                  ? 'text-[#4338CA]'
                                  : item.entityType === 'procedure'
                                  ? 'text-[#1D4ED8]'
                                  : 'text-[#7C3AED]'
                              }`}
                            >
                              {item.typeLabel}
                            </span>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono tabular-nums">{item.codeValue}</span>
                            <span aria-hidden="true">·</span>
                            <span>{item.codeSystemLabel}</span>
                          </div>
                          <p className="text-sm font-semibold text-slate-900">
                            {item.titleTh}{' '}
                            <span className="font-normal text-slate-600">({item.titleEn})</span>
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 mt-1" aria-hidden="true" />
                      </Link>
                    ) : item.entityType === 'code-system' ? (
                      <button
                        type="button"
                        onClick={() => {
                          setQuery(item.titleTh);
                          setDropdownOpen(false);
                        }}
                        className="w-full text-left flex items-start justify-between gap-3 px-4 py-3 min-h-[44px] cursor-pointer"
                      >
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 mb-0.5">
                            <span className="font-semibold text-[#4338CA]">{item.typeLabel}</span>
                            <span aria-hidden="true">·</span>
                            <span>{item.officialLabel}</span>
                          </div>
                          <p className="text-sm font-semibold text-slate-900">
                            {item.titleTh}{' '}
                            <span className="font-normal text-slate-600">— {item.summary}</span>
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 mt-1" aria-hidden="true" />
                      </button>
                    ) : (
                      <div className="px-4 py-3 bg-slate-50/70">
                        <div className="flex flex-wrap items-center gap-2 text-xs text-[#C2410C] font-semibold mb-0.5">
                          <span>{item.typeLabel}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono tabular-nums text-slate-700">
                            {item.codeSystemLabel}: {item.codeValue}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-slate-800">{item.titleTh}</p>
                        <p className="text-xs text-slate-600 mt-0.5">{item.reasonNote}</p>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Quick Example Chips */}
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-600">
          <span className="font-medium text-slate-700">ลองค้นหา:</span>
          {['CAP', 'CHF', 'AECOPD', 'DKA', 'Stroke', 'NANDA-I', 'ICD-10', 'ICD-9-CM'].map((term) => (
            <button
              key={term}
              type="button"
              onClick={() => {
                setQuery(term);
                setDropdownOpen(false);
              }}
              className="min-h-[36px] px-3 py-1 rounded-lg bg-white border border-slate-200 hover:border-[#7C3AED] hover:text-[#4338CA] font-mono text-xs tabular-nums transition-colors cursor-pointer"
            >
              {term}
            </button>
          ))}
        </div>
      </section>

      {/* Ambiguous Abbreviation Disambiguation Panel */}
      {matchedAmbiguousGroup && (
        <section
          aria-label="ตัวเลือกคำย่อที่มีหลายความหมาย"
          className="bg-white border border-[#4338CA]/30 rounded-xl p-5 space-y-3"
        >
          <div className="flex items-start gap-2.5">
            <AlertCircle className="w-5 h-5 text-[#4338CA] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h2 className="text-base font-bold text-slate-900">
                พบคำย่อที่มีหลายความหมาย: {matchedAmbiguousGroup.abbr}
              </h2>
              <p className="text-sm text-slate-600 mt-0.5">{matchedAmbiguousGroup.promptText}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {matchedAmbiguousGroup.options.map((opt) =>
              opt.targetDiseaseId ? (
                <Link
                  key={opt.codeLabel}
                  to={`/disease/${opt.targetDiseaseId}`}
                  className="flex items-center justify-between gap-3 p-4 rounded-xl border border-slate-200 hover:border-[#7C3AED] hover:bg-[#7C3AED]/[0.03] transition-colors"
                >
                  <div>
                    <p className="text-sm font-bold text-slate-900">{opt.labelTh}</p>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {opt.labelEn} · <span className="font-mono">{opt.codeLabel}</span>
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#7C3AED] shrink-0" aria-hidden="true" />
                </Link>
              ) : (
                <div
                  key={opt.codeLabel}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/70"
                >
                  <p className="text-sm font-semibold text-slate-800">{opt.labelTh}</p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {opt.labelEn} · <span className="font-mono">{opt.codeLabel}</span>
                  </p>
                  <p className="text-xs font-medium text-[#C2410C] mt-1.5">
                    {opt.statusNote}
                  </p>
                </div>
              )
            )}
          </div>
        </section>
      )}

      {/* Saved Favorites Quick Strip */}
      {favoriteDiseases.length > 0 && !normalizedQuery && (
        <section aria-labelledby="quick-favorites-heading" className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 id="quick-favorites-heading" className="text-base font-bold text-slate-900">
              หัวข้อโปรดที่บันทึกไว้บนอุปกรณ์นี้
            </h2>
            <Link
              to="/favorites"
              className="text-sm font-medium text-[#4338CA] hover:underline underline-offset-4"
            >
              จัดการรายการโปรด ({favorites.length})
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {favoriteDiseases.slice(0, 3).map((d) => (
              <Link
                key={d.id}
                to={`/disease/${d.id}`}
                className="bg-white border border-slate-200 hover:border-[#7C3AED] rounded-xl p-4 flex items-center justify-between gap-3 transition-colors"
              >
                <div className="min-w-0">
                  <p className="text-xs text-slate-500 font-mono truncate">
                    {d.abbreviations.join(' / ')} · {d.icdCode}
                  </p>
                  <p className="text-sm font-bold text-slate-900 truncate mt-0.5">{d.nameTh}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Main Directory & Search Results */}
      <section aria-labelledby="catalog-heading" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 id="catalog-heading" className="text-lg font-bold text-slate-900">
              {normalizedQuery
                ? `ผลค้นหาสำหรับ “${query.trim()}” (${total} รายการ)`
                : 'รายการโรค หัตถการ และข้อวินิจฉัยในระบบ'}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              แยกประเภทโรค หัตถการ และข้อวินิจฉัยทางการพยาบาลชัดเจน พร้อมแสดงชื่อระบบรหัสและฉบับ
            </p>
          </div>

          {/* Segmented Filter Controls */}
          <div
            role="group"
            aria-label="กรองตามประเภทเนื้อหา"
            className="inline-flex flex-wrap items-center gap-1 p-1 bg-slate-100 rounded-lg self-start"
          >
            {(
              [
                { id: 'all', label: 'ทั้งหมด' },
                { id: 'disease', label: 'โรค' },
                { id: 'procedure', label: 'หัตถการ' },
                { id: 'nursing-diagnosis', label: 'ข้อวินิจฉัย / Focus' },
                { id: 'code-system', label: 'ชุดข้อมูลมาตรฐาน' },
              ] as { id: CatalogFilter; label: string }[]
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setCatalogFilter(tab.id)}
                className={`min-h-[36px] px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  catalogFilter === tab.id
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {searchError && <div role="alert" className="p-4 bg-red-50 text-red-800">{searchError} <button onClick={() => setSearchAttempt(a=>a+1)} className="underline">ลองใหม่</button></div>}
        {searchLoading && <p role="status">กำลังค้นหา…</p>}
        {/* Empty Search State */}
        {searchLoading || searchError ? null : displayedList.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center mx-auto">
              <FileWarning className="w-6 h-6" aria-hidden="true" />
            </div>
            <div className="space-y-1.5 max-w-lg mx-auto">
              <h3 className="text-base font-bold text-slate-900">
                ไม่พบเนื้อหาที่ตรงกับคำค้น “{query.trim()}”
              </h3>
              <p className="text-sm text-slate-600">
                ระบบจะไม่สร้างคำแนะนำทางคลินิกขึ้นเองเมื่อไม่มีแนวทางที่ตรวจรับรอง
                ลองตรวจสอบการสะกด หรือใช้คำค้นภาษาอังกฤษ/คำย่อ เช่น CAP, ADHF, AECOPD, DKA, Stroke
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <button
                type="button"
                onClick={handleClearSearch}
                className="min-h-[44px] px-5 py-2.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-medium transition-colors cursor-pointer"
              >
                กลับไปดูโรคทั้งหมด
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedList.map((item) => {
              if (item.entityType === 'code-system') {
                return (
                  <article
                    key={item.key}
                    data-card-tone="standard"
                    className="clinical-card bg-white border border-[#4338CA]/30 rounded-xl p-5 flex flex-col justify-between gap-4"
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                        <span className="font-semibold text-[#4338CA]">{item.typeLabel}</span>
                        <span aria-hidden="true">·</span>
                        <span>แหล่งทางการ</span>
                      </div>
                      <h3 className="text-lg font-bold font-mono text-slate-900">
                        {item.titleTh}
                      </h3>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        <span className="font-semibold text-slate-900">เนื้อหา: </span>
                        {item.summary}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
                      {item.officialUrl && (
                        <a
                          href={item.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-lg bg-[#4338CA]/10 hover:bg-[#4338CA]/15 text-[#4338CA] text-sm font-semibold transition-colors"
                        >
                          <span>{item.officialLabel}</span>
                          <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                        </a>
                      )}

                      {item.linkedCatalogFilter && (
                        <button
                          type="button"
                          onClick={() => {
                            setQuery('');
                            setCatalogFilter(item.linkedCatalogFilter ?? 'all');
                          }}
                          className="inline-flex items-center gap-1.5 min-h-[44px] px-3.5 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs sm:text-sm font-medium text-slate-700 cursor-pointer"
                        >
                          <span>ดูรายการในระบบ</span>
                          <ArrowRight className="w-4 h-4" aria-hidden="true" />
                        </button>
                      )}
                    </div>
                  </article>
                );
              }

              if (item.entityType === 'unverified') {
                return (
                  <article
                    key={item.key}
                    data-card-tone="risk"
                    className="clinical-card bg-white border border-[#C2410C]/40 rounded-xl p-5 space-y-2.5"
                  >
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                      <span className="font-semibold text-[#C2410C]">{item.typeLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span className="font-mono tabular-nums text-slate-800">
                        {item.codeSystemLabel}: {item.codeValue}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900">
                      {item.titleTh}
                      <span className="block text-sm font-normal text-slate-600 mt-0.5">
                        {item.titleEn}
                      </span>
                    </h3>
                    <p className="text-sm text-slate-600">{item.reasonNote}</p>
                  </article>
                );
              }

              const diseaseId = item.key.startsWith('disease-')
                ? item.key.replace('disease-', '')
                : null;
              const isFav = diseaseId ? isDiseaseFavorite(diseaseId) : false;

              return (
                <article
                  key={item.key}
                  data-card-tone={item.entityType}
                  className="clinical-card bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-5 flex flex-col justify-between gap-4 transition-colors"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                        <span
                          className="clinical-card-label"
                        >
                          {item.typeLabel}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono tabular-nums text-slate-800">
                          {item.codeValue}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{item.codeSystemLabel}</span>
                      </div>

                      {item.reviewStatus === 'pending-review' && (
                        <span className="text-xs font-semibold text-amber-800">ข้อมูลจากเอกสาร · รอทบทวน</span>
                      )}
                      {item.reviewStatus === 'review-due' && (
                        <span className="text-xs font-semibold text-[#C2410C]">
                          ถึงรอบทบทวน ({clinicalDate(item.reviewedDate)})
                        </span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                      {item.titleTh}
                      {item.abbreviations.length > 0 && (
                        <span className="ml-1.5 font-mono text-sm font-medium text-slate-600">
                          ({item.abbreviations.join(', ')})
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-slate-500">{item.titleEn}</p>
                    {item.department && (
                      <p className="text-xs font-medium text-slate-600">หน่วยงาน: {item.department}</p>
                    )}
                    <p className="text-sm text-slate-600 leading-relaxed">{item.summary}</p>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-100">
                    {item.to && (
                      <Link
                        to={item.to}
                        onClick={() => { if (item.key.startsWith('disease-')) track('disease-open', { diseaseId: item.key.slice(8) }); }}
                        className="inline-flex items-center gap-1.5 min-h-[44px] px-4 py-2 rounded-lg bg-[#4338CA]/10 hover:bg-[#4338CA]/15 text-[#4338CA] text-sm font-semibold transition-colors"
                      >
                        <span>
                          {item.entityType === 'nursing-diagnosis'
                            ? 'แนวทางปัญหา'
                            : 'ดูประเด็นสำคัญ'}
                        </span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </Link>
                    )}

                    {diseaseId && (
                      <button
                        type="button"
                        onClick={() => toggleDiseaseFavorite(diseaseId)}
                        aria-pressed={isFav}
                        className={`inline-flex items-center gap-1.5 min-h-[44px] px-3 py-2 rounded-lg border text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                          isFav
                            ? 'border-[#7C3AED] bg-[#7C3AED]/10 text-[#4338CA]'
                            : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <Bookmark
                          className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`}
                          aria-hidden="true"
                        />
                        <span>{isFav ? 'บันทึกแล้ว' : 'โปรด'}</span>
                      </button>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {total > 20 && <nav aria-label="หน้าผลค้นหา" className="flex items-center justify-center gap-4">
        <button disabled={page <= 1 || searchLoading} onClick={() => setPage(p=>p-1)} className="border rounded-lg px-4 py-2 disabled:opacity-40">ก่อนหน้า</button>
        <span>หน้า {page} / {Math.ceil(total / 20)}</span>
        <button disabled={page * 20 >= total || searchLoading} onClick={() => setPage(p=>p+1)} className="border rounded-lg px-4 py-2 disabled:opacity-40">ถัดไป</button>
      </nav>}

      <CodeSystemsReferenceTable />
    </main>
  );
};
