export interface Contacts {
  id: number;
  dsContato: string;
  nrCelular: string;
  dsEmail: string;
  stAtivo: boolean;
}

export interface ContactTotals {
  total: number;
  active: number;
  inactive: number
}

export type ListContacts = Array<Contacts>;
