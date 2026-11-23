let accessToken: string | null = null;
let refreshPromise: Promise<boolean> | null = null;
let authEpoch = 0;
export function setAccessToken(value: string | null) { accessToken = value; authEpoch++; }
export class ApiError extends Error {
  constructor(public status: number, public code: string, message: string) { super(message); }
}
async function refresh() {
  if (!refreshPromise) {
    const epoch = authEpoch;
    refreshPromise = fetch('/api/v1/auth/refresh', { method: 'POST', credentials: 'same-origin' }).then(async r => {
      if (!r.ok) return false;
      const body = await r.json();
      if (epoch !== authEpoch) return false;
      accessToken = body.data.accessToken;
      return true;
    }).catch(() => false).finally(() => { refreshPromise = null; });
  }
  return refreshPromise;
}
export async function api<T>(path: string, options: RequestInit = {}, retry = true, envelope = false): Promise<T> {
  const signal = options.signal ? AbortSignal.any([options.signal, AbortSignal.timeout(15000)]) : AbortSignal.timeout(15000);
  const headers = new Headers(options.headers);
  if (options.body) headers.set('Content-Type', 'application/json');
  if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`);
  const r = await fetch('/api/v1' + path, { ...options, headers, signal, credentials: 'same-origin' });
  if (r.status === 401 && retry && !path.startsWith('/auth/')) {
    if (await refresh()) return api<T>(path, options, false, envelope);
    setAccessToken(null);
    window.dispatchEvent(new Event('auth-expired'));
  }
  if (r.status === 204) return undefined as T;
  const body = await r.json();
  if (!r.ok) throw new ApiError(r.status, body.error?.code ?? 'REQUEST_FAILED', body.error?.message ?? 'ไม่สามารถติดต่อระบบ');
  return (envelope ? body : body.data) as T;
}
export function track(type: string, fields: Record<string, unknown> = {}) {
  void api('/events', { method: 'POST', body: JSON.stringify({ eventId: crypto.randomUUID(), type, ...fields }) }, false).catch(() => {});
}

export function apiPage<T>(path: string, options: RequestInit = {}) {
  return api<{ data: T[]; meta: { total: number; page: number; pageSize: number } }>(path, options, true, true);
}
