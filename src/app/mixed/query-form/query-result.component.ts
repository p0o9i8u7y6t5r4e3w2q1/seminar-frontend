import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../../basic';

@Component({
  selector: 'app-query-result',
  templateUrl: './query-result.component.html',
  styleUrls: ['./query-result.component.css'],
})
export class QueryResultComponent extends BaseComponent implements OnInit {
  protected title = '申請進度結果';

  @Input() state: string;

  ngOnInit() {
    this.setTitle(this.title);
  }
}
