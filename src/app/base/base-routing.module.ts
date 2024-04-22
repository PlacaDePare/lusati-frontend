import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
    path: '',
    pathMatch: 'full',
    redirectTo: 'contacts'
  },
  {
    path: 'contacts',
    loadComponent: () => import('../base/views/contacts/contacts.component').then(c => c.ContactsComponent),
    title: 'Lusati | Contatos'
  },
  {
  	path: '**',
  	redirectTo: 'contacts'
  },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class BaseRoutingModule { }
