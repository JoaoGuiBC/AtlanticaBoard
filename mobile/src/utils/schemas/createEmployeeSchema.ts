import * as yup from 'yup';

export type CreateEmployeeFormData = {
  email: string;
  name: string;
  password: string;
  confirm_password: string;
};

export const schema = yup.object({
  email: yup
    .string()
    .email('Informe um e-mail válido')
    .required('Campo obrigatório'),
  name: yup.string().required('Campo obrigatório'),
  password: yup
    .string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .required('Campo obrigatório'),
  confirm_password: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Senhas devem ser iguais')
    .required('Campo obrigatório'),
});
