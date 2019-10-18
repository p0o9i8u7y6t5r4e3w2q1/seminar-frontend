import { Pipe, PipeTransform } from '@angular/core';
import * as Constant from '../constant/array.constant';

@Pipe({ name: 'string' })
export class ConstantStringPipe implements PipeTransform {
  transform(code: number, codeType: string) {
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
    }
  }
}
