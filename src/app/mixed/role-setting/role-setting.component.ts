import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { switchMap, shareReplay, tap } from 'rxjs/operators';
import { BaseComponent } from '../../basic';
import { User } from '../../../lib/api-response';
import { CreateUserDto } from '../../../lib/api-request';
import { RoleType } from '../../../lib/constant-manager';

@Component({
  selector: 'app-role-setting',
  templateUrl: './role-setting.component.html',
  styleUrls: ['./role-setting.component.css'],
})
export class RoleSettingComponent extends BaseComponent implements OnInit {
  protected title = '角色管理';

  readonly DEPT_HEAD = RoleType.DeptHead;
  deptHeadID: string;

  form: CreateUserDto;
  teachers: User[];
  deleteStatus: { [x: string]: boolean };
  teachers$: Observable<User[]>;

  initVar() {
    this.form = {
      id: '',
      name: '',
      password: '',
      email: '',
    };
  }

  ngOnInit() {
    this.initVar();
    super.setTitle(this.title);
    this.fetchTeachers();
  }

  fetchTeachers() {
    const params = new HttpParams().set(
      'roleIDs',
      [RoleType.DeptHead, RoleType.Teacher].join(','),
    );

    this.teachers$ = this.fromUpdate$(
      switchMap(() => this.api.get(`users`, { params })),
    ).pipe(
      tap(users => {
        this.deleteStatus = {};
        for (const user of users) {
          this.deleteStatus[user.id] = false;
          if (this.isDeptHead(user.roleID)) {
            this.deptHeadID = user.id;
          }
        }
      }),
      shareReplay(1),
    );
  }

  isDeptHead(roleID: RoleType) {
    return roleID === RoleType.DeptHead;
  }

  assignDeptHead() {
    this.api.put(`users/deptHead/${this.deptHeadID}`, null).subscribe({
      next: () => alert('設定成功'),
      error: error => {
        console.log(error);
        alert('設定失敗');
      },
    });
  }

  createTeacher() {
    this.api.post(`users/teacher`, this.form).subscribe({
      next: () => {
        alert('教師註冊成功');
        // this.updateTeachers();
        this.notify(0);
      },
      error: error => console.log(error),
    });
  }

  deleteTeachers() {
    const teachersToDel = Object.keys(this.deleteStatus).filter(
      id => this.deleteStatus[id],
    );

    const deletes$ = [];
    for (const teacherID of teachersToDel) {
      deletes$.push(this.api.delete(`users/${teacherID}`));
    }

    forkJoin(deletes$).subscribe({
      next: () => {
        alert('刪除成功');
        this.notify(0);
      },
      error: () => {
        alert('刪除失敗');
      },
    });
  }
}
