const formatter = new Intl.NumberFormat("zh-CN", {
  style: "currency",
  currency: "CNY",
});

export function usePriceFormat() {
  return (price: number) => formatter.format(price);
}
