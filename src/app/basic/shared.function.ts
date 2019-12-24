import { format, differenceInDays, setDay as setDayFn } from 'date-fns';

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

export function setDay(date: Date | string, day: number) {
  return setDayFn(new Date(date), day);
}

export function toDateString(
  date: Date | string,
  fm: string = 'yyyy-MM-dd',
): string {
  // console.log(`toDateString: ${date}`);
  const tempDate = new Date(date);
  return format(tempDate, fm);
}

export function addDays(date: Date | string, num: number): Date {
  // console.log(`addDays: ${date}`);
  const result = new Date(date);
  result.setDate(result.getUTCDate() + num);
  return result;
}

export function dateStringRange(
  from: Date | string,
  to: Date | string,
  fm: string = 'yyyy-MM-dd',
) {
  // console.log(`dateStringRange: ${{ from, to }}`);
  const fromDate = new Date(from);
  const toDate = new Date(to);

  const result: any[] = [];
  if (fromDate > toDate) {
    return result;
  }

  const diff = differenceInDays(toDate, fromDate);

  for (let i = 0; i <= diff; i++) {
    result.push(format(addDays(fromDate, i), fm));
  }

  return result;
}

export function getYearAndSemester(date: Date | string) {
  // console.log(`getYearAndSemester: ${{ date }}`);
  const tempDate = new Date(date);
  let year: number;
  let semester: number;

  const month = tempDate.getUTCMonth() + 1;
  // month是八月以後或二月以前
  if (month >= 8) {
    year = tempDate.getUTCFullYear() - 1911;
    semester = 1;
  } else if (month < 2) {
    year = tempDate.getUTCFullYear() - 1912;
    semester = 1;
  } else {
    year = tempDate.getUTCFullYear() - 1912;
    semester = 2;
  }

  return { year, semester };
}
