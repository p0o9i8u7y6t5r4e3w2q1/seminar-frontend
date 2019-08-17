import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleSettingComponent } from './role-setting/role-setting.component';
import { ClassroomScheduleComponent } from './classroom-schedule/classroom-schedule.component';
import { MixedRoutingModule } from './mixed-routing.module';
import { CheckFormComponent } from './check-form/check-form.component';
import { CardRecordComponent } from './card-record/card-record.component';
import { RecordResultComponent } from './card-record/record-result.component';
import { QueryFormComponent } from './query-form/query-form.component';
import { QueryResultComponent } from './query-form/query-result.component';

@NgModule({
  declarations: [
    RoleSettingComponent,
    ClassroomScheduleComponent,
    CheckFormComponent,
    CardRecordComponent,
    RecordResultComponent,
    QueryFormComponent,
    QueryResultComponent,
  ],
  imports: [CommonModule, MixedRoutingModule],
})
export class MixedModule {}
