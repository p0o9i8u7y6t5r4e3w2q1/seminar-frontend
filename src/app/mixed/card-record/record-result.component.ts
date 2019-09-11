import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../basic';

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
      eletricityResult: 0,
    },
    {
      course: '計算機程式與應用',
      time: new Date(2019, 8, 2, 9, 4),
      cardOwner: 'OOO',
      swipeResult: 1,
      eletricityResult: 1,
    },
    {
      course: '計算機程式與應用',
      time: new Date(2019, 8, 2, 11, 3),
      cardOwner: 'OOO',
      swipeResult: 1,
      eletricityResult: 2,
    },
    {
      course: '雲端行動與應用',
      time: new Date(2019, 8, 3, 14, 59),
      cardOwner: 'XXX',
      swipeResult: 1,
      eletricityResult: 1,
    },
  ];

  results: any[];

  ngOnInit() {
    super.setTitle(this.title);
    this.results = this.resultTestList;
  }

  getSwipeResultString(swipeResult: number) {
    return swipeResult ? '刷卡成功' : '刷卡失敗';
  }

  getEletricityResultString(result: number) {
    switch (result) {
      case 0:
        return '供電失敗';
      case 1:
        return '供電成功';
      case 2:
        return '斷電成功';
    }
  }
}
