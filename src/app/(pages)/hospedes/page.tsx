/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/componentes/Button/Button';
import Title from '@/componentes/Title/Title';
import Modal from '@/componentes/Modals/Modal/Modal';
import TableComponent, { IRow } from '@/componentes/Tables/TableComponent';
import { useListGuests } from '@/services/guests/list-guests';
import { IGuest } from '@/@types/guests.interface';
import { renderSlicedText } from '@/utils/slicedText';
import { useDeleteGuest } from '@/services/guests/delete-guest';
import { useQueryClient } from '@tanstack/react-query';

const dataToRow = (data: IGuest[]) => {
  return data?.map(item => ({
    id: item?.id,
    active: !item?.isActive === true,
    data: [
      { text: renderSlicedText(item?.name, 30) },
      { text: renderSlicedText(item?.email, 20) },
      { text: item?.addresses[0]?.state || '-' },
      { text: item?.addresses[0]?.city || '-' },
      {
        text: item?.isActive ? 'Ativo' : 'Inativo',
        customClassNames: item.isActive === false ? 'text-red-500' : '',
      },
    ],
  })) as IRow[];
};
const BookingsPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [openSwitchModal, setOpenSwitchModal] = useState(false);
  const [openSwitchSuccessModal, setOpenSwitchSuccessModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openDeleteSuccessModal, setOpenDeleteSuccessModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<
    { id: string; bool?: boolean } | undefined
  >(undefined);
  const { mutate: mutateDelete } = useDeleteGuest({
    onSuccess: () => {
      setOpenDeleteModal(false);
      setOpenDeleteSuccessModal(true);
      queryClient.invalidateQueries({
        queryKey: ['list-guests', 'list-rooms-guests'],
      });
    },
  });
  const { data, isLoading, isError } = useListGuests();
  const handleDelete = (id: string) => {
    setSelectedItem({ id });
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedItem) {
      mutateDelete(selectedItem.id);
    }
  };
  const handleEdit = (id: string) => {
    router.push(`/hospedes/${id}/editar`);
  };
  const handleView = (id: string) => {
    router.push(`/hospedes/${id}/detalhes`);
  };
  return (
    <div className="flex flex-col gap-[32px]">
      {openDeleteSuccessModal && (
        <Modal
          modalType="success"
          message1="Sucesso!"
          message2="Hóspede excluído com sucesso!"
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
            'Você está prestes a excluir permanentemente o\nhóspede. Esta ação não poderá ser desfeita.'
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
        <Title>Hóspedes</Title>
        <Button
          type="button"
          customClassNames="min-w-[200px]"
          onClick={() => router.push('/hospedes/cadastrar')}
        >
          Cadastrar
        </Button>
      </div>
      <TableComponent
        headers={[
          { name: 'NOME' },
          { name: 'EMAIL' },
          { name: 'ESTADO' },
          { name: 'CIDADE' },
          { name: 'STATUS' },
        ]}
        rows={dataToRow(data || [])}
        page={currentPage}
        setPage={setCurrentPage}
        total={data?.length || 0}
        pageSize={20}
        pageCount={1}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleView={handleView}
      />
    </div>
  );
};

export default BookingsPage;
