import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../basic';

@Component({
  selector: 'app-semester-course',
  templateUrl: './semester-course.component.html',
  styleUrls: ['./semester-course.component.css'],
})
export class SemesterCourseComponent extends BaseComponent implements OnInit {
  ngOnInit() {
    this.route.data.subscribe(data => {
      switch (data.type) {
        case 'create':
          this.setTitle('新增學期課程');
          break;
        case 'modify':
          this.setTitle('修改學期課程');
          break;
      }
    });
  }
}
