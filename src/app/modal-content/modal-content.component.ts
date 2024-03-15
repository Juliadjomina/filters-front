import {ChangeDetectorRef, Component, Input} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup} from "@angular/forms";
import {SelectorType} from "../_models/selector-type";
import {CriteriaTypeService} from "../_services/criteria-type.service";
import {ComparisonOperatorService} from "../_services/comparison-operator.service";
import {CriteriaType} from "../_models/criteria-type";
import {ComparisonOperator} from "../_models/comparison-operator";
import {FiltersService} from "../_services/filters.service";
import {FilterRequest} from "../_models/filter-request";
import {Criteria, DateCriteria, NumberCriteria, TextCriteria} from "../_models/criteria";


@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss']
})
export class ModalContentComponent {

  @Input() showModal: string = '';
  @Input() criteriaTypes: SelectorType[] = [];
  @Input() comparisonOperators: SelectorType[] = [];
  filterForm: FormGroup = this.formBuilder.group({
    filterName: [''],
    criteriaList: this.formBuilder.array([this.createCriteria()])
  });

  constructor(private formBuilder: FormBuilder,
              private criteriaTypeService: CriteriaTypeService,
              private comparisonOperatorService: ComparisonOperatorService,
              private readonly changeDetectorRef: ChangeDetectorRef,
              private filterService: FiltersService) {
    this.criteriaTypeService.getCriteriaTypes().subscribe(criteriaTypes => {
      this.criteriaTypes = this.transformCriteriaToSelectorType(criteriaTypes);
    });
    this.comparisonOperatorService.getComparisonOperator().subscribe(comparisonOperators => {
      this.comparisonOperators = this.transformComparisonOperatorToSlectorType(comparisonOperators);
    });
  }

  // ngAfterViewChecked(): void {
  //   this.changeDetectorRef.detectChanges();
  //   }

  transformCriteriaToSelectorType(criteria: CriteriaType[]): SelectorType[] {
    return criteria.map(criterion => ({
      name: criterion.type,
      value: ""
    }));
  }

  transformComparisonOperatorToSlectorType(criteria: ComparisonOperator[]): SelectorType[] {
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

  createCriteria(): FormGroup {
    return this.formBuilder.group({
      type: ['NUMBER'],
      value: [''],
      comparisonOperator: ['']
    });
  }

  addCriteria(): void {
    (this.filterForm.get('criteriaList') as FormArray).push(this.createCriteria());
  }

  collectFilterData(): FilterRequest {
    return {
      filterName: this.filterForm.get('filterName')?.value,
      criteriaList: this.mapFormArrayToCriteriaList(this.filterForm.get('criteriaList') as FormArray)
    };
  }

  mapFormArrayToCriteriaList(criteriaList: FormArray): Criteria[] {
    const criteriaResponses: Criteria[] = [];
    criteriaList.controls.forEach((criteriaGroup: AbstractControl) => {
      if (criteriaGroup instanceof FormGroup) {
        const type = criteriaGroup.get('type')?.value;
        const comparisonOperator = criteriaGroup.get('comparisonOperator')?.value;
        const criteria = this.collectCriteria(type, comparisonOperator, criteriaGroup);
        if (criteria) {
          criteriaResponses.push(<TextCriteria | NumberCriteria | DateCriteria>criteria);
        }
      }
    });
    return criteriaResponses;
  }

  saveFilter(): void {
    if (this.filterForm.valid) {
      this.filterService.saveFilter(this.collectFilterData()).subscribe();
    } else {
      // Form is invalid, handle validation errors
    }
  }

  deleteRow(index: number) {
    (this.filterForm.get('criteriaList') as FormArray).removeAt(index);
  }

  private collectCriteria(type: string, comparisonOperator: string, criteriaGroup: FormGroup<any>) {
    switch (type) {
      case 'TEXT': {
        return  {
          criteriaType: 'TEXT',
          comparisonOperator: {
            operatorName: comparisonOperator,
            operatorType: 'TEXT'
          },
          text: criteriaGroup.get('value')?.value as string
        };
      }
      case 'NUMBER': {
        return  {
          criteriaType: 'NUMBER',
          comparisonOperator: {
            operatorName: comparisonOperator,
            operatorType: 'NUMBER'
          },
          number: criteriaGroup.get('value')?.value as number
        };
      }
      case 'DATE': {
        return  {
          criteriaType: 'DATE',
          comparisonOperator: {
            operatorName: comparisonOperator,
            operatorType: 'DATE'
          },
          date: criteriaGroup.get('value')?.value as Date
        };
      }
      default:
        return '';
    }
  }
}
