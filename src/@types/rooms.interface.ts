export interface IRooms {
  id: string;
  isActive: boolean;
  roomCode: string;
  type: string;
  qntdAdultos: number;
  qntdCriancas: number;
  precoBase: number;
}

export interface IRoomResponse {
  count: number;
  rooms: IRooms[];
}
