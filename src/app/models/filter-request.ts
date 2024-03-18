import {Criteria} from './criteria';

export interface FilterRequest {
  filterName: string;
  criteriaList: Criteria[];
  selectionName: string;
}
