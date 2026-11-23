import React from 'react';
import { BookMarked, ExternalLink } from 'lucide-react';

export interface CodeSystemReferenceRow {
  dataset: string;
  content: string;
  officialLabel: string;
  officialUrl: string;
}

export const STANDARD_CODE_SYSTEMS: CodeSystemReferenceRow[] = [
  {
    dataset: 'NANDA-I',
    content: 'ข้อวินิจฉัยทางการพยาบาล',
    officialLabel: 'NANDA: หนังสือและการจัดหมวด',
    officialUrl: 'https://nanda.org/nanda-book/',
  },
  {
    dataset: 'ICD-10',
    content: 'โรค อาการ และภาวะสุขภาพ ไม่ใช่รายการข้อวินิจฉัยทางการพยาบาล',
    officialLabel: 'WHO: ICD-10 Browser',
    officialUrl: 'https://icd.who.int/browse10/2019/en',
  },
  {
    dataset: 'ICD-9-CM',
    content: 'มีทั้งรหัสวินิจฉัยและรหัสหัตถการ โดยต้องแยกหมวด',
    officialLabel: 'CMS: รายการรหัสและชื่อเต็ม',
    officialUrl:
      'https://www.cms.gov/medicare/coding-billing/icd-10-codes/icd-9-cm-diagnosis-procedure-codes-abbreviated-and-full-code-titles',
  },
];

interface CodeSystemsReferenceTableProps {
  compact?: boolean;
}

export const CodeSystemsReferenceTable: React.FC<CodeSystemsReferenceTableProps> = ({
  compact = false,
}) => {
  return (
    <section
      aria-labelledby="code-systems-reference-heading"
      className={
        compact
          ? 'border border-slate-200 rounded-xl overflow-hidden bg-slate-50/40'
          : 'bg-white border border-slate-200 rounded-xl overflow-hidden'
      }
    >
      <div className="px-4 sm:px-5 py-4 border-b border-slate-200 flex items-start gap-2.5 bg-white">
        <BookMarked className="w-5 h-5 text-[#4338CA] shrink-0 mt-0.5" aria-hidden="true" />
        <div>
          <h3
            id="code-systems-reference-heading"
            className="text-base font-bold text-slate-900"
          >
            ชุดข้อมูลมาตรฐานและแหล่งอ้างอิงทางการ
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            แยกความหมายระหว่างข้อวินิจฉัยทางการพยาบาล รหัสโรค และรหัสหัตถการออกจากกันอย่างชัดเจน
          </p>
        </div>
      </div>

      {/* Desktop & Tablet Table */}
      <div className="hidden sm:block">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-700">
              <th className="py-3 px-5 w-36">ชุดข้อมูล</th>
              <th className="py-3 px-5">เนื้อหา</th>
              <th className="py-3 px-5 w-72">แหล่งทางการ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {STANDARD_CODE_SYSTEMS.map((row) => (
              <tr key={row.dataset} className="hover:bg-slate-50/70">
                <td className="py-3.5 px-5 font-mono font-bold text-slate-900 whitespace-nowrap align-top">
                  {row.dataset}
                </td>
                <td className="py-3.5 px-5 text-slate-700 leading-relaxed align-top">
                  {row.content}
                </td>
                <td className="py-3.5 px-5 align-top">
                  <a
                    href={row.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-medium text-[#4338CA] hover:text-[#7C3AED] underline underline-offset-4"
                  >
                    <span>{row.officialLabel}</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked List (no horizontal overflow at 360px) */}
      <div className="sm:hidden divide-y divide-slate-200 bg-white">
        {STANDARD_CODE_SYSTEMS.map((row) => (
          <div key={row.dataset} className="p-4 space-y-2">
            <p className="font-mono text-sm font-bold text-slate-900">{row.dataset}</p>
            <p className="text-sm text-slate-700 leading-relaxed">{row.content}</p>
            <a
              href={row.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 min-h-[44px] text-sm font-medium text-[#4338CA] hover:text-[#7C3AED] underline underline-offset-4"
            >
              <span>{row.officialLabel}</span>
              <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};
