import axios, { type AxiosRequestConfig } from "axios";
import { env } from "@/config/env";
export const isDemo = env.isDemo;
const client = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 20000,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
  xsrfCookieName: "csrf_token",
  xsrfHeaderName: "X-CSRF-Token",
  withXSRFToken: true,
});
export class ApiError extends Error {
  constructor(
    public code: string,
    public status?: number,
  ) {
    super(code);
    this.name = "ApiError";
  }
}
export async function apiRequest<T>(config: AxiosRequestConfig): Promise<T> {
  // Demo mode is fully offline: every service answers from `demo-data`, so
  // reaching here means a branch was missed. Fail instead of hitting the network.
  if (isDemo) throw new ApiError("notConfigured");
  if (!env.apiBaseUrl) throw new ApiError("notConfigured");
  try {
    return (await client.request<T>(config)).data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new ApiError(
        error.response?.status === 401
          ? "unauthorized"
          : error.response?.status === 403
            ? "forbidden"
            : "requestFailed",
        error.response?.status,
      );
    }
    throw error;
  }
}
