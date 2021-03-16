import { NgModule } from '@angular/core';

import { PageNotFoundComponent } from './components/page-not-found.component';
import { PageNotFoundRoutingModule } from './page-not-found-routing.module';

@NgModule({
  declarations: [
    PageNotFoundComponent
  ],
  imports: [
    PageNotFoundRoutingModule,
  ]
})
export class PageNotFoundModule { }
