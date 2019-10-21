import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../basic';

const FORM = 'form';

@Component({
  selector: 'app-query-form',
  templateUrl: './query-form.component.html',
  styleUrls: ['./query-form.component.css'],
})
export class QueryFormComponent extends BaseComponent implements OnInit {
  protected title = '查詢申請進度';

  formID: string;

  ngOnInit() {
    this.setTitle(this.title);
  }

  query() {
    this.api.get(`forms/${this.formID}`).subscribe({
      next: form => {
        if (form) {
          this.storage.set(FORM, form);
          this.router.navigate(['query-form/result']);
        } else {
          alert('查無此申請');
        }
      },
      error: error => {
        // 因為格式輸入錯誤
        alert('查無此申請');
      },
    });
  }
}
