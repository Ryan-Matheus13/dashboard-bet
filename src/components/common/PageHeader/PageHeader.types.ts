/* eslint-disable @typescript-eslint/no-explicit-any */
export interface PageHeaderProps {
  title: string;
  searchable?: boolean;
  searchValue?: any;
  searchOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonLabel: string;
  buttonOnClick: () => void;
}
