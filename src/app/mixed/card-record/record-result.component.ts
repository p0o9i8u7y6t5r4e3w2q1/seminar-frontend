import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../basic';

@Component({
  selector: 'app-record-result',
  templateUrl: './record-result.component.html',
  styleUrls: ['./record-result.component.css'],
})
export class RecordResultComponent extends BaseComponent implements OnInit {
  protected title = '刷卡紀錄查詢結果';

  ngOnInit() {
    super.setTitle(this.title);
  }
}
