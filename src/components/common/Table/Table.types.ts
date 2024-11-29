/* eslint-disable @typescript-eslint/no-explicit-any */
export interface TableProps {
  title?: string;
  error?: string | null;
  rows?: Array<unknown>;
  columns?: Array<string>;
  hiddenColumns?: Array<string>;
  isLoading?: boolean;
  onOpenModal?: any;
}
