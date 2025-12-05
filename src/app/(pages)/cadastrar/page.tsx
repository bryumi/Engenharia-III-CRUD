'use client';

import BookingForm from '@/componentes/Forms/BookingForm';
import GuestsForm from '@/componentes/Forms/GuestsForm';
import Modal from '@/componentes/Modals/Modal/Modal';
import Step from '@/componentes/Step/Step';
import Title from '@/componentes/Title/Title';
import api from '@/services/api';
import handleError from '@/utils/handleToast';
import { dateISO } from '@/utils/masks';
import { IBookingSchema } from '@/validations/BookingSchema';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';

const BookingsRegisterPage = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<IBookingSchema | null>(null);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const handleSaveStepOne = (data: Partial<IBookingSchema>) => {
    setFormData(prev => ({ ...prev, ...data }) as IBookingSchema);
    setStep(prev => prev + 1);
  };
  const handleConfirmSave = async (data: Partial<IBookingSchema>) => {
    try {
      setIsSubmitting(true);
      const finalData = { ...formData, ...data } as IBookingSchema;
      const responseGuests = await api.post('/guests', {
        name: finalData.fullName,
        dateBirth: dateISO(finalData.birthDate),
        cpf: finalData.cpf,
        phone: finalData.phone,
        email: finalData.email,
        isActive: true,
        addresses: [
          {
            cep: finalData.cep,
            street: finalData.street,
            neighborhood: finalData.neighborhood,
            number: finalData.number,
            city: finalData.city,
            state: finalData.state,
            obs: finalData.complement,
          },
        ],
      });
      const guestId = responseGuests.data.guest.id;
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
        <div
          className={twMerge(
            'before:bg-primary40 after:bg-primary relative mx-auto! flex w-full max-w-[800px] justify-between before:absolute before:top-[25%] before:h-[3px] before:w-full after:absolute after:top-[25%] after:h-[3px] after:transition-all after:duration-500 after:ease-in-out',
            step === 0
              ? 'after:w-[0%]'
              : step === 1
                ? 'after:w-[50%]'
                : 'after:w-full',
          )}
        >
          <Step
            state={step > 0 ? 'bigger' : step === 0 ? 'equal' : 'smaller'}
            text="1"
            description="Dados do hóspede"
          />
          <Step
            state={step > 1 ? 'bigger' : step === 1 ? 'equal' : 'smaller'}
            text="2"
            description="Dados da reserva"
          />
        </div>
        {step === 0 && <GuestsForm onNextStep={handleSaveStepOne} />}
        {step === 1 && <BookingForm />}
      </div>
    </>
  );
};

export default BookingsRegisterPage;
