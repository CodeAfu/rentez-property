export interface NavLink {
  label: string;
  href: string;
  dropdown?: NavLink[];
  devOnly?: boolean;
  adminOnly?: boolean;
}

export type Routes = NavLink[];
