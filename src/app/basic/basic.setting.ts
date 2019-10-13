import { Routes } from '@angular/router';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomeComponent } from './component/home/home.component';
import { IntroductionComponent } from './component/introduction/introduction.component';
import { NotFoundComponent } from './component/not-found/not-found.component';

export const BasicComponents = [
  HeaderComponent,
  FooterComponent,
  HomeComponent,
  IntroductionComponent,
  NotFoundComponent,
];

export const BasicRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'introduction', component: IntroductionComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];
