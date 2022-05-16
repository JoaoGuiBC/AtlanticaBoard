import { useEffect } from 'react';
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
  useToast,
  VStack,
} from '@chakra-ui/react';

import { Input } from '@components/Form/Input';

import {
  ListProductsQuery,
  useUpdateProductMutation,
} from '@graphql/generated/graphql';
import {
  UpdateProductFormData,
  schema,
} from '@utils/schemas/product/updateProductSchema';
import { Textarea } from '@components/Form/Textarea';
import { useAuth } from '@contexts/AuthContext';

export type Product = {
  id: string;
  name: string;
  price: number;
  cost?: number | undefined | null;
  description?: string | undefined | null;
};

interface EditProductInfoModalProps {
  refetch: (variables?: any) => Promise<ApolloQueryResult<ListProductsQuery>>; // eslint-disable-line
  onClose: () => void;
  isOpen: boolean;
  product?: Product;
}

export function EditProductInfoModal({
  onClose,
  refetch,
  isOpen,
  product,
}: EditProductInfoModalProps) {
  const toast = useToast();
  const { user, logOut, revalidate } = useAuth();

  const [loadUpdate, { error, loading }] = useUpdateProductMutation({
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

  async function handleOnSubmit(data: UpdateProductFormData) {
    await revalidate(user);
    await loadUpdate({
      variables: {
        data: { id: product?.id!, ...data },
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
          {product && <Heading fontSize="2xl">{product.name}</Heading>}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
          {product && (
            <Box flexDir="column" gap={8}>
              <VStack spacing={8}>
                <SimpleGrid minChildWidth="240px" spacing={['6', '8']} w="100%">
                  <Input
                    label="Preço"
                    info="obrigatório"
                    leftContent="R$"
                    type="number"
                    step="0.01"
                    defaultValue={product.price}
                    error={errors.price}
                    {...register('price')}
                  />
                  <Input
                    label="Custo"
                    leftContent="R$"
                    type="number"
                    step="0.01"
                    defaultValue={product.cost!}
                    error={errors.cost}
                    {...register('cost')}
                  />
                </SimpleGrid>

                <Textarea
                  label="Descrição"
                  defaultValue={product.description!}
                  {...register('description')}
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
