import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { BaseComponent } from '../../basic';
import { Person, User } from '../../../lib/api-response';
import { RoleType } from '../../../lib/constant-manager';

@Component({
  selector: 'app-role-setting',
  templateUrl: './role-setting.component.html',
  styleUrls: ['./role-setting.component.css'],
})
export class RoleSettingComponent extends BaseComponent implements OnInit {
  protected title = '角色管理';

  readonly DEPT_HEAD = RoleType.DeptHead;
  teacherID: string;

  teachers: User[];
  teachersTest: User[] = [
    { id: 'z1000001', name: '高強', roleID: 2, email: '' },
    { id: 'z1000002', name: '王惠嘉', roleID: 3, email: '' },
    { id: 'z1000022', name: '劉任修', roleID: 2, email: '' },
  ];

  ngOnInit() {
    super.setTitle(this.title);
    // this.teachers = this.teachersTest;
    const params = new HttpParams().set(
      'roleIDs',
      `${RoleType.DeptHead},${RoleType.Teacher}`,
    );

    this.api.get('users', { params }).subscribe((teachers: User[]) => {
      this.teachers = teachers;
      this.teacherID = this.teachers.find(
        tch => tch.roleID === RoleType.DeptHead,
      ).id;
    });
  }

  assignDeptHead() {
    this.api.put(`users/deptHead/${this.teacherID}`, null).subscribe({
      next: () => alert('設定成功'),
      error: error => {
        console.log(error);
        alert('設定失敗');
      },
    });
  }
}
