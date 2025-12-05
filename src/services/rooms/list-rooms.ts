import { keepPreviousData, useQuery } from '@tanstack/react-query';
import api from '../api';
import { IRoomResponse } from '@/@types/rooms.interface';

export const useListRooms = (params?: any) => {
  return useQuery({
    queryKey: ['list-rooms', params],
    queryFn: async () => {
      const { data } = await api.get<IRoomResponse>('/rooms', {
        params,
      });
      return data;
    },
    placeholderData: keepPreviousData,
  });
};
export const useOptionsRooms = (params?: any) => {
  return useQuery({
    queryKey: ['list-rooms-options', params],
    queryFn: async () => {
      const { data } = await api.get<IRoomResponse>('/rooms', {
        params,
      });
      return mapRoomsToOptions(data);
    },
    placeholderData: keepPreviousData,
  });
};

const mapRoomsToOptions = (rooms: IRoomResponse) => {
  return rooms.rooms.map(room => ({
    label: `Quarto ${room.roomCode} - ${room.type}`,
    value: room.id,
  }));
};
