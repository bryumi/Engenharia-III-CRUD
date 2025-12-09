import { keepPreviousData, useQuery } from '@tanstack/react-query';
import api from '../api';

export const useListGuests = (params?: any) => {
  return useQuery({
    queryKey: ['list-guests', params],
    queryFn: async () => {
      const { data } = await api.get('/guests', {
        params,
      });
      return data.guests;
    },
    placeholderData: keepPreviousData,
  });
};
export const useOptionsGuests = (params?: any) => {
  return useQuery({
    queryKey: ['list-rooms-guests', params],
    queryFn: async () => {
      const { data } = await api.get('/guests', {
        params,
      });
      return mapRoomsToOptions(data.guests);
    },
    placeholderData: keepPreviousData,
  });
};

const mapRoomsToOptions = (data: any[]) => {
  return data.map(guest => ({
    label: guest.name,
    value: guest.id,
  }));
};
