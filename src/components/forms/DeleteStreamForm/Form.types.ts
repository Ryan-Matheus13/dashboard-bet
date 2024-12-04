/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DeleteStreamFormValues {
  id: string;
  liveName?: string;
  liveLink?: string;
  liveStartHour?: string;
  liveEndHour?: string;
  thumbImgBase64?: any;
  gifImgFile?: any;
  thumbImgName?: string;
  gameId?: string;
  audienceLive?: string;
  gifImgBase64?: any;
  thumbImgFile?: any;
  gifImgName?: string;
  dayOfWeek?: number | null;
}

export interface DeleteStreamFormProps {
  close: () => void;
  values: DeleteStreamFormValues;
}
