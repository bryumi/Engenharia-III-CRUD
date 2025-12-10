/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/componentes/Button/Button';
import Title from '@/componentes/Title/Title';
import Modal from '@/componentes/Modals/Modal/Modal';
import TableComponent, { IRow } from '@/componentes/Tables/TableComponent';
import { useListRooms } from '@/services/rooms/list-rooms';
import { IRooms } from '@/@types/rooms.interface';
import { currencyMask } from '@/utils/masks';
import { useQueryClient } from '@tanstack/react-query';
import handleError from '@/utils/handleToast';
import { useActiveOrInactiveRoom } from '@/services/rooms/toogle-status-room';
import { useDeleteRoom } from '@/services/rooms/delete-room';

const dataToRow = (data: IRooms[]) => {
  return data?.map(item => ({
    id: item?.id,
    active: item?.isActive !== true,
    data: [
      { text: item?.roomCode || '-' },
      { text: item?.type || '-' },
      { text: item?.qntdAdultos || '-' },
      { text: item?.qntdCriancas || '-' },
      { text: currencyMask(item?.precoBase) || '-' },
    ],
  })) as IRow[];
};
const RoomsPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [openSwitchModal, setOpenSwitchModal] = useState(false);
  const [openSwitchSuccessModal, setOpenSwitchSuccessModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openDeleteSuccessModal, setOpenDeleteSuccessModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<
    { id: string; bool: boolean } | undefined
  >(undefined);
  const queryClient = useQueryClient();

  const { data: roomsData } = useListRooms();
  const { mutate: mutateSwitch } = useActiveOrInactiveRoom({
    onSuccess: () => {
      setOpenSwitchModal(false);
      setOpenSwitchSuccessModal(true);
      queryClient.invalidateQueries({
        queryKey: ['list-rooms'],
      });
    },
    onError: error => handleError(error),
  });
  const { mutate: mutateDelete } = useDeleteRoom({
    onSuccess: () => {
      setOpenDeleteModal(false);
      setOpenDeleteSuccessModal(true);
      setSelectedItem(undefined);
      queryClient.invalidateQueries({
        queryKey: ['list-rooms'],
      });
    },
    onError: error => handleError(error),
  });
  const handleDelete = (id: string) => {
    // setSelectedItem({ id });
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedItem) {
      mutateDelete(selectedItem.id);
    }
  };

  const handleSwitchModal = (id: string, bool: boolean) => {
    setSelectedItem({ id, bool });
    setOpenSwitchModal(true);
  };

  const handleToggle = () => {
    if (selectedItem) {
      console.log('Toggling item:', selectedItem);
      console.log('New isActive value:', !selectedItem.bool);
      mutateSwitch({
        documentId: selectedItem.id,
        bool: !selectedItem.bool,
      });
    }
  };

  const handleCloseSwitchSuccessModal = () => {
    // setSelectedItem(undefined);
    setOpenSwitchSuccessModal(false);
  };
  const handleEdit = (id: string) => {
    router.push(`/quartos/editar/${id}`);
  };
  return (
    <div className="flex flex-col gap-[32px]">
      {openDeleteSuccessModal && (
        <Modal
          modalType="success"
          message1="Sucesso!"
          message2="Quarto excluído com sucesso!"
          buttons={[
            {
              text: 'Voltar',
              onClick: () => setOpenDeleteSuccessModal(false),
            },
          ]}
        />
      )}
      {openDeleteModal && (
        <Modal
          modalType="warning"
          message1="Atenção!"
          message2={
            'Você está prestes a excluir permanentemente o\nquarto. Esta ação não poderá ser desfeita.'
          }
          buttons={[
            {
              text: 'Cancelar',
              onClick: () => setOpenDeleteModal(false),
            },
            {
              text: 'Continuar',
              onClick: handleConfirmDelete,
            },
          ]}
        />
      )}
      {openSwitchModal && selectedItem && (
        <Modal
          modalType="alert"
          message1="Atenção!"
          message2={
            !selectedItem?.bool
              ? 'Você está prestes a desativar o quarto da lista. Tem\ncerteza que deseja continuar?'
              : 'Você está prestes a ativar o quarto da lista. Tem\ncerteza que deseja continuar?'
          }
          buttons={[
            {
              text: 'Cancelar',
              onClick: () => setOpenSwitchModal(false),
            },
            {
              text: 'Continuar',
              onClick: handleToggle,
            },
          ]}
        />
      )}
      {openSwitchSuccessModal && selectedItem && (
        <Modal
          modalType="success"
          message1="Sucesso!"
          message2={
            !selectedItem?.bool
              ? 'Quarto desativado com sucesso!'
              : 'Quarto ativado com sucesso!'
          }
          buttons={[
            {
              text: 'Voltar',
              onClick: handleCloseSwitchSuccessModal,
            },
          ]}
        />
      )}
      <div className="flex items-center justify-between">
        <Title>Quartos</Title>
        <Button
          type="button"
          customClassNames="min-w-[200px]"
          onClick={() => router.push('/quartos/cadastrar')}
        >
          Cadastrar
        </Button>
      </div>
      <TableComponent
        headers={[
          { name: 'CÓDIGO' },
          { name: 'NOME DO QUARTO' },
          { name: 'Qtd. ADULTOS' },
          { name: 'Qtd. CRIANÇAS' },
          { name: 'PREÇO BASE' },
        ]}
        rows={dataToRow(roomsData?.rooms || [])}
        page={currentPage}
        setPage={setCurrentPage}
        total={roomsData?.count || 0}
        pageSize={20}
        pageCount={1}
        handleDelete={handleDelete}
        handleToggle={handleSwitchModal}
        handleEdit={handleEdit}
      />
    </div>
  );
};

export default RoomsPage;
