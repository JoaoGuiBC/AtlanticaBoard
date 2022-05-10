import * as yup from 'yup';

export type SignInFormData = {
  email: string;
  password: string;
};

export const schema = yup.object({
  email: yup
    .string()
    .email('Informe um e-mail válido')
    .required('Campo obrigatório'),
  password: yup.string().required('Campo obrigatório'),
});
