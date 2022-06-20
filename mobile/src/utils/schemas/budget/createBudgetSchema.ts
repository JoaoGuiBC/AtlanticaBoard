import * as yup from 'yup';

export type CreateBudgetFormData = {
  clientId: string;
  color?: string;
  deadline?: string;
  discount?: number;
};

export const schema = yup.object({
  clientId: yup.string().required('Campo obrigatório'),
  color: yup.string(),
  deadline: yup.string(),
  discount: yup
    .number()
    .transform((_, value) => {
      if (value.includes('.')) {
        return +value;
      }
      return +value.replace(/,/, '.');
    })
    .nullable()
    .typeError('Informe um número válido'),
});
