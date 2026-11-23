import { useAuth } from './AuthContext';
import { api, track } from '../lib/api';
import { focusCodeLabel } from '../types/clinical';
import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import { FavoriteItem, FocusDiagnosis } from '../types/clinical';

const FAVORITES_STORAGE_KEY = 'nursefocus_favorites_v1';

interface CopyFeedbackState {
  status: 'idle' | 'success' | 'fallback';
  templateText: string;
  focusTitle: string;
}

interface QaSimulationState {
  simulateOffline: boolean;
  simulateLoading: boolean;
  simulateContentError: boolean;
  simulateClipboardFailure: boolean;
}

interface AppStateContextValue {
  favorites: FavoriteItem[];
  favoriteError: string;
  favoritesBusy: boolean;
  importGuestFavorites: () => Promise<void>;
  guestFavoriteCount: number;
  isDiseaseFavorite: (diseaseId: string) => boolean;
  isFocusFavorite: (focusId: string) => boolean;
  toggleDiseaseFavorite: (diseaseId: string) => void;
  toggleFocusFavorite: (focusId: string, diseaseId: string) => void;
  removeFavorite: (item: FavoriteItem) => void;
  clearAllFavorites: () => void;
  isOnline: boolean;
  copyFeedback: CopyFeedbackState;
  copyBlankDarTemplate: (focus: FocusDiagnosis) => Promise<void>;
  dismissCopyFeedback: () => void;
  openManualCopyFallback: (focus: FocusDiagnosis) => void;
  qaSim: QaSimulationState;
  setQaSim: React.Dispatch<React.SetStateAction<QaSimulationState>>;
}

const AppStateContext = createContext<AppStateContextValue | undefined>(undefined);

