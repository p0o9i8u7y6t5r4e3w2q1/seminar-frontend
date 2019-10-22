import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../basic';

const CARD_RECORDS = 'card_records';

@Component({
  selector: 'app-record-result',
  templateUrl: './record-result.component.html',
  styleUrls: ['./record-result.component.css'],
})
export class RecordResultComponent extends BaseComponent implements OnInit {
  protected title = '刷卡紀錄查詢結果';

  resultTestList = [
    {
      course: '計算機程式與應用',
      time: new Date(2019, 8, 2, 9, 3),
      cardOwner: '???',
      swipeResult: 0,
    },
    {
      course: '計算機程式與應用',
      time: new Date(2019, 8, 2, 9, 4),
      cardOwner: 'OOO',
      swipeResult: 1,
    },
    {
      course: '計算機程式與應用',
      time: new Date(2019, 8, 2, 11, 3),
      cardOwner: 'OOO',
      swipeResult: 2,
    },
    {
      course: '雲端行動與應用',
      time: new Date(2019, 8, 3, 14, 59),
      cardOwner: 'XXX',
      swipeResult: 1,
    },
  ];

  queryCondition: any = {
    classroomID: '61201',
    startDate: new Date('2019-09-02'),
    endDate: new Date('2019-09-03'),
  };
  datas: any[];

  ngOnInit() {
    super.setTitle(this.title);
    this.datas = this.resultTestList;
    const tmp: any = this.storage.get(CARD_RECORDS);
    if (!tmp) {
      alert('請先輸入查詢日期與教室');
      this.router.navigate(['card-record']);
    } else {
      // this.datas = tmp.datas;
      this.queryCondition = tmp.condition;
      this.storage.delete(CARD_RECORDS);
    }
  }
}
