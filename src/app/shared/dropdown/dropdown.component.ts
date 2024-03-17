import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SelectorType} from "../../_models/selector-type";

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent implements OnInit {

  @Input() options: SelectorType[] = [];
  @Input() defaultValue: string = '';
  @Output() optionSelected = new EventEmitter<string>();
  selectedOption: string = '';

  selectOption(option: string) {
    this.selectedOption = option;
    this.optionSelected.emit(option);

  }

  ngOnInit(): void {
    this.selectedOption = this.defaultValue;
  }
}