export function buildBlankDarTemplate(focus: FocusDiagnosis): string {
  return [
    `F (ปัญหา / Focus): ${focus.titleTh} (${focus.titleEn}) [${focusCodeLabel(focus)}]`,
    `A (Assessment — เวลา __:__ น.):`,
    `- ข้อมูลประเมินสนับสนุนจริง: `,
    `I (Intervention — เวลา __:__ น.):`,
    `- กิจกรรมการพยาบาลที่ได้ปฏิบัติจริง: `,
    `E (Evaluation — เวลา __:__ น.):`,
    `- ผลการประเมินหลังการพยาบาลจริง: `,
  ].join('\n');
}

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, ready } = useAuth();
  const owner = useRef(user?.id); owner.current = user?.id;
  const busyRef = useRef(false);
  const [favoritesBusy, setFavoritesBusy] = useState(false);
  const [favoriteError, setFavoriteError] = useState('');
  const readGuest = (): FavoriteItem[] => { try { const items = JSON.parse(localStorage.getItem(FAVORITES_STORAGE_KEY) ?? '[]'); return Array.isArray(items) ? items.filter(i => i && typeof i.id === 'string' && typeof i.savedAt === 'string' && (i.type === 'disease' || (i.type === 'focus' && typeof i.diseaseId === 'string'))) : []; } catch { return []; } };
  const [guestFavoriteCount, setGuestFavoriteCount] = useState(() => readGuest().length);
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => {
    try {
      const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const [browserOnline, setBrowserOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  const [qaSim, setQaSim] = useState<QaSimulationState>({
    simulateOffline: false,
    simulateLoading: false,
    simulateContentError: false,
    simulateClipboardFailure: false,
  });

  const [copyFeedback, setCopyFeedback] = useState<CopyFeedbackState>({
    status: 'idle',
    templateText: '',
    focusTitle: '',
  });

  useEffect(() => {
    if (!ready) return;
    let active = true; setFavoriteError(''); setFavorites([]);
    if (!user) { setFavorites(readGuest()); busyRef.current = false; setFavoritesBusy(false); return; }
    busyRef.current = true; setFavoritesBusy(true);
    void api<FavoriteItem[]>('/me/favorites').then(items => { if (active) setFavorites(items); }).catch(e => { if (active) setFavoriteError(e.message); }).finally(() => { if (active) { busyRef.current = false; setFavoritesBusy(false); } });
    return () => { active = false; };
  }, [user?.id, ready]);
  const mutateFavorites = async (path: string, method: string, next: (items: FavoriteItem[]) => FavoriteItem[], body?: unknown) => {
    if (busyRef.current || !ready) return;
    const ownerId = user?.id;
    if (!ownerId) {
      const updated = next(readGuest());
      try { localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated)); setFavorites(updated); setGuestFavoriteCount(updated.length); setFavoriteError(''); }
      catch { setFavoriteError('ไม่สามารถบันทึกบนอุปกรณ์นี้'); }
      return;
    }
    busyRef.current = true; setFavoritesBusy(true); setFavoriteError('');
    try {
      await api(path, { method, ...(body ? { body: JSON.stringify(body) } : {}) });
      const updated = await api<FavoriteItem[]>('/me/favorites');
      if (owner.current === ownerId) setFavorites(updated);
    } catch (e) { if (owner.current === ownerId) setFavoriteError(e instanceof Error ? e.message : 'บันทึกไม่สำเร็จ'); }
    finally { if (owner.current === ownerId) { busyRef.current = false; setFavoritesBusy(false); } }
  };
  const importGuestFavorites = async () => {
    await mutateFavorites('/me/favorites/import', 'POST', items => items, { items: readGuest() });
  };

  useEffect(() => {
    const handleOnline = () => setBrowserOnline(true);
    const handleOffline = () => setBrowserOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const isOnline = browserOnline && !qaSim.simulateOffline;

  const isDiseaseFavorite = useCallback(
    (diseaseId: string) =>
      favorites.some((item) => item.type === 'disease' && item.id === diseaseId),
    [favorites]
  );

  const isFocusFavorite = useCallback(
    (focusId: string) =>
      favorites.some((item) => item.type === 'focus' && item.id === focusId),
    [favorites]
  );

  const toggleDiseaseFavorite = (diseaseId: string) => {
    const exists = favorites.some(f => f.type === 'disease' && f.id === diseaseId);
    void mutateFavorites(`/me/favorites/diseases/${encodeURIComponent(diseaseId)}`, exists ? 'DELETE' : 'PUT', items => exists ? items.filter(f => !(f.type === 'disease' && f.id === diseaseId)) : [{ type: 'disease', id: diseaseId, savedAt: new Date().toISOString() }, ...items]);
  };
  const toggleFocusFavorite = (focusId: string, diseaseId: string) => {
    const exists = favorites.some(f => f.type === 'focus' && f.id === focusId);
    void mutateFavorites(`/me/favorites/focuses/${encodeURIComponent(focusId)}`, exists ? 'DELETE' : 'PUT', items => exists ? items.filter(f => !(f.type === 'focus' && f.id === focusId)) : [{ type: 'focus', id: focusId, diseaseId, savedAt: new Date().toISOString() }, ...items], exists ? undefined : { diseaseId });
  };
  const removeFavorite = (target: FavoriteItem) => {
    void mutateFavorites(`/me/favorites/${target.type === 'disease' ? 'diseases' : 'focuses'}/${encodeURIComponent(target.id)}`, 'DELETE', items => items.filter(f => !(f.type === target.type && f.id === target.id)));
  };
  const clearAllFavorites = () => { void mutateFavorites('/me/favorites', 'DELETE', () => []); };

  const dismissCopyFeedback = useCallback(() => {
    setCopyFeedback((prev) => ({ ...prev, status: 'idle' }));
  }, []);

  const openManualCopyFallback = useCallback((focus: FocusDiagnosis) => {
    const templateText = buildBlankDarTemplate(focus);
    track('copy-fallback', { focusId: focus.id, diseaseId: focus.diseaseIds[0] });
    setCopyFeedback({
      status: 'fallback',
      templateText,
      focusTitle: focus.titleTh,
    });
  }, []);

  const copyBlankDarTemplate = useCallback(
    async (focus: FocusDiagnosis) => {
      const templateText = buildBlankDarTemplate(focus);

      if (qaSim.simulateClipboardFailure || !navigator?.clipboard?.writeText) {
        setCopyFeedback({
          status: 'fallback',
          templateText,
          focusTitle: focus.titleTh,
        });
        return;
      }

      try {
        await navigator.clipboard.writeText(templateText);
        track('copy-success', { focusId: focus.id, diseaseId: focus.diseaseIds[0] });
        setCopyFeedback({
          status: 'success',
          templateText,
          focusTitle: focus.titleTh,
        });
      } catch {
        setCopyFeedback({
          status: 'fallback',
          templateText,
          focusTitle: focus.titleTh,
        });
      }
    },
    [qaSim.simulateClipboardFailure]
  );

  return (
    <AppStateContext.Provider
      value={{
        favorites, favoriteError, favoritesBusy, importGuestFavorites, guestFavoriteCount,
        isDiseaseFavorite,
        isFocusFavorite,
        toggleDiseaseFavorite,
        toggleFocusFavorite,
        removeFavorite,
        clearAllFavorites,
        isOnline,
        copyFeedback,
        copyBlankDarTemplate,
        dismissCopyFeedback,
        openManualCopyFallback,
        qaSim,
        setQaSim,
      }}
    >
      {favoriteError && <div role="alert" className="bg-red-50 text-red-800 p-3 text-center">{favoriteError} <button onClick={() => setFavoriteError('')} className="underline">ปิด</button></div>}
      {favoritesBusy && <div role="status" className="text-center text-sm p-2">กำลังซิงก์รายการโปรด…</div>}
      {children}
    </AppStateContext.Provider>
  );
};

export function useAppState(): AppStateContextValue {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error('useAppState must be used within AppStateProvider');
  }
  return ctx;
}
