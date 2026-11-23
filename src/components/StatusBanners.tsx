import React, { useEffect, useRef } from 'react';
import { AlertTriangle, CheckCircle2, Copy, RefreshCw, WifiOff, X } from 'lucide-react';
import { useAppState } from '../context/AppStateContext';

export const OfflineBanner: React.FC = () => {
  const { isOnline, setQaSim, qaSim } = useAppState();
  if (isOnline) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="bg-[#C2410C]/10 border-b border-[#C2410C]/30 text-[#9A3412]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-sm">
        <div className="flex items-center gap-2.5 font-medium">
          <WifiOff className="w-4 h-4 shrink-0 text-[#C2410C]" aria-hidden="true" />
          <span>
            ไม่มีการเชื่อมต่อเครือข่าย — รุ่น MVP ยังไม่รับประกันการอ่านข้อมูลออฟไลน์ครบถ้วน โปรดตรวจสอบการเชื่อมต่อก่อนใช้งานต่อ
          </span>
        </div>
        {qaSim.simulateOffline && (
          <button
            type="button"
            onClick={() => setQaSim((prev) => ({ ...prev, simulateOffline: false }))}
            className="text-xs font-semibold underline hover:no-underline px-2 py-1 rounded cursor-pointer"
          >
            ปิดโหมดจำลองออฟไลน์
          </button>
        )}
      </div>
    </div>
  );
};

export const CopyFeedbackOverlays: React.FC = () => {
  const { copyFeedback, dismissCopyFeedback } = useAppState();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (copyFeedback.status === 'success') {
      const timer = setTimeout(() => {
        dismissCopyFeedback();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [copyFeedback.status, dismissCopyFeedback]);

  useEffect(() => {
    if (copyFeedback.status === 'fallback' && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [copyFeedback.status]);

  if (copyFeedback.status === 'idle') return null;

  if (copyFeedback.status === 'success') {
    return (
      <div
        role="status"
        aria-live="polite"
        className="fixed bottom-4 right-4 left-4 sm:left-auto sm:w-96 z-50 bg-white border border-slate-200 shadow-lg rounded-xl p-4 flex items-start gap-3"
      >
        <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" aria-hidden="true" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-900">คัดลอกโครง FAIE แล้ว</p>
          <p className="text-xs text-slate-600 mt-0.5">
            โครงสร้างว่างสำหรับ “{copyFeedback.focusTitle}” พร้อมให้คุณเติมข้อมูลผู้ป่วยจริงในแบบฟอร์มของหน่วยงาน
          </p>
        </div>
        <button
          type="button"
          onClick={dismissCopyFeedback}
          aria-label="ปิดการแจ้งเตือน"
          className="min-w-[36px] min-h-[36px] flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="manual-copy-title"
      className="fixed inset-0 z-50 bg-slate-900/50 flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-lg w-full p-5 sm:p-6 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-2.5">
            <Copy className="w-5 h-5 text-[#C2410C] shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <h2 id="manual-copy-title" className="text-base font-bold text-slate-900">
                คัดลอกอัตโนมัติไม่สำเร็จ — กรุณาคัดลอกโครง FAIE ด้วยตนเอง
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                เบราว์เซอร์จำกัดการเข้าถึงคลิปบอร์ด กดเลือกข้อความทั้งหมดด้านล่างแล้วกด Ctrl+C / Cmd+C
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={dismissCopyFeedback}
            aria-label="ปิดหน้าต่างคัดลอกด้วยตนเอง"
            className="min-w-[40px] min-h-[40px] flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <textarea
          ref={textareaRef}
          readOnly
          rows={8}
          value={copyFeedback.templateText}
          aria-label="โครง FAIE เปล่าสำหรับคัดลอกด้วยตนเอง"
          className="w-full rounded-lg border border-slate-300 bg-slate-50 p-3 text-sm font-mono text-slate-900 focus:outline-none focus:border-[#4338CA]"
        />

        <div className="flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => {
              if (textareaRef.current) {
                textareaRef.current.select();
              }
            }}
            className="min-h-[44px] px-4 py-2 rounded-lg border border-slate-300 text-sm font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            เลือกข้อความทั้งหมด
          </button>
          <button
            type="button"
            onClick={dismissCopyFeedback}
            className="min-h-[44px] px-4 py-2 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-medium cursor-pointer"
          >
            เสร็จสิ้น
          </button>
        </div>
      </div>
    </div>
  );
};

export const ContentSkeleton: React.FC<{ rows?: number }> = ({ rows = 4 }) => {
  return (
    <div aria-busy="true" aria-label="กำลังโหลดเนื้อหา" className="space-y-4">
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3 animate-pulse">
        <div className="h-4 w-32 bg-slate-200 rounded" />
        <div className="h-7 w-2/3 bg-slate-200 rounded" />
        <div className="h-4 w-full bg-slate-100 rounded" />
      </div>
      {Array.from({ length: rows }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 animate-pulse"
        >
          <div className="h-5 w-1/2 bg-slate-200 rounded" />
          <div className="h-4 w-5/6 bg-slate-100 rounded" />
          <div className="h-4 w-1/3 bg-slate-100 rounded" />
        </div>
      ))}
    </div>
  );
};

export const ContentErrorState: React.FC<{
  title?: string;
  message?: string;
  onRetry: () => void;
  onBackToSearch: () => void;
}> = ({
  title = 'ไม่สามารถเปิดเนื้อหาได้ในขณะนี้',
  message = 'เกิดข้อขัดข้องในการเรียกข้อมูลเนื้อหาทางการพยาบาล กรุณาลองใหม่อีกครั้งหรือกลับไปหน้าค้นหา',
  onRetry,
  onBackToSearch,
}) => {
  return (
    <div
      role="alert"
      className="bg-white border border-[#B91C1C]/30 rounded-xl p-6 sm:p-8 max-w-2xl mx-auto text-center space-y-4"
    >
      <div className="w-12 h-12 rounded-full bg-[#B91C1C]/10 text-[#B91C1C] flex items-center justify-center mx-auto">
        <AlertTriangle className="w-6 h-6" aria-hidden="true" />
      </div>
      <div className="space-y-1.5">
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-600">{message}</p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] text-white text-sm font-medium transition-colors cursor-pointer"
        >
          <RefreshCw className="w-4 h-4" aria-hidden="true" />
          <span>ลองใหม่</span>
        </button>
        <button
          type="button"
          onClick={onBackToSearch}
          className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors cursor-pointer"
        >
          <span>กลับหน้าค้นหา</span>
        </button>
      </div>
    </div>
  );
};
