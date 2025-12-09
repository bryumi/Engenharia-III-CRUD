import { useMutation } from '@tanstack/react-query';
import api from '../api';
interface Props {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}
export const useActiveOrInactiveGuest = ({ onSuccess, onError }: Props) => {
  return useMutation({
    mutationKey: ['active-or-inactive-guest'],
    mutationFn: async ({
      documentId,
      bool,
    }: {
      documentId: string;
      bool: boolean;
    }) => {
      let endpoint = '';
      if (bool) {
        endpoint = `guests/${documentId}/inativar`;
      } else {
        endpoint = `guests/${documentId}/ativar`;
      }
      await api.patch(endpoint);
    },
    onSuccess,
    onError,
  });
};
