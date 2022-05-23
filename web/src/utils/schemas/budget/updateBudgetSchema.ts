import * as yup from 'yup';

export type UpdateBudgetFormData = {
  color?: string;
  deadline?: string;
  discount?: number;
};

export const schema = yup.object({
  color: yup.string(),
  deadline: yup.string(),
  discount: yup
    .number()
    .transform((v, o) => (o === '' ? null : v))
    .nullable()
    .typeError('Informe um número válido'),
});
