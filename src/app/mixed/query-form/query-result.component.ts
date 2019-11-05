import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../basic';
import { Form } from '../../../lib/api-response';
import { FormProgress } from '../../../lib/constant-manager';

const FORM = 'form';

@Component({
  selector: 'app-query-result',
  templateUrl: './query-result.component.html',
  styleUrls: ['./query-result.component.css'],
})
export class QueryResultComponent extends BaseComponent implements OnInit {
  protected title = '申請進度結果';

  form: Form;

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

  canDeleted(status: FormProgress) {
    return this.form.formID.startsWith('BF') && status === FormProgress.Pending;
  }

  deleteForm() {
    this.api.delete('bookings/${this.form.formID}').subscribe({
      next: () => {
        alert('刪除成功');
        this.router.navigate(['/query-form']);
      },
      error: () => {
        alert('刪除失敗');
      },
    });
  }
}
