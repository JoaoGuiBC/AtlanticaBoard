import * as Localization from 'expo-localization';
import { formatCurrency } from 'react-native-format-currency';

export function currencyFormatter(
  value?: string | number | null,
  onlyNumber: boolean = false,
) {
  if (!value) {
    return 'R$ 0,00';
  }

  const code = Localization.currency;
  const [formattedValue, formattedNumber] = formatCurrency({
    amount: Number(value).toFixed(2), code,
  });

  if (onlyNumber) {
    return formattedNumber;
  }

  return formattedValue;
}
