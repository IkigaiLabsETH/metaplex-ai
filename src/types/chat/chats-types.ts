import { Message } from "../messages/messages-types";

export interface Chat {
  id: string;
  name: string;
  messages: Message[];
  createdAt: Date;
  model: "o1-preview" | "o1-mini";
  isTravelChat?: boolean; // Add this if you want to distinguish travel chats
}
