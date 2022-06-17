import * as yup from 'yup';

export type UpdateProductFormData = {
  price: number;
  cost?: number;
  description?: string;
};

export const schema = yup.object({
  price: yup
    .number()
    .transform((_, value) => {
      if (value.includes('.')) {
        return +value;
      }
      return +value.replace(/,/, '.');
    })
    .required('Campo obrigatório')
    .positive('Campo obrigatório')
    .typeError('Informe um número válido'),
  cost: yup
    .number()
    .transform((_, value) => {
      if (value.includes('.')) {
        return +value;
      }
      return +value.replace(/,/, '.');
    })
    .nullable()
    .typeError('Informe um número válido'),
  description: yup
    .string()
    .transform((v, o) => (o === '' ? null : v))
    .nullable(),
});
