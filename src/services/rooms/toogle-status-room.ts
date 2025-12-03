import { useMutation } from '@tanstack/react-query';
import api from '../api';
interface Props {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}
export const useActiveOrInactiveRoom = ({ onSuccess, onError }: Props) => {
  return useMutation({
    mutationKey: ['active-or-inactive-room'],
    mutationFn: async ({
      documentId,
      bool,
    }: {
      documentId: string;
      bool: boolean;
    }) => {
      let endpoint = '';
      if (bool) {
        endpoint = `rooms/${documentId}/inativar`;
      } else {
        endpoint = `rooms/${documentId}/ativar`;
      }
      await api.patch(endpoint);
    },
    onSuccess,
    onError,
  });
};
