import Button from '../Button/Button';
import Input2 from '../Inputs/Input2/Input2';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  dateBr,
  formatDate,
  maskCEP,
  maskCPF,
  maskDate,
  maskPhone,
} from '@/utils/masks';
import {
  IStepOneGuestFormSchema,
  StepOneGuestFormSchema,
} from '@/validations/GuestsSchema';
import { IGuest } from '@/@types/guests.interface';

interface IGuestDetailsProps {
  formType?: 'register' | 'edit';
  formData?: IGuest;
}
const GuestDetails = ({ formData }: IGuestDetailsProps) => {
  const formDefaultValues = formData
    ? {
        fullName: formData.name,
        birthDate: formatDate(formData.dateBirth),
        cpf: formData.cpf,
        email: formData.email,
        phone: formData.phone,
        cep: formData.addresses[0]?.cep,
        street: formData.addresses[0]?.street,
        neighborhood: formData.addresses[0]?.neighborhood,
        number: formData.addresses[0]?.number,
        city: formData.addresses[0]?.city,
        state: formData.addresses[0]?.state,
        complement: formData.addresses[0]?.obs,
      }
    : undefined;
  const {
    register,
    formState: { errors },
  } = useForm<IStepOneGuestFormSchema>({
    resolver: yupResolver(StepOneGuestFormSchema),
    mode: 'onChange',
    defaultValues: formDefaultValues,
  });
  return (
    <div className="flex flex-col gap-[32px]">
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
            disabled
          />
          <Input2
            maxwidthClassName="max-w-[368px]"
            maskFunction={maskDate}
            label="Data de nascimento"
            placeholder="Insira a data de nascimento"
            {...register('birthDate')}
            error={errors?.birthDate?.message}
            disabled
          />
          <Input2
            maxwidthClassName="max-w-[368px]"
            label="CPF"
            placeholder="Insira o CPF"
            maskFunction={maskCPF}
            {...register('cpf')}
            error={errors?.cpf?.message}
            disabled
          />
          <Input2
            maxwidthClassName="max-w-[368px]"
            label="E-mail"
            placeholder="Insira o e-mail"
            {...register('email')}
            error={errors?.email?.message}
            disabled
          />
          <Input2
            maxwidthClassName="max-w-[368px]"
            label="Telefone"
            maskFunction={maskPhone}
            placeholder="Insira o telefone"
            {...register('phone')}
            error={errors?.phone?.message}
            disabled
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
            {...register('cep')}
            error={errors?.cep?.message}
            disabled
          />
          <Input2
            maxwidthClassName="max-w-[368px]"
            label="Bairro"
            placeholder="Insira o bairro"
            {...register('neighborhood')}
            error={errors?.neighborhood?.message}
            disabled
          />
          <Input2
            maxwidthClassName="max-w-[368px]"
            label="Rua"
            placeholder="Insira a rua"
            {...register('street')}
            error={errors?.street?.message}
            disabled
          />
          <Input2
            maxwidthClassName="max-w-[368px]"
            label="Número"
            placeholder="Insira o número"
            {...register('number')}
            error={errors?.number?.message}
            disabled
          />
          <Input2
            maxwidthClassName="max-w-[368px]"
            label="Cidade"
            placeholder="Insira a cidade"
            {...register('city')}
            error={errors?.city?.message}
            disabled
          />
          <Input2
            maxwidthClassName="max-w-[368px]"
            label="Estado"
            placeholder="Insira o estado"
            {...register('state')}
            error={errors?.state?.message}
            disabled
          />
          <Input2
            maxwidthClassName="max-w-[368px]"
            label="Complemento"
            placeholder="Insira o complemento"
            {...register('complement')}
            error={errors?.complement?.message}
            disabled
          />
        </fieldset>
      </div>
    </div>
  );
};

export default GuestDetails;
