import React, { createContext, useContext, useEffect, useState } from 'react';
import type { DiseaseItem, FocusDiagnosis, AmbiguousAbbreviationGroup, UnverifiedCodeEntry } from '../types/clinical';
import type { CodeSystemReferenceRow } from '../data/codeSystems';
import { api } from '../lib/api';
interface Content { diseases: DiseaseItem[]; focuses: FocusDiagnosis[]; abbreviations: AmbiguousAbbreviationGroup[]; codeSystems: CodeSystemReferenceRow[]; unverifiedCodes: UnverifiedCodeEntry[] }
const Context = createContext<Content | null>(null);
export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Content | null>(null);
  const [error, setError] = useState('');
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController(); setError('');
    void api<Content>('/content', { signal: controller.signal }).then(setData).catch(e => { if (!controller.signal.aborted) setError(e.message); });
    return () => controller.abort();
  }, [attempt]);
  if (!data) return <main className="max-w-xl mx-auto p-8"><h1 className="text-xl font-bold">NurseFocus</h1>{error ? <div role="alert"><p>{error}</p><button className="mt-4 rounded-lg bg-indigo-700 text-white px-5 py-3" onClick={() => setAttempt(a => a+1)}>ลองใหม่</button></div> : <p role="status">กำลังโหลดข้อมูลจากระบบ…</p>}</main>;
  return <Context.Provider value={data}>{children}</Context.Provider>;
}
export function useContent() { const value = useContext(Context); if (!value) throw new Error('ContentProvider missing'); return value; }
