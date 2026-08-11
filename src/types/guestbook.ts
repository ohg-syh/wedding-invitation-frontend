export interface GuestbookEntry {
  id: number;
  name: string;
  message: string;
  createdAt: string;
}

export interface GuestbookApiEntry {
  id: number;
  name: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export interface GuestbookCreateRequest {
  name: string;
  password: string;
  content: string;
}

export interface GuestbookDeleteRequest {
  id: number;
  password: string;
}
