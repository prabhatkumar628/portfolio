export interface ApiResponse {
  success: boolean;
  message: string;
  data?: Record<string, string | number>;
  errors?: string[];
}
