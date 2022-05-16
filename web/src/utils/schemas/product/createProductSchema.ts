import * as yup from 'yup';

export type CreateProductFormData = {
  name: string;
  price: number;
  cost?: number;
  description?: string;
};

export const schema = yup.object({
  name: yup.string().required('Campo obrigatório'),
  price: yup
    .number()
    .transform((v, o) => (o === '' ? null : v))
    .required('Campo obrigatório')
    .typeError('Informe um número válido'),
  cost: yup
    .number()
    .transform((v, o) => (o === '' ? null : v))
    .nullable()
    .typeError('Informe um número válido'),
  description: yup
    .string()
    .transform((v, o) => (o === '' ? null : v))
    .nullable(),
});
