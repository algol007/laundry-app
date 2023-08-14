import { httpClient } from "../libs/httpClient";

export interface ProductReportResult {
  created_at: string;
  total: number;
  income: string;
}

const reportService = {
  getProductReport(): Promise<ProductReportResult[]> {
    return httpClient.get('/product/report');
  },
}

export default reportService;