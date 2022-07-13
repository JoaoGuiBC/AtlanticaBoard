import ReactPDF from "@react-pdf/renderer";
const { Text, View, StyleSheet, Document, Page, Image, Font } = ReactPDF;

import logoImage from '../../assets/logo.png';
import roboto from '../../assets/Roboto-Regular.ttf';
import robotoBold from '../../assets/Roboto-Bold.ttf';

Font.register({ family: 'Roboto', fonts: [
  { src: roboto },
  { src: robotoBold, fontWeight: 700 },
 ]});

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  companyName: {
    fontSize: '16px',
    fontFamily: 'Roboto',
    fontWeight: 700,
  },
  infoText: {
    fontSize: '10px',
    fontFamily: 'Roboto',
  },
  text: {
    fontSize: '11px',
    fontFamily: 'Roboto',
  },
  textBold: {
    fontSize: '12px',
    fontFamily: 'Roboto',
    fontWeight: 700,
  },
  section: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#000000',
    marginVertical: 24,
  },
  dashedDivider: {
    width: '100%',
    height: 1,
    borderTopColor: '#000000',
    borderTopWidth: 1,
    borderTopStyle: 'dashed',
    marginVertical: 8,
  },
});

type Product = {
  name: string;
  base: number;
  height: number;
  total: number;
}

interface SingleOrderPDFProps {
  client: string;
  order: string;
  products: Product[];
}

export const SingleOrderPDF = ({client, order, products}: SingleOrderPDFProps) => (
  <Document title={`pedido-${order}`}>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Image style={{height: '55px'}} src={logoImage} />

        <View>
          <Text style={styles.companyName}>Atlantica Toldos &#38; ACM</Text>
          <Text style={styles.infoText}>Rua Rio Negrinho 852 - Santa Clara - Camboriu - SC</Text>
          <Text style={styles.infoText}>Cep 88343-405</Text>
          <Text style={styles.infoText}>Cnpj: 32.090.725/0001-04</Text>
          <Text style={styles.infoText}>atlanticatoldos@gmail.com</Text>
          <Text style={styles.infoText}>47 99687-2292</Text>
        </View>
      </View>

      <View style={styles.divider}/>

      <View style={styles.section}>
        <View>
          <Text style={styles.textBold}>CLIENTE</Text>
          <Text style={styles.text}>{client}</Text>
        </View>

        <View style={{alignItems: 'center'}}>
          <Text style={styles.textBold}>PEDIDO</Text>
          <Text style={styles.text}>{order}</Text>
        </View>
      </View>

      <View style={styles.divider}/>

      <View style={styles.section}>
        <Text style={{...styles.textBold, width: '60%'}}>Produto</Text>

        <View style={{flexDirection: 'row', width: '40%', justifyContent: 'space-between'}}>
          <Text style={styles.textBold}>Base</Text>
          <Text style={styles.textBold}>Altura</Text>
          <Text style={styles.textBold}>M²</Text>
        </View>
      </View>

      <View style={styles.dashedDivider}/>

      {products.map(product => (
        <View style={{...styles.section, marginVertical: 4}}>
          <Text style={{...styles.text, width: '60%', paddingRight: 8}}>{product.name}</Text>

          <View style={{flexDirection: 'row', width: '40%', justifyContent: 'space-between'}}>
            <Text style={styles.text}>{product.base} M</Text>
            <Text style={styles.text}>{product.height} M</Text>
            <Text style={styles.text}>{product.total} M²</Text>
          </View>
        </View>
      ))}
    </Page>
  </Document>
);
