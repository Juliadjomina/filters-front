export enum CriteriaType {
  AMOUNT = 'AMOUNT',
  TITLE = 'TITLE',
  DATE = 'DATE'
}

export function isNullOrWhitespace(input: string): boolean {
  return !input || input.trim() === '';
}

export function isValidCriteriaValue(input: string | number | Date): boolean {
  if (typeof input === 'string') {
    return !isNullOrWhitespace(input);
  } else if (typeof input === 'number') {
    return !isNaN(input);
  } else if (input instanceof Date) {
    return !isNaN(input.getTime());
  } else {
    return false;
  }
}
