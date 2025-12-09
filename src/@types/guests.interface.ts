export interface IGuestAddress {
  id: string;
  cep: string;
  street: string;
  neighborhood: string;
  number: string;
  city: string;
  state: string;
  obs: string;
  isActive: boolean;
  created_at: string;
  updated_at: string;
}
export interface IGuest {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  dateBirth: string; // ISO date
  isActive: boolean;
  deletedAt: string | null;

  created_at: string;
  updated_at: string;

  addresses: IGuestAddress[];
}
