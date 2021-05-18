export interface ChatLogParams {
  from_id: string;
  to_id: string;
  data: string;
  sent: boolean;
}

export interface SavedChatReturnType {
  to: string;
  from: string;
  sent: boolean;
  _id: string;
  timestamp: number;
  data: string;
}
