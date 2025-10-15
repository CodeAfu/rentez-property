export interface NavLink {
  label: string;
  href: string;
  dropdown?: NavLink[];
  devOnly?: boolean;
}

export type Routes = NavLink[];
