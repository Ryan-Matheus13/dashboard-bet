/* eslint-disable @typescript-eslint/no-explicit-any */
export interface AddStoryFormValues {
  dayOfWeek: number | null;
  title: string;
  description: string;
  thumbnailBase64: any;
  imageBase64: any;
  thumbnailFile: any;
  imageFile: any;
  actionTo: string;
  actionTarget: string;
  actionTitle: string;
}

export interface AddStoryFormProps {
  close: () => void;
}
