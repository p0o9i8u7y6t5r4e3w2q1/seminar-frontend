import { Pipe, PipeTransform } from '@angular/core';
import * as Constant from '../constant/template.constant';
import * as Options from '../constant/option.constant';

@Pipe({ name: 'string' })
export class ConstantStringPipe implements PipeTransform {
  transform(code: any, codeType: string) {
    switch (codeType) {
      case 'role':
        return Constant.ROLE[code];
      case 'swipe_result':
        return Constant.SWIPE_CARD_RESULT[code];
      case 'electricity_result':
        return Constant.ELECTRICITY_RESULT[code];
      case 'form_progress':
        return Constant.FORM_PROGRESS[code];
      case 'room_status':
        return Constant.ROOM_STATUS[code];
      case 'classroom':
        return Options.CLASSROOM_NAMES[code];
      case 'course_time':
        const timeRange = code;
        const weekday = new Date(code.date).getDay();

        if (timeRange.startPeriod !== timeRange.endPeriod) {
          return `[${weekday}]${timeRange.startPeriod}~${timeRange.endPeriod}`;
        } else {
          return `[${weekday}]${timeRange.startPeriod}`;
        }
    }
  }
}
