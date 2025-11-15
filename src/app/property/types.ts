
export type Property = {
  id: string;
  title: string;
  description: string;
  pricePerMonth: number;
  address: string;
  city: string;
  state: string;
  images: string[]; // URLs under /uploads or remote
  createdAt: string;
  // Optional extended attributes for advanced filtering
  depositRequired?: boolean;
  billsIncluded?: {
    wifi?: boolean;
    electricity?: boolean;
    water?: boolean;
    gas?: boolean;
  };
  roomType?: "Master Bedroom" | "Medium Room" | "Small Room" | "Studio";
  preferredRaces?: "Chinese" | "Malay" | "Indian"; // example preferences
  preferredOccupation?: "Student" | "Employed" | "Unemployed";
  leaseTermCategory?: "Less than 6 month" | "6 month" | "12 months and above";
};
