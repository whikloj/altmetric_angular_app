import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  template: `
  <main class="App">
    <router-outlet></router-outlet>
  </main>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'altmetric-app';
}
