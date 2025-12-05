/* eslint-disable react/jsx-no-useless-fragment */
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import { ISaleSchema, SaleSchema } from '@/validations/SaleSchema';
import Input2 from '@/componentes/Inputs/Input2/Input2';
import Button from '@/componentes/Button/Button';
import { InputSelect } from '@/componentes/Inputs/InputSelect/InputSelect';
import api from '@/services/api';
import { on } from 'events';

interface Props {
  onClose: () => void;
  onSave: () => void;
  formType?: 'create' | 'edit';
}

const ModalSale = ({ onClose, onSave, formType }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openSuccessModal, setOpenSuccessModal] = useState(false);
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<ISaleSchema>({
    mode: 'onChange',
    resolver: yupResolver(SaleSchema),
  });

  const onSubmit = async (form: ISaleSchema) => {
    try {
      setIsSubmitting(true);
      await api.post('/sales', {
        codigoSale: form.code,
        description: form.description,
        discountType: form.discountType.value,
        valor: form.discountPercentage ? Number(form.discountPercentage) : 0,
        acumulativa: form.cumulative.value === 'sim' ? true : false,
        validoAte: form.dateEnd,
      });
      onSave();
    } catch (error) {
      setOpenSuccessModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {
        <div className="fixed top-0 right-0 bottom-0 left-0 z-[999] flex items-center justify-center bg-[rgba(40,40,40,.3)]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white2 flex max-h-[90vh] w-full max-w-[470px] flex-col items-center justify-start gap-[24px] overflow-auto rounded-[12px] p-[24px]! shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)]"
          >
            <legend className={`text-[20px] font-semibold text-[#282828]`}>
              {formType === 'edit' ? 'Editar Promoção' : 'Cadastrar Promoção'}
            </legend>
            <div className="flex w-full flex-col items-end gap-[8px]">
              <Input2
                showPasswordButton
                label="Código"
                placeholder="Insira o código da promoção"
                autoComplete="off"
                style={{ textTransform: 'uppercase' }}
                {...register('code')}
                error={errors?.code?.message}
              />
            </div>
            <div className="flex w-full flex-col items-end gap-[8px]">
              <Input2
                showPasswordButton
                label="Descrição"
                placeholder="Insira a descrição da promoção"
                autoComplete="off"
                {...register('description')}
                error={errors?.description?.message}
              />
            </div>
            <div className="flex w-full flex-col items-end gap-[8px]">
              <Controller
                name="discountType"
                control={control}
                render={({ field, fieldState }) => (
                  <InputSelect
                    label="Tipo de desconto"
                    options={[
                      { value: 'percentual', label: 'Porcentagem' },
                      { value: 'valor_fixo', label: 'Valor Fixo' },
                      { value: 'diaria_gratis', label: 'Diária Grátis' },
                    ]}
                    value={field.value}
                    onChange={field.onChange}
                    error={fieldState.error?.message}
                  />
                )}
              />
            </div>
            <div className="flex w-full flex-col gap-[8px]">
              <Input2
                label="Porcentagem de desconto"
                placeholder="Insira a porcentagem de desconto"
                autoComplete="off"
                {...register('discountPercentage')}
                error={errors?.discountPercentage?.message}
              />
            </div>
            <div className="flex w-full flex-col items-end gap-[8px]">
              <Controller
                name="cumulative"
                control={control}
                render={({ field, fieldState }) => (
                  <InputSelect
                    label="A promoção é cumulativa?"
                    options={[
                      { label: 'Sim', value: 'sim' },
                      { label: 'não', value: 'Não' },
                    ]}
                    value={field.value}
                    onChange={field.onChange}
                    error={fieldState.error?.message}
                  />
                )}
              />
            </div>
            <Input2
              label="Validado até"
              type="date"
              placeholder="Selecione a data de término"
              autoComplete="off"
              {...register('dateEnd')}
              error={errors?.dateEnd?.message}
            />
            <div className="flex w-full items-center gap-[16px]">
              <Button
                type="button"
                buttonStyle="outline_primary"
                customClassNames="w-[203px]"
                onClick={onClose}
              >
                Voltar
              </Button>
              <Button
                type="submit"
                customClassNames="w-[203px]"
                disabled={isSubmitting}
              >
                Salvar
              </Button>
            </div>
          </form>
        </div>
      }
    </>
  );
};

export default ModalSale;
