/* eslint-disable @typescript-eslint/no-explicit-any */
export interface SendNotificationAppFormValues {
  title: string;
  body: string;
  imageBase64: string;
  imageFile: any;
  rotulo: string;
  aplicativo: "CASSINO" | "SPORTS" | "TESTE_CASSINO" | "TESTE_SPORTS" | null;
}
