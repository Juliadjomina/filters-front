import {Component, OnInit} from '@angular/core';
import {FiltersService} from "../_services/filters.service";
import {FilterResponse} from "../_models/filter-response";
import {CriteriasService} from "../_services/criterias.service";
import {Criteria} from "../_models/criteria";
import {SelectorType} from "../_models/selector-type";
import {MatSelectionList} from "@angular/material/list";

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
  fontStyle: string = '';
  displayedColumns: string[] = ['type', 'operator', 'value'];
  previousSelectedIndex: number = -1;

  constructor(private filterService: FiltersService,
              private criteriaService: CriteriasService) {
  }

  ngOnInit(): void {
    this.filterService.getAllFilters().subscribe({
      next: (filters) => {
        this.filterResponses = filters;
      }
    });
  }

  getFilterCriteria(a: MatSelectionList, filterId: number, i: number) {
    if (this.previousSelectedIndex !== -1 && this.previousSelectedIndex !== i) {
      const selectedOption = a.options.toArray()[this.previousSelectedIndex];
      a.selectedOptions.deselect(selectedOption);
    }
    if (this.previousSelectedIndex == i) {
      const selectedOption = a.options.toArray()[this.previousSelectedIndex];
      a.selectedOptions.deselect(selectedOption);
    } else {
      this.criteriaService.getFilterCriterias(filterId)
        .subscribe(criteria => this.criteria = criteria);
    }
    this.previousSelectedIndex = i;
  }

  getCriteriaValue(criteria: Criteria): number | string | Date {
    if (criteria.criteriaType === 'TEXT') {
      return criteria.text;
    } else if (criteria.criteriaType === 'DATE') {
      return criteria.date;
    } else if (criteria.criteriaType === 'NUMBER') {
      return criteria.number;
    }
    return 12;
  }
}
