import { GeneralResponse } from "@/utils/generalResponse";
import { httpClient } from "../libs/httpClient";

export type Category = {
  id: number;
  name: string;
}

export type ProductPayload = {
  name: string;
  description: string;
  sku: string;
  stock: number;
  category_id: number | null;
  price: number;
  image: string;
}

export interface Product extends ProductPayload {
  id: number;
  user_id: number;
  active: number;
  created_at: string;
  updated_at: string;
}

export interface GetAllProductResult extends GeneralResponse {
  response: Product[]
}

export interface GetProductResult extends GeneralResponse {
  response: Product
}

export interface GetCategoryResult extends GeneralResponse {
  response: Category[]
}

const productService = {
  getAllCategories(): Promise<GetCategoryResult> {
    return httpClient.get('/product/categories');
  },
  getAllProducts(): Promise<GetAllProductResult> {
    return httpClient.get('/product');
  },
  getProductDetail(id: number): Promise<GetProductResult> {
    return httpClient.get(`/product/${id}`);
  },
  createNewProduct(payload: ProductPayload): Promise<GeneralResponse> {
    return httpClient.post('/product', payload);
  }
}

export default productService;