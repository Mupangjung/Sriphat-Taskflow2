import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { FocusDiagnosis } from '../types/clinical';
import { ComparisonMatrix } from './ComparisonMatrix';

interface ComparePanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  focusA: FocusDiagnosis | null;
  focusB: FocusDiagnosis | null;
  diseaseId?: string;
  diseaseName?: string;
  openerRef: React.RefObject<HTMLButtonElement | null>;
}

export const ComparePanelModal: React.FC<ComparePanelModalProps> = ({
  isOpen,
  onClose,
  focusA,
  focusB,
  diseaseId,
  diseaseName,
  openerRef,
}) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Move focus into dialog close button when opened
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleCloseAndRestoreFocus = () => {
    onClose();
    // Restore focus to opener button after modal closes (PRD Section 9)
    requestAnimationFrame(() => {
      openerRef.current?.focus();
    });
  };

  if (!isOpen || !focusA || !focusB) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="compare-modal-title"
      className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between gap-4 bg-white">
          <div className="min-w-0">
            <p className="text-xs font-medium text-[#4338CA]">
              เปรียบเทียบข้อวินิจฉัยทางการพยาบาล (2 ปัญหา){diseaseName ? ` · ${diseaseName}` : ''}
            </p>
            <h2 id="compare-modal-title" className="text-lg font-bold text-slate-900 truncate">
              {focusA.titleTh} เทียบกับ {focusB.titleTh}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={handleCloseAndRestoreFocus}
            aria-label="ปิดหน้าต่างเปรียบเทียบปัญหา"
            className="inline-flex items-center justify-center gap-1.5 min-w-[44px] min-h-[44px] px-3 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-medium shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">ปิด</span>
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto flex-1">
          <ComparisonMatrix
            focusA={focusA}
            focusB={focusB}
            diseaseId={diseaseId}
            onNavigateDetail={onClose}
          />
        </div>
      </div>
    </div>
  );
};
