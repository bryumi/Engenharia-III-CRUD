import * as yup from 'yup';

export type IStepOneGuestFormSchema = yup.InferType<
  typeof StepOneGuestFormSchema
>;

export const StepOneGuestFormSchema = yup.object({
  fullName: yup.string().required('O nome completo é obrigatório'),
  birthDate: yup
    .string()
    .required('A data de nascimento é obrigatória')
    .test('data-valida', 'Data inválida', value => {
      if (!value) return false;

      const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;

      if (!regex.test(value)) return false;

      const [dia, mes, ano] = value.split('/').map(Number);

      const data = new Date(ano, mes - 1, dia);

      // Confirma se a data existe (ex: 31/02 deve falhar)
      if (
        data.getFullYear() !== ano ||
        data.getMonth() !== mes - 1 ||
        data.getDate() !== dia
      ) {
        return false;
      }

      return true;
    })
    .test('nao-futuro', 'A data não pode ser futura', value => {
      if (!value) return false;

      const [dia, mes, ano] = value.split('/').map(Number);
      const data = new Date(ano, mes - 1, dia);
      const hoje = new Date();

      return data <= hoje;
    })
    .test('maior-18', 'É necessário ter pelo menos 18 anos', value => {
      if (!value) return false;

      const [dia, mes, ano] = value.split('/').map(Number);
      const data = new Date(ano, mes - 1, dia);

      const hoje = new Date();
      const maior18 = new Date(
        hoje.getFullYear() - 18,
        hoje.getMonth(),
        hoje.getDate(),
      );

      return data <= maior18;
    }),
  cpf: yup
    .string()
    .required('O CPF é obrigatório')
    .matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'O CPF deve ser válido'),
  phone: yup
    .string()
    .required('O telefone é obrigatório')
    .matches(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'O telefone deve ser válido'),
  email: yup
    .string()
    .required('O email é obrigatório')
    .email('O email deve ser válido'),
  cep: yup.string().required('O CEP é obrigatório'),
  neighborhood: yup.string().required('O bairro é obrigatório'),
  street: yup.string().required('A rua é obrigatória'),
  number: yup.string().required('O número é obrigatório'),
  city: yup.string().required('A cidade é obrigatória'),
  state: yup.string().required('O estado é obrigatório'),
  complement: yup.string().notRequired(),
});
