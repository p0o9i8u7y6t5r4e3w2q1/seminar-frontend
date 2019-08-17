import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../basic';

@Component({
  selector: 'app-role-setting',
  templateUrl: './role-setting.component.html',
  styleUrls: ['./role-setting.component.css'],
})
export class RoleSettingComponent extends BaseComponent implements OnInit {
  protected title = '角色管理';

  ngOnInit() {
    super.setTitle(this.title);
  }
}
