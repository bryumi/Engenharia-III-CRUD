import { useMutation } from '@tanstack/react-query';
import api from '../api';
interface Props {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}
export const useActiveOrInactiveReservation = ({
  onSuccess,
  onError,
}: Props) => {
  return useMutation({
    mutationKey: ['active-or-inactive-reservation'],
    mutationFn: async ({
      documentId,
      bool,
    }: {
      documentId: string;
      bool: boolean;
    }) => {
      let endpoint = '';
      if (bool) {
        endpoint = `reservations/${documentId}/inativar`;
      } else {
        endpoint = `reservations/${documentId}/ativar`;
      }
      await api.patch(endpoint);
    },
    onSuccess,
    onError,
  });
};
