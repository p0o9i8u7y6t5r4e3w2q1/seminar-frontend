import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserComponents, UserRoutes } from './user.setting';

@NgModule({
  declarations: UserComponents,
  imports: [RouterModule.forChild(UserRoutes), CommonModule, FormsModule],
})
export class UserModule {}
