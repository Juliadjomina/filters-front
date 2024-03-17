import {CriteriaType} from "../shared/utils/utils";

export interface ComparisonOperator {
  operatorName: string;
  operatorType: CriteriaType;
}

export interface TitleCriteria {
  criteriaType: CriteriaType.TITLE;
  comparisonOperator: ComparisonOperator;
  title: string;
}

export interface AmountCriteria {
  criteriaType: CriteriaType.AMOUNT;
  comparisonOperator: ComparisonOperator;
  amount: number;
}

export interface DateCriteria {
  criteriaType: CriteriaType.DATE;
  comparisonOperator: ComparisonOperator;
  date: Date;
}

export type Criteria = TitleCriteria | AmountCriteria | DateCriteria;
