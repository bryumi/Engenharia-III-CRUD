import api from '@/services/api';
import { useMutation } from '@tanstack/react-query';

interface Props {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}

export const useDeleteRoom = ({ onSuccess, onError }: Props) => {
  return useMutation({
    mutationKey: ['delete-room'],
    mutationFn: async (documentId: string) => {
      await api.delete(`rooms/${documentId}`);
    },
    onSuccess,
    onError,
  });
};
