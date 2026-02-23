const formatterPrice = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
});

export default function formatPrice(price) {
  return formatterPrice.format(price);
}