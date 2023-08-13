import { GeneralResponse } from "@/utils/generalResponse";
import { httpClient } from "../libs/httpClient";

export type Product = {
  id: number;
  name: string;
  description: string;
  sku: string;
  stock: number;
  category_id: string;
  price: number;
  user_id: number;
  image: string;
  active: number;
  created_at: string;
  updated_at: string;
}

export interface GetProductResult extends GeneralResponse {
  response: Product[]
}

const productService = {
  getAllProducts(): Promise<GetProductResult> {
    return httpClient.get('/product');
  },
}

export default productService;