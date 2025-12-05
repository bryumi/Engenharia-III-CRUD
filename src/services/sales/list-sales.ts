import { keepPreviousData, useQuery } from '@tanstack/react-query';
import api from '../api';
import { ISaleResponse } from '@/@types/sale.interface';

export const useListSales = (params?: any) => {
  return useQuery({
    queryKey: ['list-sales', params],
    queryFn: async () => {
      const { data } = await api.get<ISaleResponse>('/sales', {
        params,
      });
      return data;
    },
    placeholderData: keepPreviousData,
  });
};
export const useOptionsSales = (params?: any) => {
  return useQuery({
    queryKey: ['list-sales-options', params],
    queryFn: async () => {
      const { data } = await api.get<ISaleResponse>('/sales', {
        params,
      });
      return mapSalesToOptions(data);
    },
    placeholderData: keepPreviousData,
  });
};

const mapSalesToOptions = (sales: ISaleResponse) => {
  return sales.sales.map(sale => ({
    label: sale.codigoSale,
    value: sale.id,
  }));
};
