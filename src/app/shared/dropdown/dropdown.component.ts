import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CriteriaType} from "../../_models/criteria-type";
import {ComparisonOperator} from "../../_models/comparison-operator";
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
    console.log(this.optionSelected);
    this.selectedOption = this.defaultValue;
  }

}
