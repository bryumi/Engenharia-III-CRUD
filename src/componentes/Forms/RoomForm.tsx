import { IRoomFormSchema, RoomFormSchema } from '@/validations/RoomSchema';
import Button from '../Button/Button';
import Input2 from '../Inputs/Input2/Input2';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputSelect } from '../Inputs/InputSelect/InputSelect';
import { currencyMask, maskMoney } from '@/utils/masks';
import { IRooms } from '@/@types/rooms.interface';
import { useEffect } from 'react';

interface IRoomFormProps {
  onSave?: (data: IRoomFormSchema) => void;
  formData?: IRooms;
  formType?: 'edit' | 'create';
  isSubmitting?: boolean;
}
const RoomForm = ({
  onSave,
  formData,
  formType = 'create',
  isSubmitting = false,
}: IRoomFormProps) => {
  const formDefaultValues =
    formType === 'edit'
      ? {
          price: formData ? currencyMask(formData.precoBase || 0) : '',
          numberAdults: formData
            ? {
                label: String(formData.qntdAdultos),
                value: String(formData.qntdAdultos),
              }
            : undefined,
          numberChildren: formData
            ? {
                label: String(formData.qntdCriancas),
                value: String(formData.qntdCriancas),
              }
            : undefined,
          type: formData
            ? { label: formData.type, value: formData.type }
            : undefined,
        }
      : undefined;
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<IRoomFormSchema>({
    resolver: yupResolver(RoomFormSchema),
    mode: 'onChange',
    defaultValues: formDefaultValues,
  });

  const onSubmit = (data: IRoomFormSchema) => {
    console.log(data);
    if (onSave) {
      onSave(data);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit, errs => console.log(errs))}
      className="flex flex-col gap-[32px]"
    >
      <div className="bg-white2 border-primary20 flex flex-col gap-[24px] rounded-[12px] border-1 p-[24px]!">
        <legend className="text-primary80 mb-[24px]! text-[18px] font-bold">
          Dados do quarto
        </legend>
        <fieldset className="grid grid-cols-4 gap-[24px]">
          <Input2
            maxwidthClassName="max-w-[368px]"
            label="Preço base"
            placeholder="Insira o preço base do quarto"
            maskFunction={maskMoney}
            {...register('price')}
            error={errors?.price?.message}
          />
          <div className="max-w-[368px]">
            <Controller
              name="numberAdults"
              control={control}
              render={({ field, fieldState }) => (
                <InputSelect
                  label="Número máximo de adultos"
                  options={[
                    { label: '1', value: '1' },
                    { label: '2', value: '2' },
                    { label: '3', value: '3' },
                    { label: '4', value: '4' },
                    { label: '5', value: '5' },
                    { label: '6', value: '6' },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              )}
            />
          </div>
          <div className="max-w-[368px]">
            <Controller
              name="numberChildren"
              control={control}
              render={({ field, fieldState }) => (
                <InputSelect
                  label="Número máximo de crianças"
                  options={[
                    { label: '0', value: '0' },
                    { label: '1', value: '1' },
                    { label: '2', value: '2' },
                    { label: '3', value: '3' },
                    { label: '4', value: '4' },
                    { label: '5', value: '5' },
                    { label: '6', value: '6' },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              )}
            />
          </div>
          <div className="max-w-[368px]">
            <Controller
              name="type"
              control={control}
              render={({ field, fieldState }) => (
                <InputSelect
                  label="Tipo de quarto"
                  options={[
                    { label: 'single', value: 'single' },
                    { label: 'double', value: 'double' },
                    { label: 'suite', value: 'suite' },
                  ]}
                  value={field.value}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              )}
            />
          </div>
        </fieldset>
        {/* <hr className="text-primary20" /> */}
      </div>
      <div className="flex items-center justify-end">
        <Button
          type="submit"
          customClassNames="w-[200px]"
          disabled={isSubmitting}
        >
          Salvar
        </Button>
      </div>
    </form>
  );
};

export default RoomForm;
