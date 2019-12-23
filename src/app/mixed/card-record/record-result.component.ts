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
      recordTime: new Date(2019, 10, 4, 9, 3),
      cardOwner: '未知',
      swipeResult: 0,
    },
    {
      course: '計算機程式與應用',
      recordTime: new Date(2019, 10, 4, 9, 4),
      cardOwner: '備用卡A',
      swipeResult: 1,
    },
    {
      course: '工業管理概論',
      recordTime: new Date(2019, 10, 4, 11, 3),
      cardOwner: '備用卡A',
      swipeResult: 2,
    },
    {
      course: '',
      recordTime: new Date(2019, 10, 5, 10, 10),
      cardOwner: '林助教',
      swipeResult: 1,
    },
  ];

  queryCondition: any = {
    classroomID: '61201',
    startDate: new Date('2019-11-04'),
    endDate: new Date('2019-11-05'),
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
      this.datas = tmp.datas;
      // this.datas = this.resultTestList;
      this.queryCondition = tmp.condition;
      this.storage.delete(CARD_RECORDS);
    }
  }
}
