import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.css'],
})
export class IntroductionComponent extends BaseComponent implements OnInit {
  protected title = '系統使用說明';

  ngOnInit() {
    super.setTitle(this.title);
  }
}
