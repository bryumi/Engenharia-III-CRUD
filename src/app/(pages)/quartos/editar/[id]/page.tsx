'use client';

import RoomForm from '@/componentes/Forms/RoomForm';
import Modal from '@/componentes/Modals/Modal/Modal';
import Title from '@/componentes/Title/Title';
import api from '@/services/api';
import { useListRooms } from '@/services/rooms/list-rooms';
import handleError, { handleSuccess } from '@/utils/handleToast';
import { unmaskCurrency } from '@/utils/masks';
import { IRoomFormSchema } from '@/validations/RoomSchema';
import { useQueryClient } from '@tanstack/react-query';
import { set } from 'date-fns';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';

const RoomsRegisterPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const router = useRouter();
  const { id } = useParams();
  const { data: roomsData, isLoading } = useListRooms();
  const queryClient = useQueryClient();

  const roomToEdit = roomsData?.rooms.find(room => room.id === id);
  const handleSaveRoom = async (data: IRoomFormSchema) => {
    try {
      setIsSubmitting(true);
      console.log('Dados para salvar o quarto editado:', data);
      const response = await api.put(`rooms/${id}`, {
        type: data.type.value,
        qntdAdultos: Number(data.numberAdults.value),
        qntdCriancas: Number(data.numberChildren.value),
        precoBase: unmaskCurrency(data.price),
        isActive: true,
      });
      console.log('Quarto editado com sucesso:', response.data);
      setOpenSuccessModal(true);
      queryClient.invalidateQueries({
        queryKey: ['list-rooms'],
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
          message2="Quarto editado com sucesso!"
          buttons={[
            {
              text: 'Voltar',
              onClick: () => router.push('/quartos'),
            },
          ]}
        />
      )}
      <div className="flex flex-col gap-[32px]">
        <Title onBack={() => router.push('/quartos')}>Editar quarto</Title>
        {isLoading && !roomToEdit ? (
          <p>Carregando...</p>
        ) : (
          <RoomForm
            onSave={handleSaveRoom}
            formData={roomToEdit}
            formType="edit"
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </>
  );
};

export default RoomsRegisterPage;
