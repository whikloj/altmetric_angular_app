import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { DetailsPageComponent } from './details-page/details-page.component';
import { SearchPageComponent } from './search-page/search-page.component';

const appRoutes: Routes = [
  { path: '', component: SearchPageComponent },
  { path: 'details/:doi', component: DetailsPageComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(
      appRoutes,
      {
        bindToComponentInputs: true, // <-- to bind the router param to the @Input value
        //enableTracing: true // <-- debugging purposes only
      }
    ),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
