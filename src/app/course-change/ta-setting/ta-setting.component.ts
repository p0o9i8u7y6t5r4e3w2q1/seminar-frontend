import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../basic';
import { SemesterCourse, Person } from '../../../lib/api-response';

@Component({
  selector: 'app-ta-setting',
  templateUrl: './ta-setting.component.html',
  styleUrls: ['./ta-setting.component.css'],
})
export class TaSettingComponent extends BaseComponent implements OnInit {
  protected title = '助教管理';
  courseID: string;
  course: SemesterCourse = null;
  studentID: string;

  taTestList = [
    { id: 'H31234567', name: '王一明' },
    { id: 'H31234575', name: '王二明' },
    { id: 'H31234583', name: '王三明' },
    { id: 'H31234591', name: '王四明' },
  ];

  TAs: Person[];

  ngOnInit() {
    super.setTitle(this.title);
    this.courseID = this.route.snapshot.params.courseID;
    this.api
      .get(`semester-courses/${this.courseID}`)
      .subscribe((data: SemesterCourse) => {
        this.course = data;
      });

    this.api.get(`course-change/${this.courseID}/TAs`).subscribe({
      next: (data: Person[]) => {
        this.TAs = data;
      },
      error: () => alert('課程助教取得失敗'),
    });

    /*
    this.api.serverWork$.subscribe((serverWork: boolean) => {
      if (serverWork) {
        this.TAs = this.taTestList;
      } else {
        this.TAs = this.taTestList;
      }
    });
     */
  }

  addTA() {
    this.api
      .post(`course-change/${this.courseID}/TA/${this.studentID}`, null)
      .subscribe({
        next: () => {
          alert('新增成功');
        },
        error: error => {
          console.log(error);
          alert('新增失敗');
        },
      });
  }
}
