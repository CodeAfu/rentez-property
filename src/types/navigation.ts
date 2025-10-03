export interface NavLink {
  label: string;
  href: string;
  dropdown?: NavLink[]
}

export type Routes = NavLink[]
