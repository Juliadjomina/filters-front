import {AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SelectorType} from "../_models/selector-type";
import {CriteriaTypeService} from "../_services/criteria-type.service";
import {ComparisonOperatorService} from "../_services/comparison-operator.service";
import {CriteriaType} from "../_models/criteria-type";
import {ComparisonOperator} from "../_models/comparison-operator";


@Component({
  selector: 'app-modal-content',
  templateUrl: './modal-content.component.html',
  styleUrls: ['./modal-content.component.scss']
})
export class ModalContentComponent implements OnInit, AfterViewChecked{

  @Input() criteriaTypes: SelectorType[] = [];
  @Input() comparisonOperators: SelectorType[] = [];

  filterForm: FormGroup = this.formBuilder.group({
    filterName: ['', Validators.required],
    criteriaList: this.formBuilder.array([this.createCriteria()])
  });


  constructor(private formBuilder: FormBuilder,
              private criteriaTypeService: CriteriaTypeService,
              private comparisonOperatorService: ComparisonOperatorService,
              private readonly changeDetectorRef: ChangeDetectorRef) {
    const b = this.criteriaTypeService.getCriteriaTypes().subscribe({
      next: (res) => {
        this.criteriaTypes = this.transformCriteria(res);
      }
    });
    const c = this.comparisonOperatorService.getComparisonOperator().subscribe({
      next: (res) => {
        this.comparisonOperators = this.transformComparisonOperator(res);
        console.log(res)
        console.log("a")
      }
    });
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
    }


  transformCriteria(criteria: CriteriaType[]): SelectorType[] {
    return criteria.map(criterion => ({
      name: criterion.type,
      value: "" // You can set any default value here
    }));
  }

  transformComparisonOperator(criteria: ComparisonOperator[]): SelectorType[] {
    return criteria.map(criterion => ({
      name: criterion.operatorName,
      value: criterion.operatorType// You can set any default value here
    }));
  }

  handleOptionSelected(option: string, i: number) {
    const criteriaList = this.filterForm.get('criteriaList') as FormArray;
    const criteriaFormGroup = criteriaList.at(i) as FormGroup;
    criteriaFormGroup.value['type'] = option;
  }


  getComparisonOperators(value: number) {
    const criteriaList = this.filterForm.get('criteriaList') as FormArray;
    const criteriaFormGroup = criteriaList.at(value) as FormGroup;
    return this.comparisonOperators.filter(operator => operator.value === criteriaFormGroup.value['type']);
  }

  setComparisonOperator(option: string, i: number) {
    // console.log('Selected Option:', option);
    const criteriaList = this.filterForm.get('criteriaList') as FormArray;
    const criteriaFormGroup = criteriaList.at(i) as FormGroup;
    criteriaFormGroup.value['comparisonOperator'] = option;
    // console.log(criteriaFormGroup.value['comparisonOperator'])
  }


  test(optionSelected: AbstractControl<any>): string {
    const a = optionSelected as FormGroup;
    console.log(a.value['type'])
    return a.value['type'];
  }

  get list(): FormArray {

    return this.filterForm.controls["criteriaList"] as FormArray;
  }

  ngOnInit(): void {
  }

  createCriteria(): FormGroup {
    return this.formBuilder.group({
      type: ['NUMBER', Validators.required],
      value: ['', Validators.required],
      comparisonOperator: ['', Validators.required]
    });
  }

  addCriteria(): void {
    const criteriaList = this.filterForm.get('criteriaList') as FormArray;
    criteriaList.push(this.createCriteria());
  }

  saveFilter(): void {
    if (this.filterForm.valid) {
      // Here you can implement saving logic to your backend API
      console.log('Filter Name:', this.filterForm.value.filterName);
      console.log('Criteria List:', this.filterForm.value.criteriaList);
      // Example of sending data to backend API
      // this.http.post('your-api-url', this.filterForm.value).subscribe(response => {
      //   console.log('Response:', response);
      // });
    } else {
      // Form is invalid, handle validation errors
    }
  }

}
