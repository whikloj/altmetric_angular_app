import { Component } from '@angular/core';
import { FormStateService } from '../form-state.service';

/**
 * This component is used to display the form toggle button.
 */
@Component({
  selector: 'app-form-choice',
  templateUrl: './form-choice.component.html',
  styleUrls: ['./form-choice.component.css']
})
export class FormChoiceComponent {
  // The current form state.
  formChoice: string = 'left';
  // The form state service.
  formState: FormStateService;

  /**
   * Basic constructor
   * @constructor
   * @param {FormStateService} fs - The service holding the current state of the search form toggle.
   */
  constructor(private fs: FormStateService) {
    this.formState = fs;
    this.formState.formState$.subscribe((b: boolean) => this.formChoice = b ? 'left' : 'right');
  }

  /**
   * Button action to toggle the form state.
   */
  toggleForm() {
    this.formState.toggleState();
  }
}
