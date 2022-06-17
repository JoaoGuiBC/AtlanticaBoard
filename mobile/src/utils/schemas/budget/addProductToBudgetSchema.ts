import * as yup from 'yup';

export type AddProductToBudgetData = {
  productId: string;
  base: number;
  height: number;
};

export const schema = yup.object({
  productId: yup.string().required('Campo obrigatório'),
  base: yup
    .number()
    .transform((v, o) => (o === '' ? null : v))
    .required('Campo obrigatório')
    .typeError('Informe um número válido'),
  height: yup
    .number()
    .transform((v, o) => (o === '' ? null : v))
    .required('Campo obrigatório')
    .typeError('Informe um número válido'),
});
