import type { CreateOrderInput } from "./order";

export interface IdParams {
  id: string;
}

export interface SlugParams {
  slug: string;
}

export type CreateOrderRequest = CreateOrderInput;
