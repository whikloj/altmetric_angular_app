import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { ResultsComponent } from './results/results.component';
import { TotalsComponent } from './totals/totals.component';
import { FormChoiceComponent } from './form-choice/form-choice.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    ResultsComponent,
    TotalsComponent,
    FormChoiceComponent,
    DetailsPageComponent,
    SearchPageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
