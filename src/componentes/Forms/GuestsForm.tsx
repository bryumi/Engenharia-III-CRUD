import Button from '../Button/Button';
import Input2 from '../Inputs/Input2/Input2';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  IBookingSchema,
  IStepOneGuestFormSchema,
  StepOneGuestFormSchema,
} from '@/validations/BookingSchema';
import { maskCEP, maskCPF, maskDate, maskPhone } from '@/utils/masks';

interface IGuestsFormProps {
  onNextStep: (data: Partial<IBookingSchema>) => void;
}
const GuestsForm = ({ onNextStep }: IGuestsFormProps) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<IStepOneGuestFormSchema>({
    resolver: yupResolver(StepOneGuestFormSchema),
    mode: 'onChange',
  });
  const getCepData = async (cep: string) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data) {
        setValue('street', data.logradouro);
        setValue('neighborhood', data.bairro);
        setValue('city', data.localidade);
        setValue('state', data.uf);
        trigger(['street', 'neighborhood', 'city', 'state']);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleCepInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    let numericValue = getValues('cep') || '';
    numericValue = numericValue.replace('-', '');
    if (numericValue.length === 8) {
      getCepData(numericValue);
    } else {
      setValue('street', '');
      setValue('neighborhood', '');
      setValue('city', '');
      setValue('state', null as any);
      trigger(['street', 'neighborhood', 'city', 'state']);
    }
  };
  const onSubmit = (data: IStepOneGuestFormSchema) => {
    console.log(data);
    onNextStep(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[32px]"
    >
      <div className="bg-white2 border-primary20 flex flex-col gap-[24px] rounded-[12px] border-1 p-[24px]!">
        <legend className="text-primary80 mb-[24px]! text-[18px] font-bold">
          Dados do hóspede
        </legend>
        <fieldset className="grid grid-cols-4 gap-[24px]">
          <Input2
            maxwidthClassName="max-w-[368px]"
            label="Nome completo"
            placeholder="Insira o nome completo"
            {...register('fullName')}
            error={errors?.fullName?.message}
          />
          <Input2
            maxwidthClassName="max-w-[368px]"
            maskFunction={maskDate}
            label="Data de nascimento"
            placeholder="Insira a data de nascimento"
            {...register('birthDate')}
            error={errors?.birthDate?.message}
          />
          <Input2
            maxwidthClassName="max-w-[368px]"
            label="CPF"
            placeholder="Insira o CPF"
            maskFunction={maskCPF}
            {...register('cpf')}
            error={errors?.cpf?.message}
          />
          <Input2
            maxwidthClassName="max-w-[368px]"
            label="E-mail"
            placeholder="Insira o e-mail"
            {...register('email')}
            error={errors?.email?.message}
          />
          <Input2
            maxwidthClassName="max-w-[368px]"
            label="Telefone"
            maskFunction={maskPhone}
            placeholder="Insira o telefone"
            {...register('phone')}
            error={errors?.phone?.message}
          />
        </fieldset>
        <hr className="text-primary20" />
        <legend className="text-primary80 mb-[24px]! text-[18px] font-bold">
          Endereço
        </legend>
        <fieldset className="grid grid-cols-4 gap-[24px]">
          <Input2
            maxwidthClassName="max-w-[368px]"
            label="CEP"
            maskFunction={maskCEP}
            placeholder="Insira o CEP"
            {...register('cep', {
              onChange: handleCepInput,
            })}
            error={errors?.cep?.message}
          />
          <Input2
            maxwidthClassName="max-w-[368px]"
            label="Bairro"
            placeholder="Insira o bairro"
            {...register('neighborhood')}
            error={errors?.neighborhood?.message}
          />
          <Input2
            maxwidthClassName="max-w-[368px]"
            label="Rua"
            placeholder="Insira a rua"
            {...register('street')}
            error={errors?.street?.message}
          />
          <Input2
            maxwidthClassName="max-w-[368px]"
            label="Número"
            placeholder="Insira o número"
            {...register('number')}
            error={errors?.number?.message}
          />
          <Input2
            maxwidthClassName="max-w-[368px]"
            label="Cidade"
            placeholder="Insira a cidade"
            {...register('city')}
            error={errors?.city?.message}
          />
          <Input2
            maxwidthClassName="max-w-[368px]"
            label="Estado"
            placeholder="Insira o estado"
            {...register('state')}
            error={errors?.state?.message}
          />
          <Input2
            maxwidthClassName="max-w-[368px]"
            label="Complemento"
            placeholder="Insira o complemento"
            {...register('complement')}
            error={errors?.complement?.message}
          />
        </fieldset>
      </div>
      <div className="flex items-center justify-end">
        <Button type="submit" customClassNames="w-[200px]">
          Próximo
        </Button>
      </div>
    </form>
  );
};

export default GuestsForm;
