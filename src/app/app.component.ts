import { Component } from '@angular/core';
import { ResultsComponent } from './results/results.component';
import { SearchFormComponent } from './search-form/search-form.component';

@Component({
  selector: 'app-root',
  template: `
  <main class="App">
    <section class="App-header">
      <h2>Search Altmetric by DOI</h2>
      <section class="searchForm">
        <app-form-choice></app-form-choice>
        <app-search-form></app-search-form>
      </section>
    </section>
    <section class="App-totals">
      <app-totals></app-totals>
    </section>
    <section class="resultsList">
      <app-results></app-results>
    </section>
  </main>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'altmetric-app';
}
