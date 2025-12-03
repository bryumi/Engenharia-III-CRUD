/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/componentes/Button/Button';
import { mockRooms } from '@/data/mockRooms';
import Title from '@/componentes/Title/Title';
import Modal from '@/componentes/Modals/Modal/Modal';
import TableComponent, { IRow } from '@/componentes/Tables/TableComponent';

const dataToRow = (data: any[]) => {
  return data?.map(item => ({
    id: item?.id,
    active: item?.status === 'disponível',
    data: [
      { text: item?.code },
      { text: item?.name },
      { text: item?.capacidade },
      {
        text: item?.status,
        customClassNames: item.status === 'ocupado' ? 'text-red-500' : '',
      },
    ],
  })) as IRow[];
};
const PromotionsPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [openSwitchModal, setOpenSwitchModal] = useState(false);
  const [openSwitchSuccessModal, setOpenSwitchSuccessModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openDeleteSuccessModal, setOpenDeleteSuccessModal] = useState(false);

  const handleDelete = (id: string) => {
    // setSelectedItem({ id });
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    // if (selectedItem) {
    //   mutateDelete(selectedItem.id);
    // }
  };

  const handleSwitchModal = (id: string, bool: boolean) => {
    // setSelectedItem({ id, bool });
    setOpenSwitchModal(true);
  };

  const handleToggle = () => {
    // if (selectedItem) {
    //   mutateSwitch({
    //     documentId: selectedItem.id,
    //     bool: !selectedItem.bool,
    //   });
    // }
  };

  const handleCloseSwitchSuccessModal = () => {
    // setSelectedItem(undefined);
    setOpenSwitchSuccessModal(false);
  };

  return (
    <div className="flex flex-col gap-[32px]">
      {openDeleteSuccessModal && (
        <Modal
          modalType="success"
          message1="Sucesso!"
          message2="Funcionário excluído com sucesso!"
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
            'Você está prestes a excluir permanentemente o\nfuncionário. Esta ação não poderá ser desfeita.'
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
      <div className="flex items-center justify-between">
        <Title>Reservas</Title>
        <Button
          type="button"
          customClassNames="min-w-[200px]"
          onClick={() => router.push('/cadastrar')}
        >
          Cadastrar
        </Button>
      </div>
      <TableComponent
        headers={[
          { name: 'CÓDIGO' },
          { name: 'NOME DO QUARTO' },
          { name: 'CAPACIDADE' },
          { name: 'STATUS' },
        ]}
        rows={dataToRow(mockRooms)}
        page={currentPage}
        setPage={setCurrentPage}
        total={mockRooms.length || 0}
        pageSize={6}
        pageCount={1}
        handleDelete={handleDelete}
        handleToggle={handleSwitchModal}
      />
    </div>
  );
};

export default PromotionsPage;
