/* eslint-disable react/button-has-type */

/* eslint-disable @next/next/no-img-element */
import { twMerge } from 'tailwind-merge';

interface Props {
  maxwidthClassname?: string;
  modalType?: 'success' | 'alert' | 'warning';
  message1?: string;
  message2?: string;
  buttons: IButton[];
}

interface IButton {
  type?: 'button' | 'submit' | 'reset';
  text: string;
  onClick?: () => void;
}

const Modal = ({
  maxwidthClassname = 'max-w-[29.375rem]',
  modalType = 'success',
  message1,
  message2,
  buttons,
}: Props) => {
  const types = {
    success: {
      img: '/img/icons/success.svg',
      color: 'bg-success2',
      buttonBackgroundColor: 'bg-success',
      buttonHoverBackgroundColor: 'hover:bg-[#1D4622]',
      buttonHoverBackgroundColor2: 'hover:bg-white2',
      buttonTextColor: 'text-success',
      buttonBorderColor: 'border-success',
      buttonHoverBorderColor: 'hover:border-[#1D4622]',
    },
    alert: {
      img: '/img/icons/alert.svg',
      color: 'bg-alert2',
      buttonBackgroundColor: 'bg-alert',
      buttonHoverBackgroundColor: 'hover:bg-[#756430]',
      buttonHoverBackgroundColor2: 'hover:bg-[#FFFACB]',
      buttonTextColor: 'text-alert',
      buttonBorderColor: 'border-alert',
      buttonHoverBorderColor: 'hover:border-[#756430]',
    },
    warning: {
      img: '/img/icons/warning.svg',
      color: 'bg-warning2',
      buttonBackgroundColor: 'bg-warning',
      buttonHoverBackgroundColor: 'hover:bg-[#772121]',
      buttonHoverBackgroundColor2: 'hover:bg-white2',
      buttonTextColor: 'text-warning',
      buttonBorderColor: 'border-warning',
      buttonHoverBorderColor: 'hover:border-[#772121]',
    },
  };

  return (
    <div className="fixed top-0 right-0 bottom-0 left-0 z-[999] flex items-center justify-center bg-[rgba(0,0,0,.5)]">
      <div
        className={twMerge(
          `bg-white2 flex w-full flex-col items-center justify-center gap-[16px] rounded-[12px] p-[24px]! shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)]`,
          maxwidthClassname,
        )}
      >
        <div
          className={`h-[44px] w-[44px] rounded-full ${types[modalType].color} flex items-center justify-center`}
        >
          <img
            width={24}
            height={24}
            src={types[modalType].img}
            alt={modalType}
          />
        </div>
        {message1 && (
          <p className={`text-[20px] font-semibold text-[#282828]`}>
            {message1}
          </p>
        )}
        {message2 && (
          <p
            className={twMerge(
              'text-center text-[16px] font-normal whitespace-break-spaces text-[#5F6980]',
            )}
          >
            {message2}
          </p>
        )}
        <div className="flex w-full items-center gap-[16px]">
          {buttons.map((button, index) => (
            <button
              key={index}
              type={button.type || 'button'}
              onClick={button.onClick}
              className={twMerge(
                `h-[40px] w-full rounded-[8px] border-1 text-[16px] font-bold whitespace-nowrap`,
                types[modalType].buttonBorderColor,
                buttons.length - 1 === index
                  ? `text-white2 ${types[modalType].buttonBackgroundColor} ${types[modalType].buttonHoverBackgroundColor} ${types[modalType].buttonHoverBorderColor}`
                  : `${types[modalType].buttonTextColor} bg-white2 ${types[modalType].buttonHoverBackgroundColor2} ${types[modalType].buttonBorderColor}`,
              )}
            >
              {button.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
