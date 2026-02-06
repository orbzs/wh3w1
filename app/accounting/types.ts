export type RowsType = "expense" | "income";

export interface Row {
  type: RowsType;
  amount: number;
  content: string;
  id: number;
}

export type NewRow = Omit<Row, "id">;
