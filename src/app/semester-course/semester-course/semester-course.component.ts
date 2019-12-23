import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { BaseComponent, getYearAndSemester, WEEK } from '../../basic';
import {
  CreateSemesterCourseDto,
  UpdateSemesterCourseDto,
} from '../../../lib/api-request';
import { SemesterCourse } from '../../../lib/api-response';
import { RoleType } from '../../../lib/constant-manager';

interface CourseTime {
  weekday: string;
  startPeriod: string;
  endPeriod: string;
}

@Component({
  selector: 'app-semester-course',
  templateUrl: './semester-course.component.html',
  styleUrls: ['./semester-course.component.css'],
})
export class SemesterCourseComponent extends BaseComponent implements OnInit {
  public week = WEEK;

  isCreate: boolean;
  teachers$: Observable<any>;
  courses$: Observable<any>;
  semester$: Observable<any>;

  form: CreateSemesterCourseDto & { courseName?: string };
  times: CourseTime[];

  // for modify
  oldSC?: SemesterCourse;

  initMode() {
    const url = this.router.url;
    this.isCreate = url.endsWith('create');
  }

  get mode() {
    return this.isCreate ? '新增學期課程' : '修改學期課程';
  }

  ngOnInit() {
    this.initVar();
    this.initMode();
    this.setTitle(this.mode);
    this.fetchTeachers();

    if (this.isCreate) {
      this.addCourseTime();
      this.assignYearAndSemester();
      this.fetchCourses();
    } else {
      const scID = this.util.childParam('scID');
      this.api
        .get(`semester-courses/${scID}`)
        .subscribe((sc: SemesterCourse) => {
          if (this.isCreate) {
            this.oldSC = sc;
          }
          Object.assign(this.form, sc, this.sliceScID(sc.id));
          this.splitTime(sc.time);
        });
    }
  }

  initVar() {
    this.times = [];
    this.form = {
      year: 0,
      semester: 0,
      courseID: '',
      courseNo: '',
      courseName: '',
      time: '',
      teacherID: '',
      classroomID: '',
    };
  }

  sliceScID(id: string) {
    return {
      year: parseInt(id.slice(0, 3), 10),
      semester: parseInt(id.slice(3, 4), 10),
      courseID: id.slice(4, 11),
      courseNo: id.slice(11, 12),
    };
  }

  assignYearAndSemester() {
    // const { year, semester } = this.storage.get(YearAndSemester);
    const { year, semester } = getYearAndSemester(new Date());
    this.form.year = year;
    this.form.semester = semester;
  }

  addCourseTime(weekday = '', startPeriod = '', endPeriod = '') {
    if (endPeriod === '') {
      endPeriod = startPeriod;
    }

    this.times.push({
      weekday,
      startPeriod,
      endPeriod,
    });
  }

  createSemesterCourse() {
    this.form.time = this.combineTimes();
    this.api.post(`semester-courses`, this.form).subscribe({
      next: () => {
        alert('新建成功');
        this.router.navigate(['semester-course']);
      },
    });
  }

  combineTimes(): string {
    const timeStrings: string[] = [];
    for (const time of this.times) {
      timeStrings.push(
        `[${time.weekday}]${time.startPeriod}~${time.endPeriod}`,
      );
    }
    return timeStrings.join(',');
  }

  splitTime(timesStr: string): void {
    for (const courseTime of timesStr.split(',')) {
      this.addCourseTime(
        courseTime.slice(1, 2),
        courseTime.slice(3, 4),
        courseTime.slice(5, 6),
      );
    }
  }

  removeCourseTime(index: number) {
    this.times.splice(index, 1);
  }

  // one time
  fetchTeachers() {
    const roleIDs = [RoleType.Teacher, RoleType.DeptHead].join(',');
    const params = new HttpParams().set('roleIDs', roleIDs);
    this.teachers$ = this.api.get(`users`, { params });
  }

  // one time
  fetchCourses() {
    this.courses$ = this.api.get(`courses`);
  }

  modifySemesterCourse() {
    this.form.time = this.combineTimes();

    const update: UpdateSemesterCourseDto = {};
    if (this.oldSC.teacherID !== this.form.teacherID) {
      update.teacherID = this.form.teacherID;
    }
    if (this.oldSC.time !== this.form.time) {
      update.time = this.form.time;
    }
    if (this.oldSC.classroomID !== this.form.classroomID) {
      update.classroomID = this.form.classroomID;
    }

    if (Object.keys(update).length > 0) {
      this.api.put(`semester-courses/${this.oldSC.id}`, update).subscribe({
        next: () => {
          alert('更新成功');
        },
        error: error => {
          alert('更新失敗');
        },
      });
    }
  }
}
