import { Component } from '@angular/core';
import { OpenAlexConfigService } from '../open-alex-config.service';

/**
 * This component is used to display the OpenAlex configuration form.
 */
@Component({
  selector: 'app-open-alex-form',
  templateUrl: './open-alex-form.component.html',
  styleUrls: ['./open-alex-form.component.css']
})
export class OpenAlexFormComponent {
  // The OpenAlex config service.
  configService: OpenAlexConfigService;
  // The current email address.
  current_email: string = "";
  // Whether the email address has been stored.
  green_mark:boolean = false;

  /**
   * Basic constructor
   * @param cs The OpenAlex config service.
   */
  constructor(private cs: OpenAlexConfigService) {
    this.configService = cs;
    this.configService.config$.subscribe((email: string) => this.current_email = email);
  }

  /**
   * Set the stored email address.
   * @param {HTMLInputElement} input The input element containing the email address.
   */
  changeEmail(input: HTMLInputElement): void {
      this.configService.setConfig(input.value);
      this.green_mark = true;
  }

  /**
   * Reset the stored marker.
   */
  resetEmail() {
    this.green_mark = false;
  }
}
