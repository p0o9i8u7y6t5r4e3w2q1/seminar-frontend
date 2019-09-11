import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../basic';

@Component({
  selector: 'app-card-record',
  templateUrl: './card-record.component.html',
  styleUrls: ['./card-record.component.css'],
})
export class CardRecordComponent extends BaseComponent implements OnInit {
  protected title = '刷卡紀錄查詢';

  classroomID = '';
  startDate: Date;
  endDate: Date;

  ngOnInit() {
    super.setTitle(this.title);
  }
}
