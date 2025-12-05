import { IOption } from '@/@types/option.interface';
import * as yup from 'yup';

const now = new Date();
now.setHours(0, 0, 0, 0);
export type ISaleSchema = yup.InferType<typeof SaleSchema>;

export const SaleSchema = yup.object({
  code: yup.string().required('O código é obrigatório'),
  cumulative: yup.mixed<IOption>().required('A cumulatividade é obrigatória'),
  description: yup.string().required('A descrição é obrigatória'),
  discountType: yup
    .mixed<IOption>()
    .required('O tipo de desconto é obrigatório'),
  discountPercentage: yup
    .number()
    .required('A porcentagem de desconto é obrigatória'),
  dateEnd: yup
    .date()
    .required('A data de término é obrigatória')
    .min(now, 'A data de término deve ser hoje ou no futuro'),
});
