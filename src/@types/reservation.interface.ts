export interface IReservation {
  id: string;
  guestId: string;
  roomId: string;
  codeReservation: string;

  dateStart: string; // formato YYYY-MM-DD
  dateEnd: string; // formato YYYY-MM-DD

  qntAdults: number;
  qntChildren: number;

  childrenAges: number[]; // array vazio no exemplo, mas normalmente números

  noShow: boolean;
  isActive: boolean;

  created_at: string; // ISO date
  updated_at: string; // ISO date
}
