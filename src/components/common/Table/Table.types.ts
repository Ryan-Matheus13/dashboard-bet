export interface TableProps {
  title: string;
  rows: Array<unknown>;
  columns: Array<string>;
  onCreate: (data: unknown) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onReadData: (id: string) => void;
  onOpenHistory: (id: string) => void;
}
