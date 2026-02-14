export type RowsType = "expense" | "income";

export interface Row {
  type: RowsType;
  amount: number;
  content: string;
  id: string;
}

export type NewRow = Omit<Row, "id">;
