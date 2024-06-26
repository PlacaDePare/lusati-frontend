import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './base/base.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'base',
  },
  {
    path: 'base',
    component: BaseComponent,
    loadChildren: () => import('./base/base.module').then((m) => m.BaseModule),
  },
  {
    path: '**',
    redirectTo: 'base',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
