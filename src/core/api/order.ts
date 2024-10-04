export type OrderType = "ASC" | "DESC";

export interface OrderBy<FieldType extends string = string> {
  field: FieldType;
  ordering: OrderType;
}
