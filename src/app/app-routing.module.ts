import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  HomeComponent,
  IntroductionComponent,
  NotFoundComponent,
} from './basic';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'introduction', component: IntroductionComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
