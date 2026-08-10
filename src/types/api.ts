import type { CreateOrderInput, UpdateOrderStatusInput } from "./order";

export interface IdParams {
  id: string;
}

export interface SlugParams {
  slug: string;
}

export type CreateOrderRequest = CreateOrderInput;
export type UpdateOrderStatusRequest = UpdateOrderStatusInput;
