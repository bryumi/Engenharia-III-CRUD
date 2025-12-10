/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import React, { ChangeEvent, use, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/componentes/Button/Button';
import { mockRooms } from '@/data/mockRooms';
import Title from '@/componentes/Title/Title';
import Modal from '@/componentes/Modals/Modal/Modal';
import TableComponent, { IRow } from '@/componentes/Tables/TableComponent';
import { useListReservations } from '@/services/reservation/list-reservation';
import { IReservation } from '@/@types/reservation.interface';
import { dateBr } from '@/utils/masks';
import { useDeleteReservation } from '@/services/reservation/delete-reservation';
import { useQueryClient } from '@tanstack/react-query';
import { useActiveOrInactiveReservation } from '@/services/reservation/toogle-status-reservation';
import handleError from '@/utils/handleToast';

const dataToRow = (data: IReservation[]) => {
  return data?.map(item => ({
    id: item?.id,
    data: [
      { text: item?.codeReservation },
      { text: item?.qntAdults },
      { text: item?.qntChildren || '-' },
      { text: dateBr(item?.dateStart) },
      { text: dateBr(item?.dateEnd) },
    ],
  })) as IRow[];
};
const BookingsPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openDeleteSuccessModal, setOpenDeleteSuccessModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<
    { id: string; bool: boolean } | undefined
  >(undefined);

  const { data, isLoading, isError } = useListReservations();
  const { mutate: mutateDelete } = useDeleteReservation({
    onSuccess: () => {
      setOpenDeleteModal(false);
      setOpenDeleteSuccessModal(true);
      queryClient.invalidateQueries({ queryKey: ['list-reservations'] });
    },
  });
  const handleDelete = (id: string) => {
    setSelectedItem({ id, bool: false });
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedItem) {
      mutateDelete(selectedItem.id);
    }
  };
  return (
    <div className="flex flex-col gap-[32px]">
      {openDeleteSuccessModal && (
        <Modal
          modalType="success"
          message1="Sucesso!"
          message2="Reserva excluída com sucesso!"
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
            'Você está prestes a excluir permanentemente a \nreserva. Esta ação não poderá ser desfeita.'
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
          { name: 'QTD ADULTOS' },
          { name: 'QTD CRIANÇAS' },
          { name: 'DATA CHECK-IN' },
          { name: 'DATA CHECK-OUT' },
        ]}
        rows={dataToRow(data || [])}
        page={currentPage}
        setPage={setCurrentPage}
        total={data?.length || 0}
        pageSize={20}
        pageCount={1}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default BookingsPage;
