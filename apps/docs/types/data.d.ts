import { SymbolNames } from '@wonderflow/icons';

type NavItemType = {
  label: string;
  url: string;
  blank?: boolean;
}

export type NavType = NavItemType[]

type DocNavItemType = {
  label: string;
  url: string;
  icon: SymbolNames;
  color?: string;
  blank?: boolean;
}

export type DocNavType = DocNavItemType[]
