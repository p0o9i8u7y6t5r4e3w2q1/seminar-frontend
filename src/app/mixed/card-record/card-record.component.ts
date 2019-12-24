import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { BaseComponent } from '../../basic';

const CARD_RECORDS = 'card_records';

@Component({
  selector: 'app-card-record',
  templateUrl: './card-record.component.html',
  styleUrls: ['./card-record.component.css'],
})
export class CardRecordComponent extends BaseComponent implements OnInit {
  protected title = '刷卡紀錄查詢';

  classroomID = '';
  startDate: string;
  endDate: string;

  ngOnInit() {
    super.setTitle(this.title);
  }

  query() {
    let params: HttpParams = new HttpParams();
    params = params.append('classroomID', this.classroomID);
    params = params.append('from', this.startDate.toString());
    params = params.append('to', this.endDate.toString());

    this.api.get('card/records', { params }).subscribe({
      next: datas => {
        const obj = {
          condition: {
            classroomID: this.classroomID,
            startDate: this.startDate,
            endDate: this.endDate,
          },
          datas,
        };
        this.storage.set(CARD_RECORDS, obj);
        this.router.navigate(['/card-record/result']);
      },
      error: error => {
        console.log(error);
        alert('查詢失敗');
      },
    });
  }
}
