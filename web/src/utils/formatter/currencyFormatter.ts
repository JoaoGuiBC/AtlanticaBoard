export function currencyFormatter(value?: string | number | null) {
  const { format } = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  if (!value) {
    return format(Number(0));
  }

  return format(Number(value));
}
