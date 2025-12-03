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
