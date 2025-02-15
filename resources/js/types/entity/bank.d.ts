import { TimestampEntity } from "./base";

export type Bank = {
  id: number;
  name: string;
  code: string;
} & TimestampEntity;
