import {Component, HostListener, OnInit} from '@angular/core';
import {FiltersService} from "../_services/filters.service";
import {FilterResponse} from "../_models/filter-response";
import {CriteriaService} from "../_services/criteria.service";
import {AmountCriteria, Criteria, DateCriteria, TitleCriteria} from "../_models/criteria";
import {SelectorType} from "../_models/selector-type";
import {MatSelectionList} from "@angular/material/list";
import {SharedService} from "../shared/service/shared-service";
import {AMOUNT, DATE, TITLE} from "../shared/utils/utils";

@Component({
  selector: 'app-filters-dashboard',
  templateUrl: './filters-dashboard.component.html',
  styleUrls: ['./filters-dashboard.component.scss'],

})
export class FiltersDashboardComponent implements OnInit {

  filterResponses: FilterResponse[] = [];
  criteria: Criteria[] = [];
  criteriaTypes: SelectorType[] = [];
  comparisonOperators: SelectorType[] = [];
  formType: string = '';
  previousSelectedIndex: number = -1;
  displayedColumns: string[] = ['type', 'operator', 'value'];

  constructor(private filterService: FiltersService,
              private criteriaService: CriteriaService,
              private sharedService: SharedService) {
  }

  ngOnInit(): void {
    this.loadFilters();
    this.sharedService.getFilterSaved().subscribe(isFilterSaved => {
      if (isFilterSaved) {
        this.formType = '';
        this.loadFilters();
      }
    });
  }

  loadFilters() {
    this.filterService.getAllFilters().subscribe(filters => this.filterResponses = filters);
  }

  getFilterCriteria(a: MatSelectionList, filterId: number, i: number) {
    if (this.previousSelectedIndex !== -1 && this.previousSelectedIndex !== i) {
      const selectedOption = a.options.toArray()[this.previousSelectedIndex];
      a.selectedOptions.deselect(selectedOption);
      this.criteria = [];
    }
    if (this.previousSelectedIndex == i && this.criteria.length != 0) {
      const selectedOption = a.options.toArray()[this.previousSelectedIndex];
      a.selectedOptions.deselect(selectedOption);
      this.criteria = [];
    } else {
      this.criteriaService.getFilterCriteria(filterId)
        .subscribe(criteria => this.criteria = criteria);
    }
    this.previousSelectedIndex = i;
  }

  getCriteriaValue(criteria: Criteria): number | string | Date {
    if (criteria.criteriaType === TITLE) {
      return (criteria as TitleCriteria).title;
    } else if (criteria.criteriaType === DATE) {
      return (criteria as DateCriteria).date;
    } else if (criteria.criteriaType === AMOUNT) {
      return (criteria as AmountCriteria).amount;
    }
    return '';
  }
}
