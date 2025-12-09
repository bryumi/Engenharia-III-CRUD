'use client';

import { IGuest } from '@/@types/guests.interface';
import GuestDetails from '@/componentes/GuestDetails/GuestDetails';
import Modal from '@/componentes/Modals/Modal/Modal';
import Title from '@/componentes/Title/Title';
import { useListGuests } from '@/services/guests/list-guests';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

const GuestsEdit = () => {
  const [step, setStep] = useState(0);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);

  const router = useRouter();
  const { id } = useParams();
  const { data, isLoading, isError } = useListGuests();
  const guestData = data?.find((guest: IGuest) => guest.id === id);
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
        <Title onBack={() => router.push('/hospedes')}>
          Detalhes do hóspede
        </Title>
        {!isLoading && guestData && <GuestDetails formData={guestData} />}
      </div>
    </>
  );
};

export default GuestsEdit;
