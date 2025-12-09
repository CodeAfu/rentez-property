export interface SaveTemplateResponse {
  message: string;
  data: {
    templateId: number;
    ownerId: string;
    name: string;
    slug: string;
  }
}
