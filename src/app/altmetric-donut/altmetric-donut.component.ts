import { Component, Input } from "@angular/core";
import { AltmetricResult } from "../result";

@Component({
  selector: 'app-altmetric-donut',
  templateUrl: './altmetric-donut.component.html',
  styleUrls: ['./altmetric-donut.component.css']
})
export class AltMetricDonutComponent {
  @Input()
  data!: AltmetricResult;
  @Input()
  display_size!: string;
  has_small_image = false;
  has_medium_image = false;

  constructor() {}

  ngAfterViewInit() {
    if (this.display_size !== 'small' && this.display_size !== 'medium') {
      throw new Error('Invalid display size: ' + this.display_size);
    }
    this.has_small_image = this.data!.images.small != null;
    this.has_medium_image = this.data!.images.medium != null;
    if (this.getImageUrl() === null) {
      throw new Error('No image available for display size: ' + this.display_size);
    }
  }

  getImageUrl() {
    if (this.display_size === 'small') {
      return this.data!.images.small;
    } else if (this.display_size === 'medium') {
      return this.data!.images.medium;
    } else {
      return null;
    }
  }
}
