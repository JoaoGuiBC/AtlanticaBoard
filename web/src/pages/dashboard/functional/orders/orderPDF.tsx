import { useState } from "react";
import { Box, Flex, Spinner, useToast } from "@chakra-ui/react";
import { useGetOrderQuery } from "@graphql/generated/graphql";

import ReactPDF from "@react-pdf/renderer";
const { PDFViewer } = ReactPDF;

import { Header } from "@components/Header";
import { Sidebar } from "@components/Sidebar";
import { SingleOrderPDF } from "@components/PDF/SingleOrderPDF";
import { useSearchParams } from "react-router-dom";
import { useAuth } from "@contexts/AuthContext";

type Product = {
  name: string;
  base: number;
  height: number;
  total: number;
}

export function OrderPDF() {
  const [products, setProducts] = useState<Product[]>([]);

  const [searchParams] = useSearchParams();
  const { user } = useAuth();
  const toast = useToast();

  const {
    data,
  } = useGetOrderQuery({
    context: {
      headers: {
        Authorization: user.token,
      },
    },
    variables: { getOrderId: searchParams.get('id') || '' },
    onError: err =>
      toast({
        title: 'Erro',
        description: err.message,
        status: 'error',
        position: 'top-right',
        isClosable: true,
      }),
    onCompleted(info) {
      const parsedProduct: Product[] = info.getOrder.products.map(product => (
        {
          base: product.base,
          height: product.height,
          name: product.product.name,
          total: product.base * product.height,
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
                <SingleOrderPDF
                  client={data.getOrder.client.name}
                  order={String(data.getOrder.serialNumber)}
                  products={products}
                />
              </PDFViewer>
            )}
          </Flex>
        </Flex>
      </Box>
    </>
  );
}