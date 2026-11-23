import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
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
    `F (ปัญหา / Focus): ${focus.titleTh} (${focus.titleEn}) [NANDA-I ${focus.nandaCode}]`,
    `A (Assessment — เวลา __:__ น.):`,
    `- ข้อมูลประเมินสนับสนุนจริง: `,
    `I (Intervention — เวลา __:__ น.):`,
    `- กิจกรรมการพยาบาลที่ได้ปฏิบัติจริง: `,
    `E (Evaluation — เวลา __:__ น.):`,
    `- ผลการประเมินหลังการพยาบาลจริง: `,
  ].join('\n');
}

export const AppStateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch {
      // Ignore storage quota errors cleanly
    }
  }, [favorites]);

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

  const toggleDiseaseFavorite = useCallback((diseaseId: string) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.type === 'disease' && item.id === diseaseId);
      if (exists) {
        return prev.filter((item) => !(item.type === 'disease' && item.id === diseaseId));
      }
      return [
        { type: 'disease', id: diseaseId, savedAt: new Date().toISOString() },
        ...prev,
      ];
    });
  }, []);

  const toggleFocusFavorite = useCallback((focusId: string, diseaseId: string) => {
    setFavorites((prev) => {
      const exists = prev.some((item) => item.type === 'focus' && item.id === focusId);
      if (exists) {
        return prev.filter((item) => !(item.type === 'focus' && item.id === focusId));
      }
      return [
        { type: 'focus', id: focusId, diseaseId, savedAt: new Date().toISOString() },
        ...prev,
      ];
    });
  }, []);

  const removeFavorite = useCallback((target: FavoriteItem) => {
    setFavorites((prev) =>
      prev.filter((item) => !(item.type === target.type && item.id === target.id))
    );
  }, []);

  const clearAllFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  const dismissCopyFeedback = useCallback(() => {
    setCopyFeedback((prev) => ({ ...prev, status: 'idle' }));
  }, []);

  const openManualCopyFallback = useCallback((focus: FocusDiagnosis) => {
    const templateText = buildBlankDarTemplate(focus);
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
        favorites,
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
