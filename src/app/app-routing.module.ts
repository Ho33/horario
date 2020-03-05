import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  {
    path: 'courses',
    loadChildren: () => import('./Pages/courses/courses.module').then( m => m.CoursesPageModule)
  },
  {
    path: 'classes',
    loadChildren: () => import('./Pages/classes/classes.module').then( m => m.ClassesPageModule)
  },
  {
    path: 'schedule',
    loadChildren: () => import('./Pages/schedule/schedule.module').then( m => m.SchedulePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
