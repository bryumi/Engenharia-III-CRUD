import api from '@/services/api';
import { useMutation } from '@tanstack/react-query';

interface Props {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useDeleteGuest = ({ onSuccess, onError }: Props) => {
  return useMutation({
    mutationKey: ['delete-guest'],
    mutationFn: async (documentId: string) => {
      await api.delete(`guests/${documentId}`);
    },
    onSuccess,
    onError,
  });
};
