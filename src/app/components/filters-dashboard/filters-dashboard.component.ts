import {Component, OnInit} from '@angular/core';
import {FiltersService} from '../../services/filters.service';
import {FilterResponse} from '../../models/filter-response';
import {CriteriaService} from '../../services/criteria.service';
import {Criteria,} from '../../models/criteria';
import {MatSelectionList} from '@angular/material/list';
import {SharedService} from '../../shared/service/shared-service';
import {CriteriaType} from '../../shared/utils/utils';

@Component({
  selector: 'app-filters-dashboard',
  templateUrl: './filters-dashboard.component.html',
  styleUrls: ['./filters-dashboard.component.scss'],
})
export class FiltersDashboardComponent implements OnInit {

  filterResponses: FilterResponse[] = [];
  criteria: Criteria[] = [];
  formType: string = '';
  previousSelectedIndex: number = -1;
  displayedColumns: string[] = ['type', 'operator', 'value'];

  constructor(
    private filterService: FiltersService,
    private criteriaService: CriteriaService,
    private sharedService: SharedService,
  ) {
  }

  ngOnInit(): void {
    this.loadFilters();
    this.sharedService.getFilterSaved().subscribe((isFilterSaved) => {
      if (isFilterSaved) {
        this.formType = '';
        this.loadFilters();
      }
    });
  }

  loadFilters() {
    this.filterService
      .getAllFilters()
      .subscribe((filters) => (this.filterResponses = filters));
  }

  getFilterCriteria(filters: MatSelectionList, filterId: number, index: number) {
    if (this.previousSelectedIndex !== -1 && this.previousSelectedIndex !== index) {
      const selectedOption = Array.from(filters.options)[this.previousSelectedIndex];
      filters.selectedOptions.deselect(selectedOption);
      this.criteria = [];
    }
    if (this.previousSelectedIndex === index && this.criteria.length !== 0) {
      const selectedOption = Array.from(filters.options)[this.previousSelectedIndex];
      filters.selectedOptions.deselect(selectedOption);
      this.criteria = [];
    } else {
      this.criteriaService
        .getFilterCriteria(filterId)
        .subscribe((criteria) => (this.criteria = criteria));
    }
    this.previousSelectedIndex = index;
  }

  getCriteriaValue(criteria: Criteria): number | string | Date {
    if (criteria.criteriaType === CriteriaType.TITLE) {
      return criteria.title;
    } else if (criteria.criteriaType === CriteriaType.DATE) {
      return criteria.date;
    } else if (criteria.criteriaType === CriteriaType.AMOUNT) {
      return criteria.amount;
    }
    return '';
  }

  getFilterTitle(filter: FilterResponse): string {
    return `${filter.filterName ? 'Filter name: ' + filter.filterName + ' ' : ''}${filter.selectionName ? 'with selection: ' + filter.selectionName : ''}`.trim();
  }
}
