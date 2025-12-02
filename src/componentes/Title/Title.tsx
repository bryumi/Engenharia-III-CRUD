import React, { ReactNode, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import Modal from '../Modals/Modal/Modal';
import { ArrowBigLeft } from 'lucide-react';

interface Props {
  onBack?: () => void;
  showModal?: boolean;
  children: ReactNode;
}

const Title = ({ onBack, showModal = false, children }: Props) => {
  const [openAlertModal, setOpenAlertModal] = useState(false);
  return (
    <h1
      className={twMerge(
        'text-primary flex items-center gap-[8px] text-[24px] font-bold',
      )}
    >
      {openAlertModal && (
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
                if (onBack) {
                  onBack();
                }
                setOpenAlertModal(false);
              },
            },
          ]}
        />
      )}
      {onBack && (
        <button
          type="button"
          className="flex h-[10px] w-[20px] items-center justify-center"
          onClick={() =>
            showModal ? setOpenAlertModal(true) : onBack ? onBack() : undefined
          }
        >
          <ArrowBigLeft size={20} />
        </button>
      )}
      {children}
    </h1>
  );
};

export default Title;
