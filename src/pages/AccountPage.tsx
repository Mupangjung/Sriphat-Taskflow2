import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
export function AccountPage() {
  const { user, login, logout, ready } = useAuth();
  const [error, setError] = useState(''); const [message, setMessage] = useState(''); const [busy, setBusy] = useState(false);
  const run = async (fn: () => Promise<unknown>) => { setBusy(true); setError(''); setMessage(''); try { await fn(); } catch (e) { setError(e instanceof Error ? e.message : 'ดำเนินการไม่สำเร็จ'); } finally { setBusy(false); } };
  if (!ready) return <p role="status" className="p-8">กำลังตรวจสอบบัญชี…</p>;
  const input = 'block border border-slate-300 rounded-lg p-3 w-full mt-1';
  return <main className="max-w-xl mx-auto p-6 space-y-6"><h1 className="text-2xl font-bold">{user ? `บัญชี ${user.displayName}` : 'เข้าสู่ระบบ'}</h1>
    {error && <p role="alert" className="text-red-700">{error}</p>}{message && <p role="status">{message}</p>}
    {!user ? <form className="space-y-4" onSubmit={e => { e.preventDefault(); const d = new FormData(e.currentTarget); void run(() => login(String(d.get('email')), String(d.get('password')))); }}>
      <p>เข้าสู่ระบบเพื่อซิงก์รายการโปรด บัญชีออกโดยผู้ดูแลระบบ</p>
      <label className="block">อีเมล<input className={input} name="email" type="email" autoComplete="username" required /></label>
      <label className="block">รหัสผ่าน<input className={input} name="password" type="password" autoComplete="current-password" required /></label>
      <button disabled={busy} className="bg-indigo-700 text-white rounded-lg px-5 py-3">เข้าสู่ระบบ</button>
    </form> : <>
      <p>{user.email} · {user.role}</p><button disabled={busy} onClick={() => void run(logout)} className="border rounded-lg px-5 py-3">ออกจากระบบ</button>
      <form className="space-y-4" onSubmit={e => { e.preventDefault(); const form = e.currentTarget; const d = new FormData(form); void run(async () => { await api('/auth/password', { method: 'PUT', body: JSON.stringify({ oldPassword: d.get('oldPassword'), password: d.get('password') }) }); await logout(); form.reset(); setMessage('เปลี่ยนรหัสผ่านแล้ว กรุณาเข้าสู่ระบบใหม่'); }); }}>
        <h2 className="font-bold">เปลี่ยนรหัสผ่าน</h2>
        <label className="block">รหัสผ่านเดิม<input name="oldPassword" type="password" autoComplete="current-password" required className={input} /></label>
        <label className="block">รหัสผ่านใหม่ (อย่างน้อย 12 ตัวอักษร ไม่เกิน 72 bytes)<input name="password" type="password" autoComplete="new-password" minLength={12} required className={input} /></label>
        <button disabled={busy} className="border rounded-lg px-5 py-3">เปลี่ยนรหัสผ่าน</button>
      </form>
      {user.role === 'ADMIN' && <form className="space-y-4" onSubmit={e => { e.preventDefault(); const form = e.currentTarget; const d = new FormData(form); void run(async () => { await api('/admin/users', { method: 'POST', body: JSON.stringify(Object.fromEntries(d)) }); form.reset(); setMessage('สร้างบัญชีแล้ว'); }); }}>
        <h2 className="font-bold">สร้างบัญชีสมาชิก</h2>
        <label className="block">ชื่อ<input name="displayName" required className={input} /></label>
        <label className="block">อีเมล<input name="email" type="email" required className={input} /></label>
        <label className="block">รหัสผ่านเริ่มต้น<input name="password" type="password" autoComplete="new-password" minLength={12} required className={input} /></label>
        <button disabled={busy} className="border rounded-lg px-5 py-3">สร้างบัญชี</button>
      </form>}
    </>}
  </main>;
}
