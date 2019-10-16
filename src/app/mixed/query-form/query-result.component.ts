import { Component, OnInit } from '@angular/core';
import { BaseComponent, FORM_PROGRESS } from '../../basic';
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
    this.form = this.formTest; // this.storage.get(FORM);

    if (!this.form) {
      alert('請先填入申請流水號');
      this.router.navigate(['/query-form']);
    }
  }

  get formProgress() {
    return FORM_PROGRESS[this.form.progress];
  }
}
