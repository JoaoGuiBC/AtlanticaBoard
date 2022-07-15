import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Flex, Spinner, useToast } from "@chakra-ui/react";
import { useGetBudgetQuery } from "@graphql/generated/graphql";

import ReactPDF from "@react-pdf/renderer";
const { PDFViewer } = ReactPDF;

import { useAuth } from "@contexts/AuthContext";

import { Header } from "@components/Header";
import { Sidebar } from "@components/Sidebar";
import { SingleBudgetPDF } from "@components/PDF/SingleBudgetPDF";

type Product = {
  name: string;
  price: number;
  totalPrice: number;
  size: number;
}

export function BudgetPDF() {
  const [products, setProducts] = useState<Product[]>([]);

  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const toast = useToast();

  const {
    data,
  } = useGetBudgetQuery({
    context: {
      headers: {
        Authorization: user.token,
      },
    },
    variables: { getBudgetId: searchParams.get('id') || '' },
    onError: err =>
      toast({
        title: 'Erro',
        description: err.message,
        status: 'error',
        position: 'top-right',
        isClosable: true,
      }),
    onCompleted(info) {
      const parsedProduct: Product[] = info.getBudget.products.map(product => (
        {
          price: product.price,
          name: product.product.name,
          size: product.base * product.height,
          totalPrice: product.price * (product.base * product.height),
        }
      ));
      setProducts(parsedProduct);
    },
  });

  return (
    <>
      <Header />

      <Box>
        <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
          <Sidebar />

          <Flex flex={1} justifyContent="center">
            {!data ? (
              <Flex justify="center">
                <Spinner />
              </Flex>
            ) : (
              <PDFViewer style={{ height: '30rem', width: '70%' }} >
                <SingleBudgetPDF
                  client={data.getBudget.client.name}
                  budget={String(data.getBudget.serialNumber)}
                  products={products}
                  discount={data.getBudget.discount}
                  price={data.getBudget.price}
                />
              </PDFViewer>
            )}
          </Flex>
        </Flex>
      </Box>
    </>
  );
}