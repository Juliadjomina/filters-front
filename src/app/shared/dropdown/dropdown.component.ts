import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SelectorType } from '../../models/selector-type';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
})
export class DropdownComponent implements OnInit {
  @Input() options: SelectorType[] = [];
  @Input() defaultValue: string = '';
  @Output() optionSelected = new EventEmitter<string>();
  selectedOption: string = '';

  ngOnInit(): void {
    this.selectedOption = this.defaultValue;
  }

  selectOption(option: string) {
    this.selectedOption = option;
    this.optionSelected.emit(option);
  }
}
