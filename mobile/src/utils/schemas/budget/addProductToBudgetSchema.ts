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
    .transform((_, value) => {
      if (value.includes('.')) {
        return +value;
      }
      return +value.replace(/,/, '.');
    })
    .required('Campo obrigatório')
    .positive('Campo obrigatório')
    .typeError('Informe um número válido'),
  height: yup
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
});
