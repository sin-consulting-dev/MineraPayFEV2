export interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string | null;
  email_verified_at?: string;
}

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
