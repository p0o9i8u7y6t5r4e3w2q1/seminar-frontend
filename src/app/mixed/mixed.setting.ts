import { Routes } from '@angular/router';
import { CheckFormComponent } from './check-form/check-form.component';
import { CardRecordComponent } from './card-record/card-record.component';
import { RecordResultComponent } from './card-record/record-result.component';
import { QueryFormComponent } from './query-form/query-form.component';
import { QueryResultComponent } from './query-form/query-result.component';
import { RoleSettingComponent } from './role-setting/role-setting.component';
import {
  ClassroomScheduleComponent,
  TimeRangeSearchComponent,
  ClassroomWeekSearchComponent,
} from './classroom-schedule';

export const MixedComponents = [
  RoleSettingComponent,
  ClassroomScheduleComponent,
  TimeRangeSearchComponent,
  ClassroomWeekSearchComponent,
  CheckFormComponent,
  CardRecordComponent,
  RecordResultComponent,
  QueryFormComponent,
  QueryResultComponent,
];

export const MixedRoutes: Routes = [
  {
    path: 'classroom-schedule',
    component: ClassroomScheduleComponent,
    children: [
      {
        path: 'time-range-search',
        component: TimeRangeSearchComponent,
      },
      {
        path: 'classroom-week-search',
        component: ClassroomWeekSearchComponent,
      },
    ],
  },
  { path: 'check-form', component: CheckFormComponent },
  { path: 'role-setting', component: RoleSettingComponent },
  { path: 'card-record', component: CardRecordComponent },
  { path: 'card-record/result', component: RecordResultComponent },
  { path: 'query-form', component: QueryFormComponent },
  { path: 'query-form/result', component: QueryResultComponent },
];
