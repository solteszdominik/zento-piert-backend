export const shippingMethods = {
  standard: {
    label: "Standard szállítás",
    price: 0,
  },
} as const;

export type ShippingMethod = keyof typeof shippingMethods;
