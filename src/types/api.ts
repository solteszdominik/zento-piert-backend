import type { ParamsDictionary } from "express-serve-static-core";
import type { CreateOrderInput, UpdateOrderStatusInput } from "./order";

export interface IdParams extends ParamsDictionary {
  id: string;
}

export interface SlugParams extends ParamsDictionary {
  slug: string;
}

export type CreateOrderRequest = CreateOrderInput;
export type UpdateOrderStatusRequest = UpdateOrderStatusInput;
