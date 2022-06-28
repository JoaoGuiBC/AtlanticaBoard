export function createChartData(value: Array<Array<any>>) {
  const ordersPerDay = value.map((item) => item.length).reverse();

  const today = new Date();
  const sixDaysBefore = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);
  const fiveDaysBefore = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5);
  const forDaysBefore = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 4);
  const threeDaysBefore = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3);
  const twoDaysBefore = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2);
  const oneDayBefore = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1);

  const data = {
    labels: [
      String(sixDaysBefore.getDate()),
      String(fiveDaysBefore.getDate()),
      String(forDaysBefore.getDate()),
      String(threeDaysBefore.getDate()),
      String(twoDaysBefore.getDate()),
      String(oneDayBefore.getDate()),
      String(today.getDate()),
    ],
    datasets: [
      {
        data: ordersPerDay,
      },
    ],
  };

  return data;
}
