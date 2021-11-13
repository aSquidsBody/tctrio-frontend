// Custom error form
export interface ErrorResp {
  errors: {
    message: string;
    field?: string;
  }[];
}
