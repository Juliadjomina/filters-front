import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'filters_front';

  handleOptionSelected(option: string) {
    console.log('Selected Option:', option);
    // You can perform further actions here
  }
}
