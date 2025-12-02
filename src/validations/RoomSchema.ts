import { IOption } from '@/@types/option.interface';
import * as yup from 'yup';

export type IRoomFormSchema = yup.InferType<typeof RoomFormSchema>;

export const RoomFormSchema = yup.object({
  code: yup.string().required('O código é obrigatório'),
  type: yup.mixed<IOption>().required('O tipo de quarto é obrigatório'),
  numberChildren: yup
    .mixed<IOption>()
    .required('A quantidade de crianças é obrigatória'),
  numberAdults: yup
    .mixed<IOption>()
    .required('A quantidade de adultos é obrigatória'),
  price: yup.string().required('O preço é obrigatório'),
});
