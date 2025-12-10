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

export interface Submission {
  id: number;
  apiSubmissionId: string;
  email: string;
  status: string;
  role: string;
  signerSlug: string;
  propertyId: string;
  signerId: string;
  openedAt: string;
  completedAt: string;
  declinedAt: string;
  createdAt: string;
  updatedAt: string;
}
