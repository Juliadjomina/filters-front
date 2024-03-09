export interface ComparisonOperator {
  operatorName: string;
  operatorType: 'Text' | 'Number' | 'Date';
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

export type CriteriaResponse = TextCriteria | NumberCriteria | DateCriteria;
