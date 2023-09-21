import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { ResultsComponent } from './results/results.component';
import { TotalsComponent } from './totals/totals.component';
import { FormChoiceComponent } from './form-choice/form-choice.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchFormComponent,
    ResultsComponent,
    TotalsComponent,
    FormChoiceComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
