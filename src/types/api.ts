export type ApiResponse<T = undefined, M = undefined> = {
  responseCode: string;
  responseDesc: string;
  timestamp: string;
  result?: T | null;
  data?: T | null;
  meta?: M;
};
