import { Component } from '@angular/core';
import { OpenAlexConfigService } from '../open-alex-config.service';

@Component({
  selector: 'app-open-alex-form',
  templateUrl: './open-alex-form.component.html',
  styleUrls: ['./open-alex-form.component.css']
})
export class OpenAlexFormComponent {
  configService: OpenAlexConfigService;
  current_email: string = "";
  green_mark:boolean = false;

  constructor(private cs: OpenAlexConfigService) {
    this.configService = cs;
    this.configService.config$.subscribe((email: string) => this.current_email = email);
  }

  changeEmail(input: HTMLInputElement): void {
      this.configService.setConfig(input.value);
      this.green_mark = true;
  }

  resetEmail() {
    this.green_mark = false;
  }
}
