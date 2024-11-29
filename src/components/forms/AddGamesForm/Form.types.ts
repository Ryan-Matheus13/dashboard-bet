/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AddGameFormValues {
  gameName: string;
  gameLink: string;
  gameImgBase64: any;
  gameImgFile: any;
}

export interface AddGameFormProps {
  close: () => void;
}
