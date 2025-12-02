'use client';

import RoomForm from '@/componentes/Forms/RoomForm';
import Title from '@/componentes/Title/Title';
import api from '@/services/api';
import { handleSuccess } from '@/utils/handleToast';
import { unmaskCurrency } from '@/utils/masks';
import { IRoomFormSchema } from '@/validations/RoomSchema';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const RoomsRegisterPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const handleSaveRoom = async (data: IRoomFormSchema) => {
    try {
      setIsSubmitting(true);
      const response = await api.post('/rooms', {
        type: data.type.value,
        qntdAdultos: Number(data.numberAdults.value),
        qntdCriancas: Number(data.numberChildren.value),
        precoBase: unmaskCurrency(data.price),
        isActive: true,
      });
      console.log('Quarto salvo com sucesso:', response.data);
      handleSuccess('Quarto salvo com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar o quarto:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="flex flex-col gap-[32px]">
      <Title onBack={() => router.push('/quartos')}>Cadastro de quarto</Title>
      <RoomForm onSave={handleSaveRoom} />
    </div>
  );
};

export default RoomsRegisterPage;
