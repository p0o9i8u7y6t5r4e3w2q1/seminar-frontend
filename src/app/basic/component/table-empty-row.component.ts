import { Component, Input } from '@angular/core';

@Component({
  selector: '[empty-row]',
  template: '<td [attr.colspan]="fullColspan">{{text}}</td>',
})
export class TableEmptyRowComponent {
  @Input() text: string = '無資料';
  @Input() fullColspan: number = 4;
}
