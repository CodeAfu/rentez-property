export interface SaveTemplateResponse {
  message: string;
  data: {
    templateId: number;
    ownerId: string;
    name: string;
    slug: string;
  }
}

export interface CreateTemplateResponse {
  message: string,
  created: boolean;
  templateId: string;
  signerEmail: string;
}
