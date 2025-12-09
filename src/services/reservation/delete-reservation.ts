import api from '@/services/api';
import { useMutation } from '@tanstack/react-query';

interface Props {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useDeleteReservation = ({ onSuccess, onError }: Props) => {
  return useMutation({
    mutationKey: ['delete-reservation'],
    mutationFn: async (documentId: string) => {
      await api.delete(`reservations/${documentId}`);
    },
    onSuccess,
    onError,
  });
};
