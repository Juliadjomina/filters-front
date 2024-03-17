import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SelectorType} from "../_models/selector-type";
import {CriteriaTypeService} from "../_services/criteria-type.service";
import {ComparisonOperatorService} from "../_services/comparison-operator.service";
import {CriteriaType} from "../_models/criteria-type";
import {ComparisonOperator} from "../_models/comparison-operator";
import {FiltersService} from "../_services/filters.service";
import {FilterRequest} from "../_models/filter-request";
import {AmountCriteria, Criteria, DateCriteria, TitleCriteria} from "../_models/criteria";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AMOUNT, DATE, isNullOrWhitespace, isValidCriteriaValue, TITLE} from "../shared/utils/utils";
import {SharedService} from "../shared/service/shared-service";


@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss']
})
export class ModalContentComponent {

  @Input() formType: string = '';
  @Input() criteriaTypes: SelectorType[] = [];
  @Input() comparisonOperators: SelectorType[] = [];
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  filterForm: FormGroup = this.formBuilder.group({
    filterName: [''],
    criteriaList: this.formBuilder.array([this.createCriteria()])
  });

  constructor(private formBuilder: FormBuilder,
              private criteriaTypeService: CriteriaTypeService,
              private comparisonOperatorService: ComparisonOperatorService,
              private snackBar: MatSnackBar,
              private filterService: FiltersService,
              private sharedService: SharedService) {

    this.criteriaTypeService.getCriteriaTypes().subscribe(criteriaTypes => {
      this.criteriaTypes = this.transformCriteriaToSelectorType(criteriaTypes);
    });
    this.comparisonOperatorService.getComparisonOperator().subscribe(comparisonOperators => {
      this.comparisonOperators = this.transformComparisonOperatorToSelectorType(comparisonOperators);
    });
  }

  addCriteria(): void {
    (this.filterForm.get('criteriaList') as FormArray).push(this.createCriteria());
  }

  createCriteria(): FormGroup {
    return this.formBuilder.group({
      type: [AMOUNT],
      value: [''],
      comparisonOperator: ['']
    });
  }

  mapFormArrayToCriteriaList(criteriaList: FormArray): Criteria[] {
    const criteriaResponses: Criteria[] = [];
    criteriaList.controls.forEach((criteriaGroup: AbstractControl) => {
      const type = criteriaGroup.get('type')?.value;
      const comparisonOperator = criteriaGroup.get('comparisonOperator')?.value;
      const value = criteriaGroup.get('value')?.value;
      const criteria = this.collectCriteria(type, comparisonOperator, value);
      if (criteria) {
        criteriaResponses.push(<TitleCriteria | AmountCriteria | DateCriteria>criteria);
      }
    });
    if (criteriaResponses.length == 0) {
      this.openSnackBar("You need at least one criteria to save filter");
    }
    return criteriaResponses;
  }

  onCloseModal() {
    this.closeModal.emit();
  }

  saveFilter(): void {
    if (!this.validateFilter()) {
      this.openSnackBar("Filter name should be added");
      return;
    }
    if (!this.validateCriteria()) {
      this.openSnackBar("All criterias should have comparison type, operator, and value");
      return;
    }
    this.filterService.saveFilter(this.collectFilterData()).subscribe();
    this.closeModal.emit();
    this.openSnackBar("Filter is successfully added")
    if (this.formType === 'non-modal') {
      this.filterForm.reset(
        {
          filterName: '',
          criteriaList: this.formBuilder.array([this.createCriteria()])
        }
      );
    }
    this.sharedService.setFilterSaved(true);
  }

  validateCriteria(): boolean {
    return (this.filterForm.get('criteriaList') as FormArray).controls.every((criteriaGroup: AbstractControl) => {
      const type = criteriaGroup.get('type')?.value;
      const comparisonOperator = criteriaGroup.get('comparisonOperator')?.value;
      const value = criteriaGroup.get('value')?.value;
      return !isNullOrWhitespace(type) && !isNullOrWhitespace(comparisonOperator) && isValidCriteriaValue(value);
    });
  }

  validateFilter() {
    if (isNullOrWhitespace(this.filterForm.get('filterName')?.value)) {
      this.filterForm.get('filterName')?.setErrors(Validators.required);
      return false;
    } else {
      return true;
    }
  }

  collectFilterData(): FilterRequest {
    return {
      filterName: this.filterForm.get('filterName')?.value,
      criteriaList: this.mapFormArrayToCriteriaList(this.filterForm.get('criteriaList') as FormArray)
    };
  }

  deleteRow(index: number) {
    (this.filterForm.get('criteriaList') as FormArray).removeAt(index);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    });
  }

  transformCriteriaToSelectorType(criteria: CriteriaType[]): SelectorType[] {
    return criteria.map(criterion => ({
      name: criterion.type,
      value: ""
    }));
  }

  transformComparisonOperatorToSelectorType(criteria: ComparisonOperator[]): SelectorType[] {
    return criteria.map(criterion => ({
      name: criterion.operatorName,
      value: criterion.operatorType
    }));
  }

  handleOptionSelected(value: string, index: number) {
    const criteriaList = this.filterForm.get('criteriaList') as FormArray;
    const criteriaFormGroup = criteriaList.at(index) as FormGroup;
    criteriaFormGroup.controls['type'].setValue(value);
  }

  getComparisonOperators(value: number) {
    const criteriaList = this.filterForm.get('criteriaList') as FormArray;
    const criteriaFormGroup = criteriaList.at(value) as FormGroup;
    return this.comparisonOperators.filter(operator => operator.value === criteriaFormGroup.value['type']);
  }

  setComparisonOperator(option: string, i: number) {
    const criteriaList = this.filterForm.get('criteriaList') as FormArray;
    const criteriaFormGroup = criteriaList.at(i) as FormGroup;
    criteriaFormGroup.controls['comparisonOperator'].setValue(option);
  }

  getType(optionSelected: AbstractControl<any>): string {
    return optionSelected.value['type'];
  }

  get criteriaListAllData(): FormArray {
    return this.filterForm.controls["criteriaList"] as FormArray;
  }

  private collectCriteria(type: string, comparisonOperator: string, value: string | number | Date) {
    switch (type) {
      case TITLE: {
        return {
          criteriaType: TITLE,
          comparisonOperator: {
            operatorName: comparisonOperator,
            operatorType: TITLE
          },
          title: value as string
        };
      }
      case AMOUNT: {
        return {
          criteriaType: AMOUNT,
          comparisonOperator: {
            operatorName: comparisonOperator,
            operatorType: AMOUNT
          },
          amount: value as number
        };
      }
      case DATE: {
        return {
          criteriaType: DATE,
          comparisonOperator: {
            operatorName: comparisonOperator,
            operatorType: DATE
          },
          date: value as Date
        };
      }
      default:
        return '';
    }
  }

  protected readonly AMOUNT = AMOUNT;
  protected readonly TITLE = TITLE;
  protected readonly DATE = DATE;
}
