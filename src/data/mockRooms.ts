interface Room {
  id: number;
  code: number;
  name: string;
  capacidade: number;
  status: 'disponível' | 'ocupado';
}

export const mockRooms: Room[] = [
  {
    id: 1,
    code: 101,
    name: 'Quarto Standard Casal',
    capacidade: 2,
    status: 'disponível',
  },
  {
    id: 2,
    code: 102,
    name: 'Quarto Standard Twin',
    capacidade: 2,
    status: 'ocupado',
  },
  {
    id: 3,
    code: 201,
    name: 'Quarto Superior Casal',
    capacidade: 3,
    status: 'ocupado',
  },
  {
    id: 4,
    code: 202,
    name: 'Quarto Superior Twin',
    capacidade: 3,
    status: 'ocupado',
  },
  {
    id: 5,
    code: 301,
    name: 'Suíte Luxo',
    capacidade: 4,
    status: 'ocupado',
  },
  {
    id: 6,
    code: 302,
    name: 'Suíte Master',
    capacidade: 5,
    status: 'ocupado',
  },
];
