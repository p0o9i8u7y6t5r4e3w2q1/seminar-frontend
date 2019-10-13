import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../basic';
import { Person } from '../../../lib/api-response';

@Component({
  selector: 'app-role-setting',
  templateUrl: './role-setting.component.html',
  styleUrls: ['./role-setting.component.css'],
})
export class RoleSettingComponent extends BaseComponent implements OnInit {
  protected title = '角色管理';

  deptHead: Person = { id: 'z1000002', name: '王惠嘉' };
  teachers: Person[] = [];
  teachersTest: Person[] = [
    { id: 'z1000001', name: '高強' },
    { id: 'z1000002', name: '王惠嘉' },
    { id: 'z1000022', name: '劉任修' },
  ];

  ngOnInit() {
    super.setTitle(this.title);
    this.teachers = this.teachersTest;
  }
}
