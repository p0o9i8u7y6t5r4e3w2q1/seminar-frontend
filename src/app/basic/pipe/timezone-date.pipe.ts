import { DatePipe } from '@angular/common';

export const DEFAULT_SETTING = {
  TIMEZONE: undefined,
  LOCALE_ID: undefined,
};

export class TimezoneDatePipe extends DatePipe {
  transform(
    value: any,
    format?: string,
    timezone?: string,
    locale?: string,
  ): string {
    return super.transform(
      new Date(value),
      format,
      timezone || DEFAULT_SETTING.TIMEZONE,
      locale || DEFAULT_SETTING.LOCALE_ID,
    );
  }
}
