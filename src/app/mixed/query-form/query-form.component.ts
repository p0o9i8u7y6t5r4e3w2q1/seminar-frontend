import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../basic';

@Component({
  selector: 'app-query-form',
  templateUrl: './query-form.component.html',
  styleUrls: ['./query-form.component.css'],
})
export class QueryFormComponent extends BaseComponent implements OnInit {
  protected title = '查詢申請進度';

  ngOnInit() {
    this.setTitle(this.title);
  }
}
