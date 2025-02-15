import { Bank } from "./bank";
import { SoftDeleteEntity, TimestampEntity } from "./base";

export type Merchant = {
  id: string;
  name: string;
  key: string;
  email: string;
  client_key: string;
  client_secret: string;
  is_head_group: boolean;
  is_verified: boolean;
  merchant_group_id: string;
  active_balance: number;
  pending_balance: number;
  total_disburse: number;
  deposit_callback_url: string | null;
  withdraw_callback_url: string | null;
} & TimestampEntity &
  SoftDeleteEntity;

export type MerchantGroup = {
  id: number;
  name: string;
  key: string;
  token: string;
  provider: string;
  created_at: Date | null;
} & TimestampEntity &
  SoftDeleteEntity;

export type MerchantBankAccount = {
  id: string;
  merchant_id: string;
  bank_id: number;
  name: string;
  number: string;
  bank: Bank;
  merchant: Merchant;
} & TimestampEntity &
  SoftDeleteEntity;
