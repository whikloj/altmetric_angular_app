import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { ResultsComponent } from './results/results.component';
import { TotalsComponent } from './totals/totals.component';
import { FormChoiceComponent } from './form-choice/form-choice.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { AppRoutingModule } from './app-routing.module';
import { OpenAlexFormComponent } from './open-alex-form/open-alex-form.component';
import { ApiMonitorInterceptor } from './api-monitor.interceptor';
import { ViewsChartComponent } from './views-chart/views-chart.component';
import { AltMetricDonutComponent } from './altmetric-donut/altmetric-donut.component';


@NgModule({
  declarations: [
    AppComponent,
    AltMetricDonutComponent,
    SearchFormComponent,
    ResultsComponent,
    TotalsComponent,
    FormChoiceComponent,
    DetailsPageComponent,
    SearchPageComponent,
    OpenAlexFormComponent,
    ViewsChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiMonitorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
