import { jewishMonth, hebrewSpan, monthKey, type JewishDay } from './jewish';
import { getOccurrences, today, type Occurrence } from './events';

export interface Cell { date: string; day: number; inMonth: boolean; jewish?: JewishDay; events: Occurrence[]; past: boolean }
export interface MonthModel { key: string; y: number; m0: number; title: string; hebrew: string; weeks: Cell[][] }

const pad = (n: number) => String(n).padStart(2, '0');
export const dkey = (y: number, m0: number, d: number) => `${y}-${pad(m0 + 1)}-${pad(d)}`;

export async function buildMonth(y: number, m0: number): Promise<MonthModel> {
  const first = new Date(y, m0, 1), last = new Date(y, m0 + 1, 0);
  const jd = jewishMonth(y, m0);
  const t = today();
  const from = dkey(y, m0, 1) > t ? dkey(y, m0, 1) : t;
  const occ = await getOccurrences(from, dkey(y, m0, last.getDate()));
  const byDate = new Map<string, Occurrence[]>();
  for (const o of occ) byDate.set(o.date, [...(byDate.get(o.date) ?? []), o]);
  const cells: Cell[] = [];
  for (let i = 0; i < first.getDay(); i++) cells.push({ date: '', day: 0, inMonth: false, events: [], past: false });
  for (let d = 1; d <= last.getDate(); d++) {
    const k = dkey(y, m0, d);
    cells.push({ date: k, day: d, inMonth: true, jewish: jd.get(k), events: byDate.get(k) ?? [], past: k < t });
  }
  while (cells.length % 7) cells.push({ date: '', day: 0, inMonth: false, events: [], past: false });
  const weeks: Cell[][] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));
  return {
    key: monthKey(y, m0), y, m0, weeks, hebrew: hebrewSpan(y, m0),
    title: first.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
  };
}

// The calendar months we publish: this month plus `horizonMonths` more.
export function monthRange(n: number): { y: number; m0: number; key: string }[] {
  const [y0, m00] = today().split('-').map(Number);
  return Array.from({ length: n + 1 }, (_, i) => {
    const d = new Date(y0, m00 - 1 + i, 1);
    return { y: d.getFullYear(), m0: d.getMonth(), key: monthKey(d.getFullYear(), d.getMonth()) };
  });
}
