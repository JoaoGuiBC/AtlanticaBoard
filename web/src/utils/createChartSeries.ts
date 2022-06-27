export function createChartSeries(value: Array<Array<any>>) {
  const data = value.map(item => item.length).reverse();

  return [{ data }];
}
