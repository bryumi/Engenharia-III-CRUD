'use client';

import { IGuest } from '@/@types/guests.interface';
import BookingForm from '@/componentes/Forms/BookingForm';
import GuestsForm from '@/componentes/Forms/GuestsForm';
import Modal from '@/componentes/Modals/Modal/Modal';
import Step from '@/componentes/Step/Step';
import Title from '@/componentes/Title/Title';
import api from '@/services/api';
import { useListGuests } from '@/services/guests/list-guests';
import handleError from '@/utils/handleToast';
import { dateISO } from '@/utils/masks';
import { IStepOneGuestFormSchema } from '@/validations/GuestsSchema';
import { useQueryClient } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

const GuestsEdit = () => {
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const { id } = useParams();
  const { data, isLoading, isError } = useListGuests();
  const guestData = data?.find((guest: IGuest) => guest.id === id);
  const queryClient = useQueryClient();
  const handleConfirmSave = async (data: IStepOneGuestFormSchema) => {
    try {
      setIsSubmitting(true);
      await api.put(`/guests/${id}`, {
        name: data.fullName,
        dateBirth: dateISO(data.birthDate),
        cpf: data.cpf,
        phone: data.phone,
        email: data.email,
        isActive: true,
        addresses: [
          {
            cep: data.cep,
            street: data.street,
            neighborhood: data.neighborhood,
            number: data.number,
            city: data.city,
            state: data.state,
            obs: data.complement,
          },
        ],
      });
      await queryClient.invalidateQueries({ queryKey: ['list-guests'] });
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
          message2="Hóspede editado com sucesso!"
          buttons={[
            {
              text: 'Voltar',
              onClick: () => router.push('/hospedes'),
            },
          ]}
        />
      )}
      <div className="flex flex-col gap-[32px]">
        <Title onBack={() => router.push('/hospedes')}>
          Editar dados do hóspede
        </Title>
        {!isLoading && guestData && (
          <GuestsForm
            onNextStep={handleConfirmSave}
            formData={guestData}
            formType="edit"
          />
        )}
      </div>
    </>
  );
};

export default GuestsEdit;
