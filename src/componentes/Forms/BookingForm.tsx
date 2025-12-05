import Button from '../Button/Button';
import Input2 from '../Inputs/Input2/Input2';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { InputSelect } from '../Inputs/InputSelect/InputSelect';
import {
  IStepTwoBookingFormSchema,
  StepTwoBookingFormSchema,
} from '@/validations/BookingSchema';
import { generateOptions } from '@/utils/generateOptions';
import { useOptionsRooms } from '@/services/rooms/list-rooms';
import { useOptionsSales } from '@/services/sales/list-sales';

const BookingForm = () => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<IStepTwoBookingFormSchema>({
    resolver: yupResolver(StepTwoBookingFormSchema),
    mode: 'onChange',
  });
  const watchNumChildren = watch('numberChildren');
  const onSubmit = (data: IStepTwoBookingFormSchema) => {
    console.log(data);
  };
  const { data: optionsRooms } = useOptionsRooms();
  const { data: optionsSales } = useOptionsSales();
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[32px]"
    >
      <div className="bg-white2 border-primary20 flex flex-col gap-[24px] rounded-[12px] border-1 p-[24px]!">
        <legend className="text-primary80 mb-[24px]! text-[18px] font-bold">
          Dados do quarto
        </legend>
        <fieldset className="grid grid-cols-4 gap-[24px]">
          <div className="max-w-[368px]">
            <Controller
              name="room"
              control={control}
              render={({ field, fieldState }) => (
                <InputSelect
                  label="Quarto"
                  options={optionsRooms || []}
                  value={field.value ?? null}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              )}
            />
          </div>
          <Input2
            type="date"
            maxwidthClassName="max-w-[368px]"
            label="Data de check-in"
            placeholder="Insira a data de check-in"
            {...register('checkInDate')}
          />
          <Input2
            type="date"
            maxwidthClassName="max-w-[368px]"
            label="Data de check-out"
            placeholder="Insira a data de check-out"
            {...register('checkOutDate')}
            error={errors?.checkOutDate?.message}
          />
          <div className="max-w-[368px]">
            <Controller
              name="numberAdults"
              control={control}
              render={({ field, fieldState }) => (
                <InputSelect
                  label="Quantidade de adultos"
                  options={generateOptions(1, 8)}
                  value={field.value ?? null}
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
                  label="Quantidade de crianças"
                  options={generateOptions(0, 8)}
                  value={field.value ?? null}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              )}
            />
          </div>
          {watchNumChildren && Number(watchNumChildren.value) > 0 && (
            <>
              {[...Array(Number(watchNumChildren.value)).keys()].map(index => (
                <div key={index}>
                  <Controller
                    name={`childrenAges.${index}`}
                    control={control}
                    render={({ field, fieldState }) => (
                      <InputSelect
                        label={`Idade da criança ${index + 1}`}
                        options={generateOptions(0, 18)}
                        value={field.value || null}
                        onChange={field.onChange}
                        error={fieldState.error?.message}
                      />
                    )}
                  />
                </div>
              ))}
            </>
          )}
        </fieldset>
        <hr className="text-primary20" />
        <legend className="text-primary80 mb-[24px]! text-[18px] font-bold">
          Dados de cancelamento
        </legend>
        <fieldset className="grid grid-cols-4 gap-[24px]">
          <Input2
            maxwidthClassName="max-w-[368px]"
            label="Descrição do cancelamento"
            placeholder="Insira a descrição do cancelamento"
            {...register('cancelDescription')}
            error={errors?.cancelDescription?.message}
          />
          <Input2
            maxwidthClassName="max-w-[368px]"
            label="Porcentagem de multa por cancelamento"
            placeholder="Insira a porcentagem de multa por cancelamento"
            {...register('percentageCancel')}
            error={errors?.percentageCancel?.message}
          />
        </fieldset>
        <hr className="text-primary20" />
        <legend className="text-primary80 mb-[24px]! text-[18px] font-bold">
          Promoção
        </legend>
        <fieldset className="grid grid-cols-4 gap-[24px]">
          <div className="max-w-[368px]">
            <Controller
              name="sale"
              control={control}
              render={({ field, fieldState }) => (
                <InputSelect
                  label="Promoção"
                  options={optionsSales || []}
                  value={field.value ?? null}
                  onChange={field.onChange}
                  error={fieldState.error?.message}
                />
              )}
            />
          </div>
        </fieldset>
      </div>
      <div className="flex items-center justify-end">
        <Button type="submit" customClassNames="w-[200px]">
          Salvar
        </Button>
      </div>
    </form>
  );
};

export default BookingForm;
