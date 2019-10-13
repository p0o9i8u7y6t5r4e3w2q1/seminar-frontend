import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BookingComponents, BookingRoutes } from './booking.setting';

@NgModule({
  declarations: BookingComponents,
  imports: [RouterModule.forChild(BookingRoutes), CommonModule, FormsModule],
})
export class BookingModule {}
