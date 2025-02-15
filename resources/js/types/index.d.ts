import { SoftDeleteEntity, TimestampEntity } from "./entity/base";
import { Merchant } from "./entity/merchant";

export type User = {
  id: string;
  merchant_id: string | null;
  name: string;
  email: string;
  email_verified_at: Date | null;
  type: string;
  password: string;
  merchant?: Merchant | null;
} & TimestampEntity &
  SoftDeleteEntity;

export type PaginationProps<T> = {
  data?: T | null;
  current_page: number | null;
  first_page_url: string | null;
  from: number | null;
  last_page: number | null;
  last_page_url: string | null;
  next_page_url: string | null;
  path: string | null;
  per_page: number | null;
  prev_page_url: string | null;
  to: number | null;
  total: number | null;
};

export type PageProps<
  T extends Record<string, unknown> = Record<string, unknown>
> = T & {
  auth: {
    user: User;
  };
};
