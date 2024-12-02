/* eslint-disable @typescript-eslint/no-explicit-any */
export interface EditGameFormValues {
  id: string;
  gameName?: string;
  gameLink?: string;
  gameImg?: string;
  updateImg?: boolean;
  gameImgBase64?: any;
  gameImgFile?: any;
}

export interface EditGameFormProps {
  close: () => void;
  values: EditGameFormValues;
}
