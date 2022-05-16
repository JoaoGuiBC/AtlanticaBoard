import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { ApolloQueryResult } from '@apollo/client';
import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';

import { FieldMarker } from '@components/Form/FieldMarker';
import { Input } from '@components/Form/Input';

import {
  ListClientsQuery,
  useUpdateClientMutation,
} from '@graphql/generated/graphql';
import {
  UpdateClientFormData,
  schema,
} from '@utils/schemas/updateClientSchema';
import { useEffect } from 'react';
import { useAuth } from '@contexts/AuthContext';

type Address = {
  id: string;
  number?: number | undefined | null;
  street: string;
  state?: string | undefined | null;
  city?: string | undefined | null;
  district?: string | undefined | null;
  cep?: string | undefined | null;
};

export type Client = {
  id: string;
  name: string;
  contact?: string | undefined | null;
  email: string;
  phoneNumber?: string | undefined | null;
  document: string;
  stateRegistration?: string | undefined | null;
  address: Address[];
};

interface EditClientInfoModalProps {
  refetch: (variables?: any) => Promise<ApolloQueryResult<ListClientsQuery>>; // eslint-disable-line
  onClose: () => void;
  isOpen: boolean;
  client?: Client;
}

export function EditClientInfoModal({
  onClose,
  refetch,
  isOpen,
  client,
}: EditClientInfoModalProps) {
  const toast = useToast();
  const { user, logOut, revalidate } = useAuth();

  const [loadUpdate, { error, loading }] = useUpdateClientMutation({
    context: {
      headers: {
        Authorization: user.token,
      },
    },
    onCompleted: async () => {
      await refetch();
      onClose();
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function handleOnSubmit(data: UpdateClientFormData) {
    if (data.state) {
      data.state = data.state?.toUpperCase();
    }
    await revalidate(user);
    await loadUpdate({
      variables: {
        data: { id: client?.id!, idAddress: client?.address[0].id!, ...data },
      },
    });
  }

  const onSubmit = (data: any) => handleOnSubmit(data);

  useEffect(() => {
    if (error) {
      if (error?.message) {
        toast({
          title: 'Erro',
          description: error?.message,
          status: 'error',
          position: 'top-right',
          isClosable: true,
        });
        if (
          error?.message === 'Autenticação inválida, por favor refaça login'
        ) {
          logOut();
        }
      }
    }
  }, [error]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="scale" size="6xl">
      <ModalOverlay bg="blackAlpha.400" backdropFilter="blur(3px)" />
      <ModalContent bg="gray.800" borderRadius={4}>
        <ModalHeader>
          {client && (
            <>
              <Heading fontSize="2xl">{client.name}</Heading>
              <Text fontSize="sm" color="gray.300" fontWeight="light">
                {client.email}
              </Text>
            </>
          )}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
          {client && (
            <Box flexDir="column" gap={8}>
              <VStack spacing={8}>
                <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
                  <Input
                    label="Contato"
                    defaultValue={client.contact!}
                    error={errors.contact}
                    {...register('contact')}
                  />
                  <Input
                    label="Telefone"
                    defaultValue={client.phoneNumber!}
                    error={errors.phoneNumber}
                    {...register('phoneNumber')}
                  />
                </SimpleGrid>

                <Input
                  label="Inscrição estadual"
                  defaultValue={client.stateRegistration!}
                  error={errors.stateRegistration}
                  {...register('stateRegistration')}
                />
              </VStack>

              <FieldMarker title="Endereço" />

              <VStack spacing="8">
                <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
                  <Text
                    alignItems="center"
                    display="flex"
                    justifyContent="center"
                    fontSize="3xl"
                  >
                    {client.address[0].street}
                  </Text>
                  <Input
                    label="Número"
                    type="number"
                    defaultValue={client.address[0].number!}
                    error={errors.number}
                    {...register('number')}
                  />
                </SimpleGrid>

                <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
                  <Input
                    label="Cidade"
                    defaultValue={client.address[0].city!}
                    error={errors.city}
                    {...register('city')}
                  />
                  <Input
                    defaultValue={client.address[0].state!}
                    label="Estado"
                    maxLength={2}
                    info="informe em formato de UF"
                    autoCapitalize="characters"
                    error={errors.state}
                    {...register('state')}
                  />
                  <Input
                    label="Bairro"
                    defaultValue={client.address[0].district!}
                    error={errors.district}
                    {...register('district')}
                  />
                </SimpleGrid>

                <Input
                  defaultValue={client.address[0].cep!}
                  label="CEP"
                  error={errors.cep}
                  {...register('cep')}
                />
              </VStack>
            </Box>
          )}
          <ModalFooter gap={4}>
            <Button
              type="button"
              size="md"
              fontSize="sm"
              borderRadius={4}
              colorScheme="whiteAlpha"
              onClick={onClose}
            >
              Fechar
            </Button>
            <Button
              type="submit"
              size="md"
              fontSize="sm"
              borderRadius={4}
              isLoading={loading}
              colorScheme="blue"
            >
              Salvar
            </Button>
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
