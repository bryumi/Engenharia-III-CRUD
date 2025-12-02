import { keepPreviousData, useQuery } from '@tanstack/react-query';
import api from '../api';

export const useListRooms = (params?: any) => {
  return useQuery({
    queryKey: ['list-rooms', params],
    queryFn: async () => {
      const { data } = await api.get('/rooms', {
        params,
      });
      return data;
    },
    placeholderData: keepPreviousData,
  });
};
