/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/componentes/Button/Button';
import Title from '@/componentes/Title/Title';
import Modal from '@/componentes/Modals/Modal/Modal';
import TableComponent, { IRow } from '@/componentes/Tables/TableComponent';
import ModalSale from '@/componentes/Modals/ModalSale/ModalSale';
import { useListSales } from '@/services/sales/list-sales';
import { ISale } from '@/@types/sale.interface';

const dataToRow = (data: ISale[]) => {
  return data?.map(item => ({
    id: item?.id,
    data: [
      { text: item?.codigoSale },
      { text: item?.description },
      { text: item?.tipo },
      { text: item?.valor },
      { text: item?.validoAte },
    ],
  })) as IRow[];
};
const PromotionsPage = () => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openDeleteSuccessModal, setOpenDeleteSuccessModal] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const { data: salesData } = useListSales();

  const handleDelete = (id: string) => {
    // setSelectedItem({ id });
    setOpenDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    // if (selectedItem) {
    //   mutateDelete(selectedItem.id);
    // }
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
      {openSuccessModal && (
        <Modal
          modalType="success"
          message1="Sucesso!"
          message2="Dados cadastrados com sucesso!"
          buttons={[
            {
              text: 'Voltar',
              onClick: () => setOpenSuccessModal(false),
            },
          ]}
        />
      )}
      {openRegisterModal && (
        <ModalSale
          onClose={() => setOpenRegisterModal(false)}
          onSave={() => {
            setOpenRegisterModal(false);
            setOpenSuccessModal(true);
          }}
        />
      )}
      <div className="flex items-center justify-between">
        <Title>Promoções</Title>
        <Button
          type="button"
          customClassNames="min-w-[200px]"
          onClick={() => setOpenRegisterModal(true)}
        >
          Cadastrar
        </Button>
      </div>
      <TableComponent
        headers={[
          { name: 'CÓDIGO' },
          { name: 'DESCRIÇÃO' },
          { name: 'TIPO' },
          { name: 'DESCONTO' },
          { name: 'VÁLIDO ATÉ' },
        ]}
        rows={dataToRow(salesData?.sales || [])}
        page={currentPage}
        setPage={setCurrentPage}
        total={salesData?.count || 0}
        pageSize={10}
        pageCount={1}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default PromotionsPage;
