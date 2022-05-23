import * as yup from 'yup';

export type UpdateClientFormData = {
  contact?: string;
  phoneNumber?: string;
  stateRegistration?: string;
  number?: number;
  state?: string;
  city?: string;
  district?: string;
  cep?: string;
  street: string;
};

export const schema = yup.object({
  contact: yup
    .string()
    .transform((v, o) => (o === '' ? null : v))
    .nullable(),
  phoneNumber: yup
    .string()
    .transform((v, o) => (o === '' ? null : v))
    .nullable(),
  stateRegistration: yup
    .string()
    .transform((v, o) => (o === '' ? null : v))
    .nullable(),
  number: yup
    .number()
    .transform((v, o) => (o === '' ? null : v))
    .nullable()
    .typeError('Informe um número válido'),
  street: yup.string().required('Campo obrigatório'),
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
