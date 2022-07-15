import ReactPDF from "@react-pdf/renderer";
const { Text, View, StyleSheet, Document, Page, Image, Font } = ReactPDF;

import logoImage from '../../assets/logo.png';
import signImage from '../../assets/sign.png';

import roboto from '../../assets/Roboto-Regular.ttf';
import robotoBold from '../../assets/Roboto-Bold.ttf';

import { currencyFormatter } from "@utils/formatter/currencyFormatter";

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
  bottomBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 32,
  }
});

type Product = {
  name: string;
  price: number;
  totalPrice: number;
  size: number;
}

interface SingleBudgetPDFProps {
  client: string;
  budget: string;
  price: number;
  discount?: number | null;
  products: Product[];
}

export const SingleBudgetPDF = ({client, budget, price, discount, products}: SingleBudgetPDFProps) => (
  <Document title={`orçamento-${budget}`}>
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
          <Text style={styles.textBold}>ORÇAMENTO</Text>
          <Text style={styles.text}>{budget}</Text>
        </View>
      </View>

      <View style={styles.divider}/>

      <View style={styles.section}>
        <Text style={{...styles.textBold, width: '60%'}}>Produto</Text>

        <View style={{flexDirection: 'row', width: '40%', justifyContent: 'space-between'}}>
          <Text style={styles.textBold}>Tamanho</Text>
          <Text style={styles.textBold}>Preço por M²</Text>
          <Text style={styles.textBold}>Preço total</Text>
        </View>
      </View>

      <View style={styles.dashedDivider}/>

      {products.map(product => (
        <View style={{...styles.section, marginVertical: 4}}>
          <Text style={{...styles.text, width: '60%', paddingRight: 8}}>{product.name}</Text>

          <View style={{flexDirection: 'row', width: '40%', justifyContent: 'space-between'}}>
            <Text style={styles.text}>{product.size} M²</Text>
            <Text style={styles.text}>{currencyFormatter(product.price)}</Text>
            <Text style={styles.text}>{currencyFormatter(product.totalPrice)}</Text>
          </View>
        </View>
      ))}

      <View style={styles.bottomBody}>
        <View style={{flex: 2}}>
          <Text style={styles.text}>3X CARTÃO VISA OU MASTER VALOR AVISTA</Text>
          <Text style={styles.text}>BOLETO BANCARIO -SOMENTE EMPRESAS</Text>
          <Text style={styles.text}>10X CARTÃO COM 6% ACRESCIMO</Text>
          <Text style={styles.text}>60X VIA FINANCIAMENTO CREDIFOZ</Text>

          <Text style={{...styles.text, marginTop: 8}}>MATERIAL COM GARANTIA DE FABRICA E DE FABRICAÇÃO</Text>
          <Text style={styles.text}>TODOS OS ACESSÓRIOS E PARAFUSOS GALVANIZADOS</Text>
          <Text style={styles.text}>EQUIPE TREINADA E COM EXPERIÊNCIA</Text>

          <Text style={{...styles.text, marginTop: 8}}>NÃO FAZEMOS INSTALAÇÕES ELETRICAS (O PONTO DE</Text>
          <Text style={styles.text}>LIGAÇÃO DEVE SER FORNECIDO PELO CLIENTE)</Text>
        </View>

        <View style={{flex: 1}}>
          <View style={{...styles.divider, margin: 0}}/>

          <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingHorizontal: 4}}>
            <Text style={styles.textBold}>SubTotal</Text>
            <Text style={styles.textBold}>{currencyFormatter(price)}</Text>
          </View>

          <View style={styles.dashedDivider}/>

          {discount && (
            <>
              <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingHorizontal: 4}}>
                <Text style={styles.textBold}>Desconto</Text>
                <Text style={styles.textBold}>{currencyFormatter(discount)}</Text>
              </View>

              <View style={styles.dashedDivider}/>
            </>
          )}

          <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingHorizontal: 4}}>
            <Text style={styles.textBold}>Total</Text>
            <Text style={styles.textBold}>
              {
                discount 
                ? currencyFormatter(price - discount) 
                : currencyFormatter(price)
              }
            </Text>
          </View>

          <View style={{...styles.divider, margin: 0}}/>
        </View>
      </View>

      <View style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
        <Image style={{width: '40%'}} src={signImage} />
        <Text style={styles.textBold}>Atlantica Toldos</Text>
      </View>
    </Page>
  </Document>
);
