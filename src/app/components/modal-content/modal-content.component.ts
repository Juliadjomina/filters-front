import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators,} from '@angular/forms';
import {SelectorType} from '../../models/selector-type';
import {CriteriaTypeService} from '../../services/criteria-type.service';
import {ComparisonOperatorService} from '../../services/comparison-operator.service';
import {ComparisonOperator} from '../../models/comparison-operator';
import {FiltersService} from '../../services/filters.service';
import {FilterRequest} from '../../models/filter-request';
import {AmountCriteria, Criteria, DateCriteria, TitleCriteria,} from '../../models/criteria';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AMOUNT, CriteriaType, isNullOrWhitespace, isValidCriteriaValue,} from '../../shared/utils/utils';
import {SharedService} from '../../shared/service/shared-service';
import {CriteriaTypeResponse} from "../../models/criteria-type";
import {SelectionService} from "../../services/selection.service";
import {Selection} from "../../models/selection";

@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss'],
})
export class ModalContentComponent {
  @Input() formType: string = '';
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  criteriaTypes: SelectorType[] = [];
  comparisonOperators: SelectorType[] = [];
  selections: SelectorType[] = [];
  filterForm: FormGroup = this.formBuilder.group({
    filterName: [''],
    selection: [''],
    criteriaList: this.formBuilder.array([this.createCriteria()]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private criteriaTypeService: CriteriaTypeService,
    private comparisonOperatorService: ComparisonOperatorService,
    private snackBar: MatSnackBar,
    private filterService: FiltersService,
    private sharedService: SharedService,
    private selectionService: SelectionService
  ) {
    this.criteriaTypeService.getCriteriaTypes().subscribe((criteriaTypes) => {
      this.criteriaTypes = this.transformCriteriaToSelectorType(criteriaTypes);
    });
    this.comparisonOperatorService.getComparisonOperator().subscribe((comparisonOperators) => {
        this.comparisonOperators = this.transformComparisonOperatorToSelectorType(comparisonOperators);
      });
    this.selectionService.getSelections().subscribe((selections) => {
      this.selections = this.transformSelectionsToSelectorType(selections);
    })
  }

  addCriteria(): void {
    (this.filterForm.get('criteriaList') as FormArray).push(
      this.createCriteria(),
    );
  }

  createCriteria(): FormGroup {
    return this.formBuilder.group({
      type: [AMOUNT],
      value: [''],
      comparisonOperator: [''],
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
        criteriaResponses.push(
          <TitleCriteria | AmountCriteria | DateCriteria>criteria,
        );
      }
    });
    if (criteriaResponses.length === 0) {
      this.openSnackBar('You need at least one criteria to save filter');
    }
    return criteriaResponses;
  }

  onCloseModal() {
    this.closeModal.emit();
  }

  saveFilter(): void {
    if (!this.validateFilter()) {
      this.openSnackBar('Filter name should be added');
      return;
    }
    if (!this.validateCriteria()) {
      this.openSnackBar(
        'All criterias should have comparison type, operator, and value',
      );
      return;
    }
    this.filterService.saveFilter(this.collectFilterData()).subscribe();
    this.closeModal.emit();
    this.openSnackBar('Filter is successfully added');
    if (this.formType === 'non-modal') {
      this.filterForm.reset({
        filterName: '',
        criteriaList: this.formBuilder.array([this.createCriteria()]),
      });
    }
    this.sharedService.setFilterSaved(true);
  }

  validateCriteria(): boolean {
    return (this.filterForm.get('criteriaList') as FormArray).controls.every(
      (criteriaGroup: AbstractControl) => {
        const type = criteriaGroup.get('type')?.value;
        const comparisonOperator =
          criteriaGroup.get('comparisonOperator')?.value;
        const value = criteriaGroup.get('value')?.value;
        return (
          !isNullOrWhitespace(type) &&
          !isNullOrWhitespace(comparisonOperator) &&
          isValidCriteriaValue(value)
        );
      },
    );
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
      criteriaList: this.mapFormArrayToCriteriaList(
        this.filterForm.get('criteriaList') as FormArray,
      ),
      selectionName: this.filterForm.get('selection')?.value
    };
  }

  deleteRow(index: number) {
    (this.filterForm.get('criteriaList') as FormArray).removeAt(index);
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Close', {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000,
    });
  }

  transformCriteriaToSelectorType(criteria: CriteriaTypeResponse[]): SelectorType[] {
    return criteria.map((criterion) => ({
      name: criterion.type,
      value: '',
    }));
  }

  transformComparisonOperatorToSelectorType(
    criteria: ComparisonOperator[],
  ): SelectorType[] {
    return criteria.map((criterion) => ({
      name: criterion.operatorName,
      value: criterion.operatorType,
    }));
  }

  transformSelectionsToSelectorType(
    selections: Selection[],
  ): SelectorType[] {
    return selections.map((selections) => ({
      name: selections.name,
      value: ''
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
    return this.comparisonOperators.filter(
      (operator) => operator.value === criteriaFormGroup.value['type'],
    );
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
    return this.filterForm.controls['criteriaList'] as FormArray;
  }

  private collectCriteria(
    type: string,
    comparisonOperator: string,
    value: string | number | Date,
  ) {
    switch (type) {
      case CriteriaType.TITLE: {
        return {
          criteriaType: CriteriaType.TITLE,
          comparisonOperator: {
            operatorName: comparisonOperator,
            operatorType: CriteriaType.TITLE,
          },
          title: value as string,
        };
      }
      case CriteriaType.AMOUNT: {
        return {
          criteriaType: CriteriaType.AMOUNT,
          comparisonOperator: {
            operatorName: comparisonOperator,
            operatorType: CriteriaType.AMOUNT,
          },
          amount: value as number,
        };
      }
      case CriteriaType.DATE: {
        return {
          criteriaType: CriteriaType.DATE,
          comparisonOperator: {
            operatorName: comparisonOperator,
            operatorType: CriteriaType.DATE,
          },
          date: value as Date,
        };
      }
      default:
        return '';
    }
  }

  protected readonly CriteriaType = CriteriaType;
}
