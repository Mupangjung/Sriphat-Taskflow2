import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-slate-600">
        <div className="space-y-1">
          <p className="font-semibold text-slate-800">
            NurseFocus — ค้นโรค เจอประเด็น เขียน Focus ครบ
          </p>
          <p className="text-xs text-slate-500">
            ตัวอย่างสำหรับทดสอบต้นแบบ Frontend (MVP) · ไม่จัดเก็บข้อมูลผู้ป่วย · ใช้ประกอบการพิจารณาทางคลินิกเท่านั้น
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm">
          <Link to="/" className="text-slate-600 hover:text-[#4338CA] underline-offset-4 hover:underline">
            หน้าค้นหา
          </Link>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <Link to="/favorites" className="text-slate-600 hover:text-[#4338CA] underline-offset-4 hover:underline">
            รายการโปรด
          </Link>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <Link to="/compare" className="text-slate-600 hover:text-[#4338CA] underline-offset-4 hover:underline">
            เปรียบเทียบปัญหา
          </Link>
          <span aria-hidden="true" className="text-slate-300">·</span>
          <Link to="/analytics" className="text-slate-600 hover:text-[#4338CA] underline-offset-4 hover:underline">
            สถิติต้นแบบ (ข้อมูลจำลอง)
          </Link>
        </div>
      </div>
    </footer>
  );
};
