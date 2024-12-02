/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DeleteGameFormValues {
  id: string;
  gameName?: string;
  gameLink?: string;
  gameImg?: string;
  updateImg?: boolean;
  gameImgBase64?: any;
  gameImgFile?: any;
}

export interface DeleteGameFormProps {
  close: () => void;
  values: DeleteGameFormValues;
}
