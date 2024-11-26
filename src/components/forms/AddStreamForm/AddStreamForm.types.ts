/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AddStreamFormValues {
  username: string;
  password: string;
}

export interface AddStreamFormProps {
  close: () => void;
  games: any;
}
