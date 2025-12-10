'use client';

import BookingForm from '@/componentes/Forms/BookingForm';
import GuestsForm from '@/componentes/Forms/GuestsForm';
import Modal from '@/componentes/Modals/Modal/Modal';
import Step from '@/componentes/Step/Step';
import Title from '@/componentes/Title/Title';
import api from '@/services/api';
import handleError from '@/utils/handleToast';
import { dateISO } from '@/utils/masks';
import { IBookingFormSchema } from '@/validations/BookingSchema';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

const BookingsRegisterPage = () => {
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const queryClient = useQueryClient();
  const handleConfirmSave = async (data: IBookingFormSchema) => {
    try {
      setIsSubmitting(true);
      let ageArray: (number | null | string | undefined)[] = [];
      if (
        data.childrenAges !== undefined &&
        data.childrenAges !== null &&
        data.childrenAges.length > 0
      ) {
        ageArray = data?.childrenAges.map(age => age?.value);
      }
      const bookingPayload = {
        guestId: data.guest.value,
        roomId: data.room.value,
        dateStart: data.checkInDate,
        dateEnd: data.checkOutDate,
        qntAdults: data.numberAdults.value,
        qntChildren: data.numberChildren.value,
        sale: data.sale?.value || null,
        childrenAges: ageArray || [],
      };
      const reservationResponse = await api.post(
        '/reservations',
        bookingPayload,
      );
      const reservationId = reservationResponse.data.reservation.id;
      await api.post('/payments', {
        reservationId: reservationId,
        price: reservationId.totalPrice,
      });
      await queryClient.invalidateQueries({ queryKey: ['list-reservations'] });
      setOpenSuccessModal(true);
    } catch (error) {
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      {openSuccessModal && (
        <Modal
          modalType="success"
          message1="Sucesso!"
          message2="Reserva cadastrada com sucesso!"
          buttons={[
            {
              text: 'Voltar',
              onClick: () => setOpenSuccessModal(false),
            },
          ]}
        />
      )}
      <div className="flex flex-col gap-[32px]">
        <Title onBack={() => router.push('/')}>Cadastro de reserva</Title>
        <BookingForm onSave={handleConfirmSave} />
      </div>
    </>
  );
};

export default BookingsRegisterPage;
