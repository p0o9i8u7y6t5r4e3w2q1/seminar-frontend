import { format, differenceInDays } from 'date-fns';
export { setDay } from 'date-fns';

export function mapToArrayObject(
  souArray: any[],
  keyField: (item: any) => string,
) {
  const result: { [x: string]: any[] } = {};

  for (const item of souArray) {
    const key = keyField(item);
    if (result[key] === undefined) {
      result[key] = [];
    }
    result[key].push(item);
  }

  return result;
}

export function toDateString(date: Date, fm: string = 'yyyy-MM-dd'): string {
  return format(date, fm);
}

export function addDays(date: Date, num: number): Date {
  const result = new Date(date);
  result.setDate(date.getUTCDate() + num);
  return result;
}

export function dateStringRange(
  from: Date,
  to: Date,
  fm: string = 'yyyy-MM-dd',
) {
  const result: any[] = [];
  if (from > to) {
    return result;
  }

  const diff = differenceInDays(to, from);

  for (let i = 0; i <= diff; i++) {
    result.push(format(from, fm));
    from = addDays(from, 1);
  }

  return result;
}

export function getYearAndSemester(date: Date) {
  let year: number;
  let semester: number;

  const month = date.getUTCMonth() + 1;
  // month是八月以後或二月以前
  if (month >= 8) {
    year = date.getUTCFullYear() - 1911;
    semester = 1;
  } else if (month < 2) {
    year = date.getUTCFullYear() - 1912;
    semester = 1;
  } else {
    year = date.getUTCFullYear() - 1912;
    semester = 2;
  }

  return { year, semester };
}
