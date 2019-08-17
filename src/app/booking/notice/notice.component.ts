import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../basic';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css'],
})
export class NoticeComponent extends BaseComponent implements OnInit {
  protected title = '申請借用須知';

  ngOnInit() {
    super.setTitle(this.title);
  }
}
