import { Component } from '@angular/core';
import { FormStateService } from '../form-state.service';

@Component({
  selector: 'app-form-choice',
  templateUrl: './form-choice.component.html',
  styleUrls: ['./form-choice.component.css']
})
export class FormChoiceComponent {
  formChoice: string = 'left';
  formState: FormStateService;
  constructor(private fs: FormStateService) {
    this.formState = fs;
    this.formState.formState$.subscribe((b: boolean) => this.formChoice = b ? 'left' : 'right');
  }
  toggleForm() {
    this.formState.toggleState();
  }
}
