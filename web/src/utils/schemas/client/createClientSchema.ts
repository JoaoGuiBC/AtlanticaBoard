import * as yup from 'yup';

export type CreateClientFormData = {
  name: string;
  email: string;
  contact?: string;
  phoneNumber?: string;
  document: string;
  stateRegistration?: string;
  street: string;
  number?: number;
  state?: string;
  city?: string;
  district?: string;
  cep?: string;
};

export const schema = yup.object({
  name: yup.string().required('Campo obrigatório'),
  email: yup
    .string()
    .email('Informe um e-mail válido')
    .required('Campo obrigatório'),
  contact: yup
    .string()
    .transform((v, o) => (o === '' ? null : v))
    .nullable(),
  phoneNumber: yup
    .string()
    .transform((v, o) => (o === '' ? null : v))
    .nullable(),
  document: yup.string().required('Campo obrigatório'),
  stateRegistration: yup
    .string()
    .transform((v, o) => (o === '' ? null : v))
    .nullable(),
  street: yup.string().required('Campo obrigatório'),
  number: yup
    .number()
    .transform((v, o) => (o === '' ? null : v))
    .nullable()
    .typeError('Informe um número válido'),
  state: yup
    .string()
    .max(2, 'Informe apenas a UF do estado')
    .transform((v, o) => (o === '' ? null : v))
    .nullable(),
  city: yup
    .string()
    .transform((v, o) => (o === '' ? null : v))
    .nullable(),
  district: yup
    .string()
    .transform((v, o) => (o === '' ? null : v))
    .nullable(),
  cep: yup
    .string()
    .transform((v, o) => (o === '' ? null : v))
    .nullable(),
});
