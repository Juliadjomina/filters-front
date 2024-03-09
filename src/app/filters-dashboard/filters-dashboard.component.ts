import {Component, OnInit} from '@angular/core';
import {FiltersService} from "../_services/filters.service";
import {FilterResponse} from "../_models/filter-response";
import {CriteriasService} from "../_services/criterias.service";
import {CriteriaResponse} from "../_models/criteria-response";
import {CriteriaType} from "../_models/criteria-type";
import {CriteriaTypeService} from "../_services/criteria-type.service";
import {ComparisonOperator} from "../_models/comparison-operator";
import {ComparisonOperatorService} from "../_services/comparison-operator.service";
import {SelectorType} from "../_models/selector-type";
import {ThemePalette} from "@angular/material/core";

@Component({
  selector: 'app-filters-dashboard',
  templateUrl: './filters-dashboard.component.html',
  styleUrls: ['./filters-dashboard.component.scss'],

})
export class FiltersDashboardComponent implements OnInit {
  typesOfShoes: FilterResponse[] = [];
  criterias: CriteriaResponse[] = [];
  displayedColumns: string[] = ['type', 'operator', 'value'];
  criteriaTypes: SelectorType[] = [];
  comparisonOperators: SelectorType[] = [];

  color: ThemePalette = 'primary';
  fontStyle:string = '';
  disabled = false;

  constructor(private filterService: FiltersService,
              private criteriaService: CriteriasService,
              private criteriaTypeService: CriteriaTypeService,
              private comparisonOperatorService: ComparisonOperatorService) {
  }

  ngOnInit(): void {
    const a = this.filterService.getAllFilters().subscribe({
      next: (res) => {
        this.typesOfShoes = res;
      }
    });


  }

  getCriterias(id: number) {
    console.log("aaa")
    const a = this.criteriaService.getCriterias(id).subscribe({
      next: (res) => {
        this.criterias = res;
        console.log(res)
      }
    });

  }

  getValue(criteria: CriteriaResponse): number | string | Date {
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
