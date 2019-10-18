import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../basic';
import { Form } from '../../../lib/api-response';

const FORM = 'form';

@Component({
  selector: 'app-query-result',
  templateUrl: './query-result.component.html',
  styleUrls: ['./query-result.component.css'],
})
export class QueryResultComponent extends BaseComponent implements OnInit {
  protected title = '申請進度結果';

  form: Form;
  formTest: Form = {
    formID: '12345678',
    classroomID: '61101',
    timeRange: {
      date: null,
      startPeriod: '2',
      endPeriod: '4',
    },
    progress: 2,
  };

  ngOnInit() {
    this.setTitle(this.title);
    this.form = this.storage.get(FORM);

    if (!this.form) {
      alert('請先填入待查詢流水號');
      this.router.navigate(['/query-form']);
    } else {
      this.storage.delete(FORM);
    }
  }
}
