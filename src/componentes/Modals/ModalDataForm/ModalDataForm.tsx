/* eslint-disable react/jsx-no-useless-fragment */
import { fustat } from '@/styles/fonts';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import handleError from '@/utils/handleToast';
import Input2 from '@/components/Inputs/Input2/Input2';
import Button from '@/components/Buttons/Button/Button';
import { DataSchema, IDataForm } from '@/validations/DataSchema';
import { maskPhone } from '@/utils/masks';
import { useEditUserData } from '@/services/requests/settings/updateUserData';
import { useQueryClient } from '@tanstack/react-query';
import LoadingComponent from '@/components/LoadingComponent/LoadingComponent';
import Modal from '../Modal/Modal';

interface Props {
  formData?: IDataForm;
  onClose: () => void;
  docIdUser?: string;
}

const ModalDataForm = ({ formData, onClose, docIdUser }: Props) => {
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openAlertModal, setOpenAlertModal] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IDataForm>({
    mode: 'onChange',
    resolver: yupResolver(DataSchema),
    defaultValues: formData,
  });

  const { mutate, isPending } = useEditUserData({
    onSuccess: () => {
      setOpenConfirmModal(false);
      setOpenSuccessModal(true);
      queryClient.invalidateQueries({ queryKey: ['settings-data'] });
    },
    onError: error => handleError(error),
    docIdUser: docIdUser || '',
  });

  const onSubmit = async (form: IDataForm) => {
    mutate({
      name: form.name,
      phone: form.phone,
      email: form.email,
    });
  };

  return (
    <>
      {isPending && <LoadingComponent />}
      {openAlertModal ? (
        <Modal
          modalType="alert"
          message1="Atenção!"
          message2={
            'Caso volte, as informações que você preencheu não\nserão salvas. Tem certeza que deseja voltar?'
          }
          buttons={[
            {
              text: 'Cancelar',
              onClick: () => setOpenAlertModal(false),
            },
            {
              text: 'Continuar',
              onClick: () => {
                onClose();
                setOpenAlertModal(false);
              },
            },
          ]}
        />
      ) : openConfirmModal ? (
        <Modal
          modalType="alert"
          message1="Atenção!"
          message2="Você está prestes a alterar seus dados. Tem certeza que deseja continuar?"
          buttons={[
            {
              text: 'Cancelar',
              onClick: () => setOpenConfirmModal(false),
            },
            {
              text: 'Continuar',
              onClick: () => {
                handleSubmit(onSubmit)();
              },
            },
          ]}
        />
      ) : openSuccessModal ? (
        <Modal
          modalType="success"
          message1="Sucesso!"
          message2="Dados alterados com sucesso!"
          buttons={[
            {
              text: 'Voltar',
              onClick: onClose,
            },
          ]}
        />
      ) : (
        <div className="fixed top-0 right-0 bottom-0 left-0 z-[999] flex items-center justify-center bg-[rgba(40,40,40,.3)]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white2 flex w-full max-w-[470px] flex-col items-center justify-center gap-[24px] rounded-[12px] p-[24px]! shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)]"
          >
            <legend
              className={`${fustat.className} text-[20px] font-semibold text-[#282828]`}
            >
              Editar dados
            </legend>
            <div className="flex w-full flex-col items-end gap-[8px]">
              <Input2
                showPasswordButton
                label="Nome"
                placeholder="Insira seu nome"
                autoComplete="off"
                {...register('name')}
                error={errors?.name?.message}
              />
            </div>

            <div className="flex w-full flex-col gap-[8px]">
              <Input2
                type="phone"
                showPasswordButton
                label="Telefone"
                placeholder="Insira seu telefone"
                autoComplete="off"
                maskFunction={maskPhone}
                {...register('phone')}
                error={errors?.phone?.message}
              />
            </div>
            <Input2
              type="email"
              showPasswordButton
              label="E-mail"
              placeholder="Insira seu e-mail"
              autoComplete="off"
              disabled
              lock
              {...register('email')}
              error={errors?.email?.message}
            />
            <div className="flex w-full items-center gap-[16px]">
              <Button
                type="button"
                buttonStyle="outline_primary"
                customClassNames="w-[203px]"
                onClick={() => {
                  setOpenAlertModal(true);
                }}
              >
                Voltar
              </Button>
              <Button
                type="button"
                customClassNames="w-[203px]"
                onClick={() => setOpenConfirmModal(true)}
              >
                Salvar
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ModalDataForm;
