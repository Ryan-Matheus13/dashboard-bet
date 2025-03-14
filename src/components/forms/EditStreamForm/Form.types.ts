/* eslint-disable @typescript-eslint/no-explicit-any */
export interface EditStreamFormValues {
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
  updateImg?: boolean;
  updateGif?: boolean;
}

export interface EditStreamFormProps {
  close: () => void;
  openDelete: () => void;
  games: any;
  values: EditStreamFormValues;
}
