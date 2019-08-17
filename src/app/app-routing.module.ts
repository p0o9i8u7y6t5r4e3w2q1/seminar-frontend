import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  HomeComponent,
  IntroductionComponent,
  NotFoundComponent,
} from './basic';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'introduction', component: IntroductionComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
