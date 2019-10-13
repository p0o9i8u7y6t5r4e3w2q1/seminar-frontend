import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../basic';

@Component({
  selector: 'app-classroom-schedule',
  templateUrl: './classroom-schedule.component.html',
  styleUrls: ['./classroom-schedule.component.css'],
})
export class ClassroomScheduleComponent extends BaseComponent
  implements OnInit {
  protected title = '查詢可借用時段';

  classroomID: string = '';
  date: Date = null;

  ngOnInit() {
    super.setTitle(this.title);
  }
}
