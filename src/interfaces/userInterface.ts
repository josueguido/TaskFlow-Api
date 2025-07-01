export interface User {
  id: number;
  name: string;
  email: string;
  password_hash?: string;
  role_id: number | null;
  created_at: string;
  updated_at: string;
}
