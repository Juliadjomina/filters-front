export interface ComparisonOperator {
  operatorName: string;
  operatorType: 'TITLE' | 'AMOUNT' | 'DATE';
}

export interface TitleCriteria {
  criteriaType: 'TITLE';
  comparisonOperator: ComparisonOperator;
  title: string;
}

export interface AmountCriteria {
  criteriaType: 'AMOUNT';
  comparisonOperator: ComparisonOperator;
  amount: number;
}

export interface DateCriteria {
  criteriaType: 'DATE';
  comparisonOperator: ComparisonOperator;
  date: Date;
}

export type Criteria = TitleCriteria | AmountCriteria | DateCriteria;
