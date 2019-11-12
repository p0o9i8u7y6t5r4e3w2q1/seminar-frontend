import * as moment from 'moment';

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

export function toDateString(date: Date, format = 'YYYY-MM-DD'): string {
  return moment(date).format(format);
}

export function dateStringRange(
  from: Date | moment.Moment,
  to: Date | moment.Moment,
  format = 'YYYY-MM-DD',
) {
  const result: any[] = [];
  if (from > to) {
    return result;
  }

  if (from instanceof Date) {
    from = moment(from);
  }
  if (to instanceof Date) {
    to = moment(to);
  }
  const diff = to.diff(from, 'days');

  for (let i = 0; i <= diff; i++) {
    result.push(from.format(format));
    from.add(1, 'days');
  }

  return result;
}

export function getYearAndSemester(
  date: Date,
): { year: number; semester: number } {
  let year: number;
  let semester: number;
  const mom = moment(date);

  // month是八月以後
  if (mom.month() + 1 >= 8) {
    year = mom.year() - 1911;
    semester = 1;
  } else {
    year = mom.year() - 1911 - 1;
    semester = 2;
  }

  return { year, semester };
}
