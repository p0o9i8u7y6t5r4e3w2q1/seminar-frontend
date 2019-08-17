import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../basic';

@Component({
  selector: 'app-ta-setting',
  templateUrl: './ta-setting.component.html',
  styleUrls: ['./ta-setting.component.css'],
})
export class TaSettingComponent extends BaseComponent implements OnInit {
  protected title = '助教管理';

  ngOnInit() {
    super.setTitle(this.title);
  }
}
