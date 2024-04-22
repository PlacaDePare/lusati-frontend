import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Componets
import { BaseComponent } from './base.component';
import { HeaderbarComponent } from './components/headerbar/headerbar.component';

// Routing
import { BaseRoutingModule } from './base-routing.module';

@NgModule({
  declarations: [
    BaseComponent,
    HeaderbarComponent,
  ],
  imports: [
    CommonModule,
    BaseRoutingModule
  ]
})
export class BaseModule { }
