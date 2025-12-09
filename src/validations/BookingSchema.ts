import { IOption } from '@/@types/option.interface';
import * as yup from 'yup';

export type IBookingFormSchema = yup.InferType<typeof BookingFormSchema>;

export const BookingFormSchema = yup.object({
  room: yup.mixed<IOption>().required('A seleção do quarto é obrigatória'),
  checkInDate: yup.date().required('A data de check-in é obrigatória'),
  checkOutDate: yup
    .date()
    .min(
      yup.ref('checkInDate'),
      'A data de check-out deve ser após a data de check-in',
    )
    .required('A data de check-out é obrigatória'),
  numberAdults: yup
    .mixed<IOption>()
    .required('A quantidade de adultos é obrigatória'),
  numberChildren: yup
    .mixed<IOption>()
    .required('A quantidade de crianças é obrigatória'),
  childrenAges: yup.array().of(yup.mixed<IOption>()).notRequired(),
  cancelDescription: yup.string().notRequired(),
  percentageCancel: yup.number().notRequired(),
  sale: yup.mixed<IOption>().notRequired(),
  guest: yup.mixed<IOption>().required('O hóspede é obrigatório'),
});
