export interface ComparisonOperator {
  operatorName: string;
  operatorType: 'TEXT' | 'NUMBER' | 'DATE';
}

export interface TextCriteria {
  criteriaType: 'TEXT';
  comparisonOperator: ComparisonOperator;
  text: string;
}

export interface NumberCriteria {
  criteriaType: 'NUMBER';
  comparisonOperator: ComparisonOperator;
  number: number;
}

export interface DateCriteria {
  criteriaType: 'DATE';
  comparisonOperator: ComparisonOperator;
  date: Date;
}

export type Criteria = TextCriteria | NumberCriteria | DateCriteria;
