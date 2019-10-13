import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MixedComponents, MixedRoutes } from './mixed.setting';

@NgModule({
  declarations: MixedComponents,
  imports: [RouterModule.forChild(MixedRoutes), CommonModule, FormsModule],
})
export class MixedModule {}
