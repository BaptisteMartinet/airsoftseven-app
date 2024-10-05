export interface BaseFilters<T> {
  eq?: T;
  ne?: T;
  in?: Array<T>;
  notIn?: Array<T>;
}

export interface NumericFilters extends BaseFilters<number> {
  lt?: number;
  lte?: number;
  gt?: number;
  gte?: number;
}

export interface StringFilters extends BaseFilters<string> {
  contains?: string;
  startsWith?: string;
  endsWith?: string;
}

export type BooleanFilter = BaseFilters<boolean>;
export type IDFilter = BaseFilters<string>;
