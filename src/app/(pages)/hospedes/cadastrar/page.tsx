'use client';

import GuestsForm from '@/componentes/Forms/GuestsForm';
import Modal from '@/componentes/Modals/Modal/Modal';
import Title from '@/componentes/Title/Title';
import api from '@/services/api';
import handleError from '@/utils/handleToast';
import { dateISO } from '@/utils/masks';
import { IStepOneGuestFormSchema } from '@/validations/GuestsSchema';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const GuestRegister = () => {
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleConfirmSave = async (data: IStepOneGuestFormSchema) => {
    try {
      setIsSubmitting(true);
      await api.post('/guests', {
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
      setOpenSuccessModal(true);
      queryClient.invalidateQueries({
        queryKey: ['list-guests', 'list-rooms-guests'],
      });
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
          message2="Hóspede cadastrado com sucesso!"
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
          Cadastro de hóspede
        </Title>
        <GuestsForm onNextStep={handleConfirmSave} />
      </div>
    </>
  );
};

export default GuestRegister;
