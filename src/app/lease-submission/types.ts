export interface CompleteSubmissionResponse {
  id: number;
  submission_url: string;
  email: string;
  status: string;
  opened_at: string;
  completed_at: string;
}

//
// [
//   {
//     id: 6172625,
//     submission_id: 4628416,
//     email: "user@gmail.com",
//     phone: null,
//     name: null,
//     ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:145.0) Gecko/20100101 Firefox/145.0",
//     ip: "161.142.146.101",
//     sent_at: null,
//     opened_at: "2025-12-11T07:24:28.891Z",
//     completed_at: "2025-12-11T07:24:28.891Z",
//     declined_at: null,
//     created_at: "2025-12-11T07:21:14.419Z",
//     updated_at: "2025-12-11T07:24:28.894Z",
//     external_id: null,
//     metadata: {},
//     status: "completed",
//     application_key: null,
//     decline_reason: null,
//     role: "Tenant",
//     preferences: {
//       send_email: false,
//       send_sms: false,
//     },
//     values: [
//       {
//         field: "Tenant Signature",
//         value:
//           "https://docuseal.com/file/WyIyMWFhNGI3NC0xNGQwLTRkYzQtYmE0ZC0wYzEwMWFlMzQ4NWEiLCJibG9iIiwxNzY1NDQwMjY4XQ--c2de64b8c024ac98cbb5421f4b791895cac63a03e62ff30fd614a594b2b648ed/signature.png",
//       },
//     ],
//     submission_url: "https://docuseal.com/e/n163FV6TpaKUEM",
//     template: {
//       id: 2253651,
//       name: "Modern Loft Studio Lease [APPLICANT]",
//       external_id:
//         "019a9a89-26b4-7d6e-93b4-de5bd57a08d5:019a9b38-fb80-7c6a-a51c-0ceff1f66425",
//       created_at: "2025-12-04T00:50:50.611Z",
//       updated_at: "2025-12-09T11:34:08.729Z",
//       folder_name: "Default",
//     },
//     submission: {
//       id: 4628416,
//       audit_log_url: null,
//       combined_document_url: null,
//       status: "completed",
//       url: "https://docuseal.com/e/n163FV6TpaKUEM",
//       variables: {},
//       created_at: "2025-12-11T07:21:14.414Z",
//     },
//   },
// ];
