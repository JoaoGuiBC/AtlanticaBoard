export function createChartSeries(
  value: Array<Array<{ __typename?: 'DayValue'; created_at: any }>>,
) {
  const data = value.map(item => item.length).reverse();

  return [{ data }];
}
