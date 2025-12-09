import { keepPreviousData, useQuery } from '@tanstack/react-query';
import api from '../api';

export const useListReservations = (params?: any) => {
  return useQuery({
    queryKey: ['list-reservations', params],
    queryFn: async () => {
      const { data } = await api.get('/reservations', {
        params,
      });
      return data.reservations;
    },
    placeholderData: keepPreviousData,
  });
};
