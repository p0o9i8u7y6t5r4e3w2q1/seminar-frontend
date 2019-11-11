import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../basic';
import { Form } from '../../../lib/api-response';
import { FormProgress } from '../../../lib/constant-manager';

const FORM = 'form';
const DELETE_FORM_MODAL = 'deleteFormModal';

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

  canDeleted() {
    return this.form.progress === FormProgress.Pending;
  }

  openDeleteForm() {
    console.log(this.form.formID)
    if (this.form.formID.startsWith('MF')) {
      this.deleteForm();
    } else {
      this.util.modal.setModalData({ email: '' }, DELETE_FORM_MODAL);
      this.util.modal.open(DELETE_FORM_MODAL);
      console.log('here')
    }
  }

  deleteForm() {
    const subscribeAction = {
      next: () => {
        alert('刪除成功');
        this.router.navigate(['/query-form']);
      },
      error: () => {
        alert('刪除失敗');
      },
    };

    if (this.form.formID.startsWith('BF')) {
      const body = this.util.modal.getModalData(DELETE_FORM_MODAL);
      this.api.delete(`bookings/${this.form.formID}`, { body }).subscribe(subscribeAction);
    } else {
      this.api
        .delete(`course-change/makeup/${this.form.formID}`)
        .subscribe(subscribeAction);
    }
  }
}
