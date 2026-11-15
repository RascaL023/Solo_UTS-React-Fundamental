export const TAX_RATE = 0.1;

const PROMO_CODES = {
  UTS25: {
    label: "UTS25 · potongan 25% (maks Rp25.000)",
    rate: 0.25,
    maxDiscount: 25000,
    minSubtotal: 75000,
  },
  HEMAT10: {
    label: "HEMAT10 · potongan 10%",
    rate: 0.1,
    maxDiscount: Infinity,
    minSubtotal: 0,
  },
  KOPI15: {
    label: "KOPI15 · potongan 15% untuk menu kopi",
    rate: 0.15,
    maxDiscount: Infinity,
    minSubtotal: 0,
    coffeeOnly: true,
  },
};

export function formatRupiah(value) {
  return `Rp${Math.round(value).toLocaleString("id-ID")}`;
}

function subtotalOf(items) {
  return items.reduce((total, item) => total + item.price * item.qty, 0);
}

export function validatePromo(code, items) {
  const normalized = code.trim().toUpperCase();
  const promo = PROMO_CODES[normalized];

  if (!promo) {
    return { error: "Kode promo tidak dikenal. Coba UTS25, HEMAT10, atau KOPI15." };
  }

  const subtotal = subtotalOf(items);

  if (subtotal < promo.minSubtotal) {
    return {
      error: `Minimal belanja ${formatRupiah(promo.minSubtotal)} untuk memakai kode ini.`,
    };
  }

  let discountBase = subtotal;

  if (promo.coffeeOnly) {
    discountBase = subtotalOf(items.filter((item) => item.category === "Kopi"));

    if (discountBase === 0) {
      return { error: "Kode ini hanya berlaku untuk menu Kopi." };
    }
  }

  const discount = Math.min(Math.round(discountBase * promo.rate), promo.maxDiscount);

  return { code: normalized, label: promo.label, discount };
}

export function calculateTotals(items, promoCode) {
  const subtotal = subtotalOf(items);
  const promo = promoCode ? validatePromo(promoCode, items) : null;
  const discount = promo && !promo.error ? promo.discount : 0;
  const taxable = Math.max(0, subtotal - discount);
  const tax = Math.round(taxable * TAX_RATE);

  return {
    subtotal,
    discount,
    tax,
    total: taxable + tax,
    promo,
  };
}
