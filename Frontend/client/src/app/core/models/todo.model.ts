export interface Todo {
  id?: number;
  title: string;
  content: string;
  createdOn?: Date;
  modifiedOn?: Date | null;
  completed?: boolean;
}
