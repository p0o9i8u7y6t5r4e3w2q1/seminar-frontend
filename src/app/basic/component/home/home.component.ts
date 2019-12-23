import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent extends BaseComponent implements OnInit {
  protected title = '教室設備借用暨電力管理系統';

  ngOnInit() {
    super.setTitle(this.title);
  }
}
